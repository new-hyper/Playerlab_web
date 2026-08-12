import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "훈련 처방 — 고다지 풋볼 플레이어 랩",
};

export default function Prescription() {
  return (
    <div className="page on">
      <PageHead
        crumb="05 · PRESCRIPTION"
        title={
          <>
            이번 주에 뭘 시켜야 하는지
            <br />
            한 장에 적혀 있습니다
          </>
        }
        lead="검진이 끝나면 처방전을 드립니다. 어느 과에서 몇 번, 어느 요일에, 언제 쉬는지까지 정해진 한 장입니다. 4주 재검진 때마다 다시 씁니다."
      />
      <ComingSoon />
    </div>
  );
}
