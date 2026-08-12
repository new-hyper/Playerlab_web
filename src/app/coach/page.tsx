import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "전문 강사진 — 고다지 풋볼 플레이어 랩",
};

export default function Coach() {
  return (
    <div className="page on">
      <PageHead
        crumb="04 · SPECIALIST"
        title={
          <>
            한 분야만 보는
            <br />
            전문 강사가 있습니다
          </>
        }
        lead="종합병원에 진료과가 나뉘어 있듯이, 축구도 세부 기술마다 가르치는 방법이 완전히 다릅니다. 진단에서 개선필요 판정이 나온 항목의 강사에게만 연결합니다. 카드를 누르면 커리큘럼과 종료 기준을 볼 수 있습니다."
      />
      <ComingSoon />
    </div>
  );
}
