"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authErrorMessage } from "@/lib/auth-errors";
import { toE164 } from "@/lib/phone";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const parsed = toE164(phone);
    if (!parsed) {
      setError("휴대전화 번호를 확인해 주세요. 예: 010-1234-5678");
      return;
    }

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      phone: parsed,
      password,
    });
    setBusy(false);

    if (loginError) {
      setError(authErrorMessage(loginError));
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form className="form" onSubmit={onSubmit} style={{ marginTop: 0 }}>
      <div className="fld" style={{ marginTop: 0 }}>
        <label htmlFor="login-phone">전화번호</label>
        <input
          id="login-phone"
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
        <label htmlFor="login-password">비밀번호</label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && (
        <p style={{ marginTop: 16, color: "var(--bad)", fontSize: 14, fontWeight: 700 }}>
          {error}
        </p>
      )}

      <div className="linkrow" style={{ marginTop: 26 }}>
        <button className="btn btn--mint" type="submit" disabled={busy}>
          {busy ? "로그인 중…" : "로그인"}
        </button>
        <Link href="/signup" className="btn btn--out">
          회원가입
        </Link>
      </div>
    </form>
  );
}
