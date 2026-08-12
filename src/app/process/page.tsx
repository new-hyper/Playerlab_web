import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "진행 절차 — 고다지 풋볼 플레이어 랩",
};

export default function Process() {
  return (
    <div className="page on">
      <PageHead
        crumb="03 · PROCESS"
        title={
          <>
            접수부터 재검진까지
            <br />
            일곱 단계
          </>
        }
        lead="병원의 진료 과정을 그대로 옮겼습니다. 한 곳에서 모두 진행하기 때문에 검사한 사람이 진단하고, 진단한 사람이 처방합니다. 중간에서 정보가 끊기지 않습니다."
      />
      <ComingSoon />
    </div>
  );
}
