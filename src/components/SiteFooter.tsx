import Link from "next/link";
import BrandMark from "./BrandMark";

const FOOTER_LINKS = [
  { href: "/about", label: "소개" },
  { href: "/scan", label: "선수진단" },
  { href: "/process", label: "진행 절차" },
  { href: "/coach", label: "전문 강사진" },
  { href: "/rx", label: "훈련 처방" },
  { href: "/price", label: "검진 비용" },
  { href: "/report", label: "결과지 예시" },
];

export default function SiteFooter() {
  return (
    <>
      <section className="fin">
        <div className="wrap fin__in">
          <h2>
            먼저 <span>진단</span>부터 받아 보세요
          </h2>
          <p>
            초기 문진 3단계를 작성하시면 요약 리포트를 보내 드립니다. 비용은
            없고, 다음 단계는 결과를 보신 뒤 결정하시면 됩니다.
          </p>
          <div className="fin__c">
            <Link href="/apply" className="btn btn--mint btn--lg">
              무료 선수진단 받기
            </Link>
            <Link href="/report" className="btn btn--ghost btn--lg">
              검진 결과지 보기
            </Link>
          </div>
          <p className="fin__m">
            고다지 풋볼 플레이어 랩 · 진단 시스템 GODZ SCAN
          </p>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap foot__in">
          <div>
            <span className="lockup">
              <BrandMark />
            </span>
            <div className="krname">고다지 풋볼 플레이어 랩</div>
            <p>
              고다지 풋볼 플레이어 랩은 선수 선발이나 유망주 예측 서비스가
              아닙니다. 부족한 부분을 진단하고, 해당 분야 전문 강사와 훈련
              처방전을 제공하는 유소년 축구 진단 기관입니다. 의료기관이 아니며
              의학적 진단을 제공하지 않습니다.
            </p>
          </div>
          <div className="foot__l">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
