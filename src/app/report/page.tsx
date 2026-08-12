import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "검진 결과지 예시 — 고다지 풋볼 플레이어 랩",
};

export default function Report() {
  return (
    <div className="page on">
      <PageHead
        crumb="SAMPLE · 검진 결과지"
        title="선수 검진 결과지"
        lead="실제로 발행되는 결과지의 예시입니다. 39개 항목 전체가 영역별로 묶여 있고, 항목마다 결과값·또래 표준범위·백분위·판정이 함께 표시됩니다. 개인정보는 가상으로 작성했습니다."
      />
      <ComingSoon />
    </div>
  );
}
