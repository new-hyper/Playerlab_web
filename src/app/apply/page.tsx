import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "무료 선수진단 신청 — 고다지 풋볼 플레이어 랩",
};

export default function Apply() {
  return (
    <div className="page on">
      <PageHead
        crumb="FREE · 무료 선수진단"
        title={
          <>
            초기 문진으로
            <br />
            먼저 방향을 확인하세요
          </>
        }
        lead="세 단계, 약 2분이면 끝납니다. 작성하시면 요약 리포트를 보내 드리고, 정밀 검진 여부는 그걸 보신 뒤 결정하시면 됩니다. 비용은 없습니다."
      />
      <ComingSoon />
    </div>
  );
}
