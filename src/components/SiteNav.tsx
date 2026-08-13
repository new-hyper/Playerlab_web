"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";

const MENU = [
  { href: "/about", label: "플레이어랩 소개", no: "01" },
  { href: "/scan", label: "선수진단", no: "02" },
  { href: "/process", label: "진행 절차", no: "03" },
  { href: "/coach", label: "전문 강사진", no: "04" },
  { href: "/rx", label: "훈련 처방", no: "05" },
  { href: "/price", label: "검진 비용", no: "06" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const active = (href: string) => (pathname === href ? "on" : undefined);

  return (
    <>
      <nav className="nav">
        <div className="wrap nav__t">
          <Link href="/" className="brand lockup">
            <BrandMark />
          </Link>
          <div className="menu">
            {MENU.map((item) => (
              <Link key={item.href} href={item.href} className={active(item.href)}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/apply" className="btn btn--mint">
            무료 선수진단
          </Link>
          <button
            className="ham"
            aria-label="메뉴 열기"
            onClick={() => setOpen(true)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
        <div className="wrap menu--m">
          {MENU.map((item) => (
            <Link key={item.href} href={item.href} className={active(item.href)}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div
        className={open ? "scrim on" : "scrim"}
        onClick={() => setOpen(false)}
      />

      <aside className={open ? "drawer on" : "drawer"}>
        <div className="drawer__top">
          <span className="lockup">
            <BrandMark />
          </span>
          <button
            className="drawer__x"
            aria-label="닫기"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
        <nav>
          {MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active(item.href)}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <em>{item.no}</em>
            </Link>
          ))}
          <Link
            href="/report"
            className={active("/report")}
            onClick={() => setOpen(false)}
          >
            검진 결과지 예시<em>SAMPLE</em>
          </Link>
        </nav>
        <div className="drawer__cta">
          <Link
            href="/apply"
            className="btn btn--mint"
            onClick={() => setOpen(false)}
          >
            무료 선수진단 받기
          </Link>
          <Link href="/" className="btn btn--ghost" onClick={() => setOpen(false)}>
            홈으로
          </Link>
        </div>
      </aside>

      <div className="mbar">
        <Link href="/apply" className="btn btn--mint">
          무료 선수진단
        </Link>
        <Link href="/report" className="btn btn--out">
          결과지 보기
        </Link>
      </div>
    </>
  );
}
