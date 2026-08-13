import Link from "next/link";

import FaqList, { type FaqItem } from "@/components/FaqList";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "검진 비용 — 고다지 풋볼 플레이어 랩",
};

const PLANS = [
  {
    en: "EXAM ONLY",
    title: "정밀 검진",
    scope: "접수부터 성장 리포트까지 (STEP 01–05)",
    price: "39만원",
    unit: "부터",
    items: [
      "초기 문진 · 영상 검사 2경기",
      "현장 기술 진단 90분",
      "39개 항목 검진 결과지",
      "부모 · 선수 상담 90분",
    ],
    cta: "검진 예약",
    ctaClass: "btn btn--out",
    featured: false,
  },
  {
    en: "FULL CARE",
    title: "검진 + 12주 처방",
    scope: "접수부터 재검진까지 전 과정 (STEP 01–07)",
    price: "월 29만원",
    unit: "부터",
    items: [
      "정밀 검진 전 과정 포함",
      "전문 강사 배정 · 주 1~2회",
      "주간 훈련 처방전 · 4주마다 갱신",
      "4주 재검진 · 변화량 리포트",
      "소속팀 지도자용 훈련 요청서",
    ],
    cta: "상담 예약",
    ctaClass: "btn btn--mint",
    featured: true,
  },
  {
    en: "SINGLE DEPT",
    title: "단과 전문 레슨",
    scope: "검진을 마친 선수의 특정 분야 추가 수강",
    price: "회당 8만원",
    unit: "부터",
    items: [
      "약발 · 헤딩 · 프리킥 · 필라테스 · 리듬 등",
      "1:1 또는 2~4인 소그룹",
      "회차별 영상 피드백",
    ],
    cta: "강사 문의",
    ctaClass: "btn btn--out",
    featured: false,
  },
];

const FAQS: FaqItem[] = [
  {
    question: "지금 다니는 팀이나 레슨을 그만둬야 하나요?",
    answer:
      "아닙니다. 플레이어 랩은 소속팀을 대체하지 않습니다. 처방전은 소속팀 일정을 먼저 넣고, 남는 시간에 전문 레슨을 배치하는 방식으로 씁니다. 소속팀에 대한 평가나 이적 권유는 하지 않습니다.",
  },
  {
    question: "열 개 분야를 다 받아야 하나요?",
    answer:
      "아닙니다. 검진에서 개선필요 판정이 나온 1~3개 항목만 처방합니다. 필요 없는 수업을 늘리는 것은 아이의 시간을 뺏는 일이라고 봅니다. 판정이 정상으로 바뀌면 그 수업은 종료합니다.",
  },
  {
    question: "검진 없이 레슨만 받을 수는 없나요?",
    answer:
      "처음에는 어렵습니다. 무엇이 부족한지 모른 채 시작하면 지금과 같은 상황이 반복됩니다. 다만 이미 검진을 받으신 선수는 단과 전문 레슨을 회차 단위로 추가하실 수 있습니다.",
  },
  {
    question: "우리 아이가 선수로 성공할지 알 수 있나요?",
    answer:
      "알려드리지 않습니다. 유망주를 선별하거나 미래를 예측하는 서비스가 아닙니다. 플레이어 랩이 하는 일은 지금 부족한 부분을 정확히 찾고 남은 시간을 어떻게 쓸지 설계하는 것입니다. 등급이나 순위는 어떤 문서에도 표기하지 않습니다.",
  },
  {
    question: "아이가 결과지를 보고 상처받지 않을까요?",
    answer:
      "선수용 문서는 부모용과 다른 언어로 씁니다. 개선필요 항목은 “못하는 것”이 아니라 “다음에 배울 것”으로 적고, 상담 자리에서도 선수에게는 정상 판정 항목과 다음 목표를 중심으로 이야기합니다. 필요한 경우 심리 상담사가 함께 참여합니다.",
  },
  {
    question: "몇 살부터 받을 수 있나요?",
    answer:
      "만 8세부터 권장합니다. 초등 저학년은 기술의 폭을 넓히는 데, 중학생은 성장기 관리와 포지션 탐색에, 고등학생은 진학 목표에서 역산한 강점 설계에 초점을 둡니다. 연령에 따라 검사 항목과 처방 구성이 달라집니다.",
  },
  {
    question: "아이 영상과 개인정보는 어떻게 관리되나요?",
    answer:
      "미성년자 자료이므로 보호자 동의서를 받은 뒤에만 수집합니다. 영상과 측정 데이터는 분석 목적 외에 사용하지 않으며, 보관 기간과 파기 시점을 동의서에 명시합니다. 홍보에 사용할 경우 매번 별도 동의를 받습니다.",
  },
];

export default function Price() {
  return (
    <div className="page on">
      <PageHead
        crumb="06 · PRICE"
        title="검진부터 시작하세요"
        lead="검진 없이 레슨만 신청하실 수는 없습니다. 무엇을 훈련할지 모른 채 하는 수업은, 시간을 쓰는 일이기 때문입니다."
      />

      <section className="sec">
        <div className="wrap">
          <div className="plans" style={{ marginTop: 0 }}>
            {PLANS.map((plan) => (
              <div
                className={plan.featured ? "plan plan--p rv" : "plan rv"}
                key={plan.en}
              >
                {plan.featured && <div className="plan__bg">추천</div>}
                <div className="plan__en">{plan.en}</div>
                <h3>{plan.title}</h3>
                <p className="plan__d">{plan.scope}</p>
                <div className="plan__pr">
                  {plan.price}
                  <small>{plan.unit}</small>
                </div>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href="/apply" className={plan.ctaClass}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="note rv">
            <em>NOTE</em>
            <span>
              <b>클럽 · 학교 단체 검진</b>은 20명 이상부터 별도 견적으로
              진행합니다. 팀 전체 결과를 묶은 팀 리포트가 함께 나가며, 지도자용
              훈련 요청서도 인원수만큼 발행됩니다.
            </span>
          </div>

          <div className="rv" style={{ marginTop: 56 }}>
            <div className="eyebrow">자주 묻는 질문</div>
            <h2 className="h2">먼저 확인하실 내용</h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>
    </div>
  );
}
