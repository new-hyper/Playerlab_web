import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * 서버(페이지, 서버 액션)에서 쓰는 클라이언트.
 * 요청마다 쿠키를 읽어야 해서 매번 새로 만든다.
 * 서버 컴포넌트는 쿠키를 쓰지 못하므로, 만료된 토큰 갱신은 proxy 가 맡는다.
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, _headers) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // 서버 컴포넌트에서 호출되면 무시한다. proxy 가 대신 갱신한다.
        }
      },
    },
  });
}
