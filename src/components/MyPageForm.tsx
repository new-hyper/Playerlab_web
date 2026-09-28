"use client";

import { FormEvent, useState } from "react";

import { authErrorMessage } from "@/lib/auth-errors";
import { toAuthEmail } from "@/lib/auth-login-id";
import {
  formatPhoneMask,
  phoneFormatError,
  toE164,
  toNational,
} from "@/lib/phone";
import { createBrowserSupabase } from "@/lib/supabase/client";

type Props = {
  loginId: string;
  name: string;
  phone: string;
  points: number;
  missing: boolean;
};

function FieldError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      style={{
        marginTop: 8,
        fontSize: 13,
        color: "var(--bad)",
        fontWeight: 700,
      }}
    >
      {message}
    </p>
  );
}

function FieldOk({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      style={{
        marginTop: 10,
        fontSize: 13,
        color: "var(--mintd)",
        fontWeight: 700,
      }}
    >
      {message}
    </p>
  );
}

export default function MyPageForm({
  loginId,
  name: initialName,
  phone: initialPhone,
  points,
  missing,
}: Props) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(formatPhoneMask(initialPhone));
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileOk, setProfileOk] = useState<string | null>(null);
  const [profileBusy, setProfileBusy] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [newPassword2Error, setNewPassword2Error] = useState<string | null>(
    null,
  );
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordOk, setPasswordOk] = useState<string | null>(null);
  const [passwordBusy, setPasswordBusy] = useState(false);

  const readOnlyStyle = {
    background: "var(--paper)",
    color: "var(--soft)",
  };

  async function onSaveProfile(event: FormEvent) {
    event.preventDefault();
    setProfileError(null);
    setProfileOk(null);

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

    setProfileBusy(true);
    const supabase = createBrowserSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setProfileBusy(false);
      setProfileError("로그인이 만료되었습니다. 다시 로그인해 주세요.");
      return;
    }
    const { error } = await supabase
      .from("users")
      .update({
        name: displayName,
        phone: toNational(parsedPhone),
      })
      .eq("uid", user.id);
    setProfileBusy(false);

    if (error) {
      const message = error.message.toLowerCase();
      if (
        message.includes("permission") ||
        message.includes("policy") ||
        message.includes("42501")
      ) {
        setProfileError("정보를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
        return;
      }
      setProfileError(authErrorMessage(error));
      return;
    }

    setProfileOk("저장했습니다.");
  }

  async function onChangePassword(event: FormEvent) {
    event.preventDefault();
    setPasswordError(null);
    setPasswordOk(null);

    if (!currentPassword) {
      setCurrentPasswordError("현재 비밀번호를 입력해 주세요.");
      return;
    }
    setCurrentPasswordError(null);

    if (newPassword.length < 6) {
      setNewPasswordError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    setNewPasswordError(null);

    if (newPassword !== newPassword2) {
      setNewPassword2Error("비밀번호가 서로 다릅니다.");
      return;
    }
    setNewPassword2Error(null);

    setPasswordBusy(true);
    const supabase = createBrowserSupabase();
    const { error: checkError } = await supabase.auth.signInWithPassword({
      email: toAuthEmail(loginId),
      password: currentPassword,
    });
    if (checkError) {
      setPasswordBusy(false);
      setCurrentPasswordError("현재 비밀번호가 올바르지 않습니다.");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setPasswordBusy(false);

    if (updateError) {
      setPasswordError(authErrorMessage(updateError));
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setNewPassword2("");
    setPasswordOk("비밀번호를 바꿨습니다.");
  }

  return (
    <div className="form" style={{ marginTop: 0 }}>
      {missing && (
        <p
          style={{
            marginBottom: 20,
            color: "var(--bad)",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          회원 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      <form onSubmit={onSaveProfile} noValidate>
        <div className="fld" style={{ marginTop: 0 }}>
          <label htmlFor="mypage-login-id">아이디</label>
          <input
            id="mypage-login-id"
            type="text"
            value={loginId}
            readOnly
            style={readOnlyStyle}
          />
        </div>
        <div className="fld">
          <label htmlFor="mypage-points">포인트</label>
          <input
            id="mypage-points"
            type="text"
            value={`${points.toLocaleString("ko-KR")}점`}
            readOnly
            style={readOnlyStyle}
          />
          <p
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "var(--soft)",
              lineHeight: 1.6,
            }}
          >
            포인트는 관리자만 바꿀 수 있습니다.
          </p>
        </div>
        <div className="fld">
          <label htmlFor="mypage-name">이름</label>
          <input
            id="mypage-name"
            type="text"
            autoComplete="name"
            value={name}
            aria-invalid={nameError ? true : undefined}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(null);
              setProfileOk(null);
            }}
            onBlur={(e) => {
              setNameError(
                e.currentTarget.value.trim() ? null : "이름을 입력해 주세요.",
              );
            }}
            required
          />
          <FieldError message={nameError} />
        </div>
        <div className="fld">
          <label htmlFor="mypage-phone">전화번호</label>
          <input
            id="mypage-phone"
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
              setProfileOk(null);
            }}
            onBlur={(e) =>
              setPhoneError(phoneFormatError(e.currentTarget.value))
            }
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
          <FieldError message={phoneError} />
        </div>

        {profileError && (
          <p
            style={{
              marginTop: 16,
              color: "var(--bad)",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {profileError}
          </p>
        )}
        <FieldOk message={profileOk} />

        <div className="linkrow" style={{ marginTop: 26 }}>
          <button
            className="btn btn--mint"
            type="submit"
            disabled={profileBusy || missing}
          >
            {profileBusy ? "저장 중…" : "정보 저장"}
          </button>
        </div>
      </form>

      <form
        onSubmit={onChangePassword}
        noValidate
        style={{
          marginTop: 32,
          paddingTop: 28,
          borderTop: "1px solid var(--line2)",
        }}
      >
        <p
          style={{
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
          }}
        >
          비밀번호 변경
        </p>
        <p
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "var(--soft)",
            lineHeight: 1.6,
          }}
        >
          로그인한 상태에서 바꿉니다. 메일로 찾는 기능은 아직 없습니다.
        </p>
        <div className="fld">
          <label htmlFor="mypage-password-current">현재 비밀번호</label>
          <input
            id="mypage-password-current"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            aria-invalid={currentPasswordError ? true : undefined}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setCurrentPasswordError(null);
              setPasswordOk(null);
            }}
            required
          />
          <FieldError message={currentPasswordError} />
        </div>
        <div className="fld">
          <label htmlFor="mypage-password-new">새 비밀번호</label>
          <input
            id="mypage-password-new"
            type="password"
            autoComplete="new-password"
            placeholder="6자 이상"
            value={newPassword}
            aria-invalid={newPasswordError ? true : undefined}
            onChange={(e) => {
              const next = e.target.value;
              setNewPassword(next);
              setNewPasswordError(null);
              setPasswordOk(null);
              if (newPassword2) {
                setNewPassword2Error(
                  next === newPassword2 ? null : "비밀번호가 서로 다릅니다.",
                );
              }
            }}
            onBlur={(e) => {
              const value = e.currentTarget.value;
              if (!value) {
                setNewPasswordError("새 비밀번호를 입력해 주세요.");
                return;
              }
              setNewPasswordError(
                value.length < 6 ? "비밀번호는 6자 이상이어야 합니다." : null,
              );
            }}
            required
            minLength={6}
          />
          <FieldError message={newPasswordError} />
        </div>
        <div className="fld">
          <label htmlFor="mypage-password-new2">새 비밀번호 확인</label>
          <input
            id="mypage-password-new2"
            type="password"
            autoComplete="new-password"
            value={newPassword2}
            aria-invalid={newPassword2Error ? true : undefined}
            onChange={(e) => {
              const next = e.target.value;
              setNewPassword2(next);
              setNewPassword2Error(null);
              setPasswordOk(null);
            }}
            onBlur={(e) => {
              const value = e.currentTarget.value;
              if (!value) {
                setNewPassword2Error("비밀번호 확인을 입력해 주세요.");
                return;
              }
              setNewPassword2Error(
                value === newPassword ? null : "비밀번호가 서로 다릅니다.",
              );
            }}
            required
            minLength={6}
          />
          <FieldError message={newPassword2Error} />
        </div>

        {passwordError && (
          <p
            style={{
              marginTop: 16,
              color: "var(--bad)",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {passwordError}
          </p>
        )}
        <FieldOk message={passwordOk} />

        <div className="linkrow" style={{ marginTop: 26 }}>
          <button
            className="btn btn--mint"
            type="submit"
            disabled={passwordBusy}
          >
            {passwordBusy ? "변경 중…" : "비밀번호 변경"}
          </button>
        </div>
      </form>
    </div>
  );
}
