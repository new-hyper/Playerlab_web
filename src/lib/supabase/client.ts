import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * 브라우저(클라이언트 컴포넌트)에서 쓰는 클라이언트.
 * 여러 번 호출해도 내부에서 하나를 재사용한다.
 */
export function createBrowserSupabase() {
  return createBrowserClient(getSupabaseUrl(), getSupabaseAnonKey());
}
