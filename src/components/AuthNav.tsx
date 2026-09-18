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
  const [phone, setPhone] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createBrowserSupabase();

    function applyUser(userPhone: string | undefined) {
      setPhone(userPhone ?? null);
    }

    supabase.auth.getUser().then(({ data }) => {
      applyUser(data.user?.phone);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applyUser(session?.user.phone);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    const supabase = createBrowserSupabase();
    await supabase.auth.signOut();
    onNavigate?.();
    router.push("/");
    router.refresh();
  }

  if (phone === undefined) {
    return null;
  }

  if (phone) {
    return (
      <button className="btn btn--ghost" type="button" onClick={logout}>
        로그아웃
      </button>
    );
  }

  return (
    <Link href="/login" className="btn btn--ghost" onClick={onNavigate}>
      로그인
    </Link>
  );
}
