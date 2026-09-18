"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authErrorMessage } from "@/lib/auth-errors";
import { toE164 } from "@/lib/phone";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function SignupForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [otp, setOtp] = useState("");
  const [needOtp, setNeedOtp] = useState(false);
  const [e164, setE164] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function goHome() {
    router.push("/");
    router.refresh();
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (needOtp) {
      await verify();
      return;
    }

    const parsed = toE164(phone);
    if (!parsed) {
      setError("휴대전화 번호를 확인해 주세요. 예: 010-1234-5678");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (password !== password2) {
      setError("비밀번호가 서로 다릅니다.");
      return;
    }

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { data, error: signError } = await supabase.auth.signUp({
      phone: parsed,
      password,
    });
    setBusy(false);

    if (signError) {
      setError(authErrorMessage(signError));
      return;
    }
    if (data.user?.identities && data.user.identities.length === 0) {
      setError("이미 가입된 전화번호입니다. 로그인해 주세요.");
      return;
    }
    if (data.session) {
      await goHome();
      return;
    }

    setE164(parsed);
    setNeedOtp(true);
  }

  async function verify() {
    if (!e164) return;
    if (!/^\d{6}$/.test(otp)) {
      setError("인증번호 6자리를 입력해 주세요.");
      return;
    }
    setBusy(true);
    const supabase = createBrowserSupabase();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: e164,
      token: otp,
      type: "sms",
    });
    setBusy(false);
    if (verifyError) {
      setError(authErrorMessage(verifyError));
      return;
    }
    await goHome();
  }

  return (
    <form className="form" onSubmit={onSubmit} style={{ marginTop: 0 }}>
      {!needOtp ? (
        <>
          <div className="fld" style={{ marginTop: 0 }}>
            <label htmlFor="signup-phone">전화번호</label>
            <input
              id="signup-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="010-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="fld">
            <label htmlFor="signup-password">비밀번호</label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="6자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="fld">
            <label htmlFor="signup-password2">비밀번호 확인</label>
            <input
              id="signup-password2"
              type="password"
              autoComplete="new-password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </>
      ) : (
        <div className="fld" style={{ marginTop: 0 }}>
          <label htmlFor="signup-otp">인증번호 6자리</label>
          <input
            id="signup-otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            required
          />
          <p
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "var(--soft)",
              lineHeight: 1.6,
            }}
          >
            지금은 테스트 번호만 통과합니다. 슈파베이스에 적어 둔 6자리를
            입력하세요. 제한 시간은 60초입니다.
          </p>
        </div>
      )}

      {error && (
        <p style={{ marginTop: 16, color: "var(--bad)", fontSize: 14, fontWeight: 700 }}>
          {error}
        </p>
      )}

      <div className="linkrow" style={{ marginTop: 26 }}>
        <button className="btn btn--mint" type="submit" disabled={busy}>
          {busy ? "처리 중…" : needOtp ? "인증하고 가입" : "인증번호 받기"}
        </button>
        <Link href="/login" className="btn btn--out">
          이미 계정이 있습니다
        </Link>
      </div>
    </form>
  );
}
