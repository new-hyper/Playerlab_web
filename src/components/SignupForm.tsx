"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { authErrorMessage } from "@/lib/auth-errors";
import { parseLoginId, toAuthEmail } from "@/lib/auth-login-id";
import { formatPhoneMask, phoneFormatError, toE164, toNational } from "@/lib/phone";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function SignupForm() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loginIdOk, setLoginIdOk] = useState<boolean | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [password2Error, setPassword2Error] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function goHome() {
    router.push("/");
    router.refresh();
  }

  async function checkLoginId() {
    setError(null);
    const parsed = parseLoginId(loginId);
    if (!parsed) {
      setLoginIdOk(null);
      setError("아이디는 영문·숫자 4~20자입니다.");
      return false;
    }

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { data, error: rpcError } = await supabase.rpc("login_id_taken", {
      p_login_id: parsed,
    });
    setBusy(false);

    if (rpcError) {
      setLoginIdOk(null);
      setError(authErrorMessage(rpcError));
      return false;
    }
    if (data === true) {
      setLoginIdOk(false);
      setError("이미 사용 중인 아이디입니다.");
      return false;
    }
    setLoginIdOk(true);
    return true;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const parsedLoginId = parseLoginId(loginId);
    if (!parsedLoginId) {
      setError("아이디는 영문·숫자 4~20자입니다.");
      return;
    }
    const displayName = name.trim();
    if (!displayName) {
      setNameError("이름을 입력해 주세요.");
      return;
    }
    setNameError(null);
    const parsedPhone = toE164(phone);
    if (!parsedPhone) {
      setPhoneError(phoneFormatError(phone));
      return;
    }
    setPhoneError(null);
    if (password.length < 6) {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    setPasswordError(null);
    if (password !== password2) {
      setPassword2Error("비밀번호가 서로 다릅니다.");
      return;
    }
    setPassword2Error(null);

    const free = await checkLoginId();
    if (!free) return;

    setBusy(true);
    const supabase = createBrowserSupabase();
    const { data, error: signError } = await supabase.auth.signUp({
      email: toAuthEmail(parsedLoginId),
      password,
      options: {
        data: {
          login_id: parsedLoginId,
          name: displayName,
          phone: toNational(parsedPhone),
        },
      },
    });
    setBusy(false);

    if (signError) {
      setError(authErrorMessage(signError));
      return;
    }
    if (data.user?.identities && data.user.identities.length === 0) {
      setError("이미 사용 중인 아이디입니다. 로그인해 주세요.");
      return;
    }
    if (data.session) {
      await goHome();
      return;
    }

    setError(
      "가입은 되었지만 바로 로그인되지 않았습니다. 슈파베이스 Authentication → Providers → Email 에서 Confirm email 을 끈 뒤 다시 시도해 주세요.",
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate style={{ marginTop: 0 }}>
      <div className="fld" style={{ marginTop: 0 }}>
        <label htmlFor="signup-login-id">아이디</label>
        <div style={{ position: "relative" }}>
          <input
            id="signup-login-id"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="영문·숫자 4~20자"
            value={loginId}
            onChange={(e) => {
              setLoginId(e.target.value);
              setLoginIdOk(null);
            }}
            required
            minLength={4}
            maxLength={20}
            style={{ paddingRight: loginId.length > 0 ? 92 : 14 }}
          />
          {loginId.length > 0 && (
            <button
              type="button"
              disabled={busy || loginIdOk === true}
              onClick={() => void checkLoginId()}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                height: 32,
                padding: "0 12px",
                border:
                  loginIdOk === true
                    ? "1px solid var(--mintd)"
                    : "1px solid var(--line)",
                borderRadius: 99,
                background:
                  loginIdOk === true
                    ? "rgba(10,140,112,.08)"
                    : "var(--paper)",
                color: loginIdOk === true ? "var(--mintd)" : "var(--soft)",
                fontFamily: "inherit",
                fontSize: 12,
                fontWeight: 700,
                cursor:
                  busy || loginIdOk === true ? "not-allowed" : "pointer",
                opacity: busy ? 0.45 : 1,
              }}
            >
              {busy ? "확인 중" : loginIdOk === true ? "확인됨" : "중복 확인"}
            </button>
          )}
        </div>
        {loginIdOk && (
          <p
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "var(--mintd)",
              fontWeight: 700,
            }}
          >
            사용할 수 있는 아이디입니다.
          </p>
        )}
      </div>
      {loginIdOk === true && (
        <>
      <div className="fld">
        <label htmlFor="signup-name">이름</label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          value={name}
          aria-invalid={nameError ? true : undefined}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(null);
          }}
          onBlur={(e) => {
            setNameError(
              e.currentTarget.value.trim()
                ? null
                : "이름을 입력해 주세요.",
            );
          }}
          required
        />
        {nameError && (
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              color: "var(--bad)",
              fontWeight: 700,
            }}
          >
            {nameError}
          </p>
        )}
      </div>
      <div className="fld">
        <label htmlFor="signup-phone">전화번호</label>
        <input
          id="signup-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-1234-5678"
          maxLength={13}
          value={phone}
          aria-invalid={phoneError ? true : undefined}
          onChange={(e) => {
            setPhone(formatPhoneMask(e.target.value));
            setPhoneError(null);
          }}
          onBlur={(e) => setPhoneError(phoneFormatError(e.currentTarget.value))}
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
          연락용입니다. 인증문자는 보내지 않습니다.
        </p>
        {phoneError && (
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              color: "var(--bad)",
              fontWeight: 700,
            }}
          >
            {phoneError}
          </p>
        )}
      </div>
      <div className="fld">
        <label htmlFor="signup-password">비밀번호</label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          placeholder="6자 이상"
          value={password}
          aria-invalid={passwordError ? true : undefined}
          onChange={(e) => {
            const next = e.target.value;
            setPassword(next);
            setPasswordError(null);
            if (password2) {
              setPassword2Error(
                next === password2 ? null : "비밀번호가 서로 다릅니다.",
              );
            }
          }}
          onBlur={(e) => {
            const value = e.currentTarget.value;
            if (!value) {
              setPasswordError("비밀번호를 입력해 주세요.");
              return;
            }
            setPasswordError(
              value.length < 6 ? "비밀번호는 6자 이상이어야 합니다." : null,
            );
          }}
          required
          minLength={6}
        />
        {passwordError && (
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              color: "var(--bad)",
              fontWeight: 700,
            }}
          >
            {passwordError}
          </p>
        )}
      </div>
      <div className="fld">
        <label htmlFor="signup-password2">비밀번호 확인</label>
        <input
          id="signup-password2"
          type="password"
          autoComplete="new-password"
          value={password2}
          aria-invalid={password2Error ? true : undefined}
          onChange={(e) => {
            const next = e.target.value;
            setPassword2(next);
            setPassword2Error(null);
          }}
          onBlur={(e) => {
            const value = e.currentTarget.value;
            if (!value) {
              setPassword2Error("비밀번호 확인을 입력해 주세요.");
              return;
            }
            setPassword2Error(
              value === password ? null : "비밀번호가 서로 다릅니다.",
            );
          }}
          required
          minLength={6}
        />
        {password2Error && (
          <p
            style={{
              marginTop: 8,
              fontSize: 13,
              color: "var(--bad)",
              fontWeight: 700,
            }}
          >
            {password2Error}
          </p>
        )}
      </div>
        </>
      )}

      {error && (
        <p style={{ marginTop: 16, color: "var(--bad)", fontSize: 14, fontWeight: 700 }}>
          {error}
        </p>
      )}

      <div className="linkrow" style={{ marginTop: 26 }}>
        {loginIdOk === true && (
          <button className="btn btn--mint" type="submit" disabled={busy}>
            {busy ? "처리 중…" : "가입하기"}
          </button>
        )}
        <Link href="/login" className="btn btn--out">
          이미 계정이 있습니다
        </Link>
      </div>
    </form>
  );
}
