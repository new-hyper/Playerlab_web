/** 화면의 아이디를 Auth 이메일 칸에 넣기 위한 도메인. 실제 메일함은 없다. */
export const AUTH_EMAIL_DOMAIN = "id.playerlab.internal";

export function parseLoginId(input: string): string | null {
  const loginId = input.trim().toLowerCase();
  if (!/^[a-z0-9]{4,20}$/.test(loginId)) return null;
  return loginId;
}

export function toAuthEmail(loginId: string): string {
  return `${loginId}@${AUTH_EMAIL_DOMAIN}`;
}

/** Auth 가짜 메일에서 화면용 아이디를 다시 꺼낸다. */
export function loginIdFromAuthEmail(email: string | undefined | null): string {
  if (!email) return "";
  const suffix = `@${AUTH_EMAIL_DOMAIN}`;
  const lower = email.toLowerCase();
  if (lower.endsWith(suffix)) {
    return lower.slice(0, -suffix.length);
  }
  const at = lower.indexOf("@");
  return at === -1 ? lower : lower.slice(0, at);
}
