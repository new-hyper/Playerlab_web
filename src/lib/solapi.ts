import { createHmac, randomBytes } from "node:crypto";

import { toNational } from "@/lib/phone";

/**
 * 솔라피(구 쿨에스엠에스) REST. 고다지 앱과 같은 HMAC 서명이다.
 * SDK v6 은 Effect 기반이라 여기서는 fetch 로 직접 보낸다.
 */
function authorization(apiKey: string, apiSecret: string): string {
  const salt = randomBytes(16).toString("hex");
  const date = new Date().toISOString();
  const signature = createHmac("sha256", apiSecret)
    .update(date + salt)
    .digest("hex");
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

export async function sendOtpSms(phone: string, otp: string): Promise<void> {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const from = process.env.SOLAPI_FROM?.replace(/\D/g, "");

  if (!apiKey || !apiSecret || !from) {
    throw new Error(
      "솔라피 환경 변수가 없습니다. SOLAPI_API_KEY, SOLAPI_API_SECRET, SOLAPI_FROM 을 넣어 주세요.",
    );
  }

  const to = toNational(phone);
  if (!/^01[016789]\d{7,8}$/.test(to)) {
    throw new Error("문자 수신 번호가 올바르지 않습니다.");
  }

  const response = await fetch("https://api.solapi.com/messages/v4/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization(apiKey, apiSecret),
    },
    body: JSON.stringify({
      message: {
        to,
        from,
        text: `[플레이어랩] 인증번호는 [${otp}]입니다.`,
      },
    }),
  });

  const body = (await response.json().catch(() => null)) as {
    statusCode?: string;
    errorMessage?: string;
    errorCode?: string;
  } | null;

  if (!response.ok || (body?.statusCode && body.statusCode !== "2000")) {
    console.error("솔라피 전송 실패", {
      http: response.status,
      statusCode: body?.statusCode,
      errorCode: body?.errorCode,
    });
    throw new Error(body?.errorMessage ?? "문자 전송에 실패했습니다.");
  }
}
