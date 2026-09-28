import { Webhook, WebhookVerificationError } from "standardwebhooks";

import { sendOtpSms } from "@/lib/solapi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SmsHookPayload = {
  user?: { phone?: string };
  sms?: { otp?: string };
};

function hookSecret(): string {
  const raw = process.env.SEND_SMS_HOOK_SECRET;
  if (!raw) {
    throw new Error("SEND_SMS_HOOK_SECRET 이 없습니다.");
  }
  return raw.replace(/^v1,/, "");
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

/**
 * 슈파베이스 Auth 가 OTP 를 만들면 여기로 POST 한다.
 * 서명 확인 후에만 솔라피로 문자를 보낸다.
 */
export async function POST(request: Request) {
  const payload = await request.text();
  const headers = Object.fromEntries(request.headers);

  try {
    const verified = new Webhook(hookSecret()).verify(
      payload,
      headers,
    ) as SmsHookPayload;
    const phone = verified.user?.phone;
    const otp = verified.sms?.otp;
    if (!phone || !otp || !/^\d{6}$/.test(otp)) {
      return json(
        {
          error: {
            http_code: 400,
            message: "인증번호 요청 내용이 올바르지 않습니다.",
          },
        },
      );
    }

    await sendOtpSms(phone, otp);
    return json({});
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      return json(
        {
          error: {
            http_code: 401,
            message: "요청 서명이 올바르지 않습니다.",
          },
        },
        401,
      );
    }

    const message =
      error instanceof Error ? error.message : "문자 전송에 실패했습니다.";
    console.error("Send SMS Hook 실패", message);
    return json({
      error: {
        http_code: 500,
        message: "문자 전송에 실패했습니다.",
      },
    });
  }
}
