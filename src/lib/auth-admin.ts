/**
 * 어드민 여부는 JWT 의 app_metadata.role 만 본다.
 * user_metadata 는 브라우저에서 updateUser 로 위조할 수 있어서 쓰지 않는다.
 * Flutter 로 치면 클라이언트가 고칠 수 있는 SharedPreferences 가 아니라,
 * 서버만 쓰는 권한 플래그에 가깝다.
 */
export function isAdminFromClaims(claims: unknown): boolean {
  if (!claims || typeof claims !== "object") return false;
  const app = (claims as { app_metadata?: unknown }).app_metadata;
  if (!app || typeof app !== "object") return false;
  return (app as { role?: unknown }).role === "admin";
}

export function isAdminUser(user: { app_metadata?: unknown } | null | undefined): boolean {
  if (!user) return false;
  const app = user.app_metadata;
  if (!app || typeof app !== "object") return false;
  return (app as { role?: unknown }).role === "admin";
}
