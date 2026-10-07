"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { isAdminUser } from "@/lib/auth-admin";
import { loginIdFromAuthEmail } from "@/lib/auth-login-id";
import { createBrowserSupabase } from "@/lib/supabase/client";

/**
 * 상단바의 로그인/로그아웃.
 * 세션은 쿠키에 있어서, 여기서는 표시만 맞추고 로그아웃 버튼을 제공한다.
 */
export default function AuthNav({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);
  const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabase();

    function nameFromMeta(user: User) {
      const n = user.user_metadata?.name;
      return typeof n === "string" && n.trim() ? n.trim() : null;
    }

    async function loadTableName(user: User) {
      const { data } = await supabase
        .from("users")
        .select("name")
        .eq("uid", user.id)
        .maybeSingle();
      const tableName = typeof data?.name === "string" ? data.name.trim() : "";
      if (tableName) setDisplayName(tableName);
    }

    function applyUser(user: User | null) {
      if (!user) {
        setSignedIn(false);
        setDisplayName(null);
        setIsAdmin(false);
        setMenuOpen(false);
        return;
      }
      setSignedIn(true);
      setIsAdmin(isAdminUser(user));
      setDisplayName(nameFromMeta(user) || loginIdFromAuthEmail(user.email));
      setTimeout(() => {
        void loadTableName(user);
      }, 0);
    }

    supabase.auth.getUser().then(({ data }) => {
      applyUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applyUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!boxRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const chipStyle = { minWidth: 86 };

  async function logout() {
    setMenuOpen(false);
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
    const label = displayName || "회원";
    const initial = label.slice(0, 1);

    return (
      <div
        className={menuOpen ? "account on" : "account"}
        ref={boxRef}
      >
        <button
          className="account__btn"
          type="button"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="account__av">{initial}</span>
          <span className="account__nm">
            {label}
            <i>님</i>
          </span>
          <svg
            className="account__ch"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="account__menu" role="menu">
          {isAdmin ? (
            <Link
              href="/admin"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onNavigate?.();
              }}
            >
              어드민페이지
            </Link>
          ) : null}
          <Link
            href="/mypage"
            role="menuitem"
            onClick={() => {
              setMenuOpen(false);
              onNavigate?.();
            }}
          >
            마이페이지
          </Link>
          <button type="button" role="menuitem" onClick={() => void logout()}>
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn btn--ghost" onClick={onNavigate} style={chipStyle}>
      로그인
    </Link>
  );
}
