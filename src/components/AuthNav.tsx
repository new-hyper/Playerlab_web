"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { createBrowserSupabase } from "@/lib/supabase/client";

/**
 * 상단바의 로그인/로그아웃.
 * 세션은 쿠키에 있어서, 여기서는 표시만 맞추고 로그아웃 버튼을 제공한다.
 */
export default function AuthNav({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const supabase = createBrowserSupabase();

    supabase.auth.getUser().then(({ data }) => {
      setSignedIn(Boolean(data.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session?.user));
    });

    return () => subscription.unsubscribe();
  }, []);

  const chipStyle = { minWidth: 86 };

  async function logout() {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    onNavigate?.();
    router.push("/");
    router.refresh();
  }

  if (signedIn === undefined) {
    return null;
  }

  if (signedIn) {
    return (
      <>
        <Link href="/mypage" className="btn btn--ghost" onClick={onNavigate}>
          마이페이지
        </Link>
        <button
          className="btn btn--ghost"
          type="button"
          onClick={logout}
          style={{
            ...chipStyle,
            background: "#C9D4E3",
            color: "var(--mintd)",
          }}
        >
          로그아웃
        </button>
      </>
    );
  }

  return (
    <Link href="/login" className="btn btn--ghost" onClick={onNavigate} style={chipStyle}>
      로그인
    </Link>
  );
}
