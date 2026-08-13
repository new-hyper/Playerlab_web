import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import PageHead from "@/components/PageHead";

export const metadata = {
  title: "진행 절차 — 고다지 풋볼 플레이어 랩",
};

/** 단계마다 그림만 다르고 바깥 svg 속성은 모두 같아서 껍데기를 하나로 뒀다. */
function StepIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

type Step = {
  no: string;
  title: string;
  body: ReactNode;
  chips: { text: string; outline?: boolean }[];
  icon: ReactNode;
};

const STEPS: Step[] = [
  {
    no: "STEP 01 · RECEPTION",
    title: "선수 접수",
    body: "선수 차트를 개설합니다. 이름, 연령, 소속팀, 포지션, 주발, 현재 받고 있는 레슨과 부상 이력을 등록하면 이후 모든 검사와 처방이 이 차트에 누적됩니다. 차트번호는 재검진 때도 그대로 씁니다.",
    chips: [
      { text: "온라인 5분" },
      { text: "차트번호 발급", outline: true },
      { text: "보호자 동의서", outline: true },
    ],
    icon: (
      <>
        <path d="M9 3h6v3H9zM7 6h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2z" />
        <path d="M12 11v5M9.5 13.5h5" />
      </>
    ),
  },
  {
    no: "STEP 02 · INTAKE",
    title: "초기 문진",
    body: "부모님 20문항, 선수 10문항. 무엇이 고민인지, 일주일에 몇 번 뛰고 몇 시간 자는지, 실제 출전 시간은 얼마인지 묻습니다. 정체의 원인이 실력이 아니라 출전 시간이나 수면인 경우가 생각보다 많습니다.",
    chips: [
      { text: "온라인 10분" },
      { text: "무료" },
      { text: "요약 리포트 발송", outline: true },
    ],
    icon: <path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5" />,
  },
  {
    no: "STEP 03 · VIDEO EXAM",
    title: "영상 검사",
    body: "풀타임 경기 영상 2경기를 프레임 단위로 코딩합니다. 하이라이트가 아니라 풀타임이어야 합니다. 잘한 장면만 모아 놓으면 습관이 보이지 않기 때문입니다. 소요는 접수 후 3~7일입니다.",
    chips: [
      { text: "경기 2회" },
      { text: "GODZ SCAN 코딩", outline: true },
      { text: "3~7일", outline: true },
    ],
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M10 9.5l5 2.5-5 2.5z" />
      </>
    ),
  },
  {
    no: "STEP 04 · DIAGNOSIS",
    title: "기술 진단",
    body: (
      <>
        현장에서 직접 측정합니다. 스프린트, 방향전환, 점프, 지구력, 약발, 키핑,
        제공권. 영상 데이터와 합쳐 또래 표준범위와 비교하고 항목별로{" "}
        <strong>정상 · 관찰요망 · 개선필요</strong> 판정을 냅니다.
      </>
    ),
    chips: [
      { text: "현장 90분" },
      { text: "4~6인 소그룹" },
      { text: "39개 항목 판정", outline: true },
    ],
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
  },
  {
    no: "STEP 05 · REPORT",
    title: "성장 리포트",
    body: (
      <>
        검진 결과지와 함께 부모님·선수 동석 상담을 진행합니다. 결과를 읽는 데서
        끝나지 않고,{" "}
        <strong>부족한 부분을 채울 것인지 잘하는 부분을 더 키울 것인지</strong>
        를 함께 정합니다. 그리고 이번 12주만이 아니라 진학과 그 다음 무대까지
        이어지는 장기 로드맵과 연간 스케줄을 같이 설계합니다. 선수용 문서는
        “못하는 것”이 아니라 “다음에 배울 것”으로 적습니다.
      </>
    ),
    chips: [
      { text: "상담 90분" },
      { text: "보완 대 강점 배분 결정", outline: true },
      { text: "장기 로드맵 설계", outline: true },
      { text: "부모·선수 동석", outline: true },
    ],
    icon: <path d="M4 19V5M4 19h16M7 15l4-5 3 3 5-7" />,
  },
  {
    no: "STEP 06 · PRESCRIPTION",
    title: "훈련 처방",
    body: (
      <>
        개선필요 판정이 나온 항목에 해당하는 <strong>전문 강사만</strong>{" "}
        배정합니다. 그리고 소속팀 일정까지 넣어 요일별 훈련표를 씁니다. 무엇을
        하는지만큼 무엇을 하지 않는지, 언제 쉬는지가 함께 적힙니다.
      </>
    ),
    chips: [
      { text: "전문 강사 1~3명" },
      { text: "주간 훈련표", outline: true },
      { text: "지도자용 요청서", outline: true },
    ],
    icon: (
      <>
        <rect x="3" y="8" width="18" height="9" rx="4.5" />
        <path d="M12 8v9" />
      </>
    ),
  },
  {
    no: "STEP 07 · FOLLOW-UP",
    title: "재검진",
    body: "4주마다 같은 항목을 같은 방법으로 다시 측정합니다. 약발 12% → 24%처럼 변화량이 숫자로 남고, 판정이 정상으로 바뀐 항목의 수업은 종료하고 다음 항목으로 넘어갑니다.",
    chips: [
      { text: "4주 주기" },
      { text: "변화량 리포트", outline: true },
      { text: "처방 갱신", outline: true },
    ],
    icon: <path d="M20 12a8 8 0 11-2.5-5.8M20 4v4h-4" />,
  },
];

type Bar = { kind: "fix" | "grow" | "care"; label: string; width: string };

const RATIOS: { age: string; stage: string; bars: Bar[]; note: ReactNode }[] = [
  {
    age: "U8–U11",
    stage: "골든에이지",
    bars: [
      { kind: "fix", label: "보완 70", width: "70%" },
      { kind: "grow", label: "강점 30", width: "30%" },
    ],
    note: (
      <>
        특정 강점에 몰아주지 않습니다.{" "}
        <b>양발, 볼 터치 총량, 여러 포지션 경험</b>을 넓혀 두는 시기입니다.
      </>
    ),
  },
  {
    age: "U12–U13",
    stage: "성장급등기",
    bars: [
      { kind: "fix", label: "보완 40", width: "40%" },
      { kind: "grow", label: "강점 30", width: "30%" },
      { kind: "care", label: "부하관리 30", width: "30%" },
    ],
    note: (
      <>
        키가 먼저 자라 몸이 말을 듣지 않는 시기입니다. 기술 정체는 정상이며,{" "}
        <b>여기서 “실력이 떨어졌다”고 판단하는 것이 가장 흔한 오진</b>입니다.
      </>
    ),
  },
  {
    age: "U14–U15",
    stage: "특화 시작",
    bars: [
      { kind: "fix", label: "보완 40", width: "40%" },
      { kind: "grow", label: "강점 60", width: "60%" },
    ],
    note: (
      <>
        포지션이 구체화됩니다. 약점은 전부가 아니라{" "}
        <b>경기에서 치명적인 1~2개만</b> 골라 고칩니다.
      </>
    ),
  },
  {
    age: "U16+",
    stage: "진입 설계",
    bars: [
      { kind: "fix", label: "보완 20", width: "20%" },
      { kind: "grow", label: "강점 80", width: "80%" },
    ],
    note: (
      <>
        가고 싶은 무대의 요구 조건에서 역산합니다.{" "}
        <b>선택받는 이유 한 가지</b>를 확실하게 만드는 데 훈련의 대부분을 씁니다.
      </>
    ),
  },
];

const ROADMAP = [
  {
    term: "NOW · 12주",
    title: "현재 사이클",
    desc: "개선필요 1~3개 항목을 처방하고 4주마다 재검진합니다.",
    output: "주간 훈련 처방전",
  },
  {
    term: "1년 · 시즌",
    title: "연간 스케줄",
    desc: "시즌·비시즌을 나눠 언제 기술을 쌓고 언제 몸을 만들지 배치합니다. 성장급등기 예상 시점도 함께 넣습니다.",
    output: "연간 훈련 캘린더",
  },
  {
    term: "2~3년 · 진학",
    title: "진학 설계",
    desc: "가고 싶은 중·고교 팀의 요구 조건에서 역산해, 그때까지 어떤 항목을 표준범위 안에 넣어야 하는지 정합니다.",
    output: "목표 팀별 요구 조건표",
  },
  {
    term: "그 다음 · 상위 무대",
    title: "프로까지의 경로",
    desc: "대학·실업·프로 유스 등 갈 수 있는 경로를 모두 펼쳐 놓고, 각 경로가 요구하는 조건과 남은 시간을 함께 확인합니다.",
    output: "경로별 진입 조건 비교",
  },
];

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

      <section className="sec sec--w">
        <div className="wrap">
          <div className="flow" style={{ marginTop: 0 }}>
            {STEPS.map((step) => (
              <div className="fl rv" key={step.no}>
                <div className="fl__rail">
                  <div className="fl__ic">
                    <StepIcon>{step.icon}</StepIcon>
                  </div>
                  <div className="fl__ln" />
                </div>
                <div className="fl__bd">
                  <div className="fl__no">{step.no}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <div className="fl__meta">
                    {step.chips.map((chip) => (
                      <span
                        className={chip.outline ? "chip chip--o" : "chip"}
                        key={chip.text}
                      >
                        {chip.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rv" style={{ marginTop: "clamp(56px,7vw,86px)" }}>
            <div className="eyebrow">STEP 05 상세 · 상담에서 정하는 것</div>
            <h2 className="h2">
              채울 것인가,
              <br />
              키울 것인가
            </h2>
            <p className="lede">
              상담의 절반은 이 질문에 답하는 시간입니다. “둘 다 하세요”는 답이
              아닙니다. 나이와 성장 단계에 따라 배분 비율이 달라지고, 플레이어
              랩은 그 기준을 미리 정해 두고 공개합니다.
            </p>
          </div>

          <div className="rule rv">
            <p className="rule__hl">
              약점은, 그 약점이 <mark>강점을 못 쓰게 막을 때만</mark> 고칩니다.
            </p>
            <p className="rule__sub">
              왼발을 못 쓰는 것 자체는 문제가 아닙니다. 왼발을 못 써서 오른발
              크로스라는 강점이 봉쇄될 때 비로소 문제가 됩니다. 모든 약점을
              고치려다 아무 강점도 남지 않는 것을 가장 경계합니다. 이 배분은
              부모님·선수와 함께 이야기해 정하고, 결과는 처방전에 그대로
              반영됩니다.
            </p>
            <div className="ratio">
              <div className="ratio__hd">
                <span>AGE GROUP</span>
                <span>보완 · 강점 · 관리 배분</span>
              </div>
              {RATIOS.map((row) => (
                <div className="ratio__r" key={row.age}>
                  <div className="ratio__age">
                    {row.age}
                    <small>{row.stage}</small>
                  </div>
                  <div className="ratio__bars">
                    {row.bars.map((bar) => (
                      <div
                        className={`ratio__bar ${bar.kind}`}
                        key={bar.label}
                        style={{ "--w": bar.width } as CSSProperties}
                      >
                        {bar.label}
                      </div>
                    ))}
                  </div>
                  <p className="ratio__note">{row.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rv" style={{ marginTop: "clamp(48px,6vw,74px)" }}>
            <div className="eyebrow">성장 로드맵</div>
            <h2 className="h2">12주만 보지 않습니다</h2>
            <p className="lede">
              지금의 12주가 어디로 이어지는지 함께 그립니다. 프로까지 가는 길을
              구간으로 나누고, 각 구간에서 무엇을 갖춰야 하는지 미리 정해 두면
              매년 무엇을 훈련할지가 저절로 정해집니다.
            </p>
          </div>

          <div className="road rv">
            {ROADMAP.map((item) => (
              <div className="rd" key={item.term}>
                <div className="rd__dot" />
                <div className="rd__t">{item.term}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <span className="rd__o">{item.output}</span>
              </div>
            ))}
          </div>

          <div className="note rv">
            <em>NOTE</em>
            <span>
              <b>로드맵은 예측이 아니라 계획입니다.</b> 프로가 될 수 있는지를
              판정하지 않습니다. 각 경로가 요구하는 조건과 지금의 위치, 남은
              시간을 정확히 보여 드리고 <b>선택은 선수와 부모님이 하십니다.</b>{" "}
              재검진 때마다 로드맵도 함께 갱신합니다.
            </span>
          </div>

          <div className="linkrow">
            <Link href="/apply" className="btn btn--ink">
              선수 접수하기
            </Link>
            <Link href="/price" className="btn btn--out">
              검진 비용 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
