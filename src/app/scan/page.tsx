import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "선수진단 — 고다지 풋볼 플레이어 랩",
};

export default function Scan() {
  return (
    <div className="page on">
      <PageHead
        crumb="02 · DIAGNOSIS"
        title={
          <>
            다섯 개 영역,
            <br />
            39개 항목을 검사합니다
          </>
        }
        lead="기술만 보면 아이의 절반만 보게 됩니다. 진단 시스템 GODZ SCAN은 현장 측정과 경기 영상 코딩을 합쳐, 항목마다 또래 표준범위와 비교하고 판정을 냅니다."
      />
      <ComingSoon />
    </div>
  );
}
