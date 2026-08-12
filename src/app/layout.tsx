import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "고다지 풋볼 플레이어 랩 — 선수를 레슨하기 전에, 먼저 진단합니다",
  description:
    "유소년 축구 진단 클리닉. 5개 영역 39개 항목을 측정해 또래 표준범위와 비교하고, 분야별 전문 강사진의 훈련 처방으로 연결합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="hasbar">
        <SiteNav />
        {children}
        <SiteFooter />
        <RevealOnScroll />
      </body>
    </html>
  );
}
