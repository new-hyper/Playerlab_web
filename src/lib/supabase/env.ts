/**
 * 슈파베이스 주소와 공개 키.
 * NEXT_PUBLIC_ 이면 브라우저에도 실리는 값이다. 비밀이 아니라서
 * 데이터 보호는 테이블 RLS 가 담당한다. Flutter 의 --dart-define 과 같다.
 */
export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error(
      ".env.local 에 NEXT_PUBLIC_SUPABASE_URL 이 필요합니다. " +
        "값을 고친 뒤에는 개발 서버를 다시 시작해야 반영됩니다.",
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error(
      ".env.local 에 NEXT_PUBLIC_SUPABASE_ANON_KEY 가 필요합니다. " +
        "값을 고친 뒤에는 개발 서버를 다시 시작해야 반영됩니다.",
    );
  }
  return key;
}
