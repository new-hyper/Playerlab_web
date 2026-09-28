"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authErrorMessage } from "@/lib/auth-errors";
import { parseLoginId, toAuthEmail } from "@/lib/auth-login-id";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const parsed = parseLoginId(loginId);
    if (!parsed) {
      setError("아이디는 영문·숫자 4~20자입니다.");
      return;
    }

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: toAuthEmail(parsed),
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
        <label htmlFor="login-login-id">아이디</label>
        <input
          id="login-login-id"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
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
