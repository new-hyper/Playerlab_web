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
