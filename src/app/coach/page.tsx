import Link from "next/link";

import CoachList from "@/components/CoachList";
import PageHead from "@/components/PageHead";
import { getCoaches } from "@/lib/coaches";

export const metadata = {
  title: "전문 강사진 — 고다지 풋볼 플레이어 랩",
};

// 강사진을 고치면 새로고침만으로 바로 보이도록 매 요청마다 다시 그린다.
export const dynamic = "force-dynamic";

export default async function Coach() {
  const coaches = await getCoaches();

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

      <section className="sec">
        <div className="wrap">
          <CoachList coaches={coaches} />

          <div className="note rv">
            <em>NOTE</em>
            <span>
              <b>열 개 분야를 다 받는 것이 아닙니다.</b> 검진에서 개선필요
              판정이 나온 1~3개 항목만 처방합니다. 나머지 시간은 소속팀 훈련과
              회복에 씁니다. 강사 분야는 진단 데이터가 쌓이는 대로 계속
              늘어납니다.
            </span>
          </div>

          <div className="linkrow">
            <Link href="/rx" className="btn btn--ink">
              훈련 처방 보기
            </Link>
            <Link href="/apply" className="btn btn--out">
              무료 선수진단 받기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
