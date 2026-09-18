import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * 매 요청 앞에서 세션 쿠키를 갱신한다.
 * Next.js 서버 컴포넌트는 쿠키를 쓸 수 없어서, 이 단계가 없으면
 * 토큰이 만료됐을 때 로그인이 풀린 것처럼 보인다.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([key, value]) =>
          supabaseResponse.headers.set(key, value),
        );
      },
    },
  });

  // createServerClient 와 getClaims 사이에 다른 로직을 넣지 않는다.
  // 넣으면 세션이 랜덤하게 풀리는 원인을 찾기 어렵다.
  await supabase.auth.getClaims();

  return supabaseResponse;
}
