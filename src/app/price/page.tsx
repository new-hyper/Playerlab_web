import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "검진 비용 — 고다지 풋볼 플레이어 랩",
};

export default function Price() {
  return (
    <div className="page on">
      <PageHead
        crumb="06 · PRICE"
        title="검진부터 시작하세요"
        lead="검진 없이 레슨만 신청하실 수는 없습니다. 무엇을 훈련할지 모른 채 하는 수업은, 시간을 쓰는 일이기 때문입니다."
      />
      <ComingSoon />
    </div>
  );
}
