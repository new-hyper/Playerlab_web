import Link from "next/link";
import type { ReactNode } from "react";

import PageHead from "@/components/PageHead";

export const metadata = {
  title: "훈련 처방 — 고다지 풋볼 플레이어 랩",
};

const RULES = [
  "소속팀 훈련 일정을 먼저 넣고 계산합니다",
  "처방된 전문 레슨을 회복 가능한 요일에 배치합니다",
  "쉬는 날을 반드시 지정합니다 — 안 하는 것도 처방입니다",
  "경기 다음 날에는 고강도 훈련을 넣지 않습니다",
  "소속팀 지도자에게 그대로 전달할 수 있는 형식입니다",
];

const PRESCRIBED = [
  { field: "약발 트레이닝", cycle: "주 1회 · 60분" },
  { field: "볼 키핑", cycle: "주 1회 · 60분" },
  { field: "심리 상담", cycle: "격주 · 40분" },
];

const DAYS = ["월", "화", "수", "목", "금", "토", "일"];

/** 주간 훈련표 한 칸. kind 가 셀 색을 정한다. */
type Cell = { kind: "e" | "tm" | "lb" | "rs"; text: ReactNode };

const SCHEDULE: { row: string; cells: Cell[] }[] = [
  {
    row: "오전",
    cells: [
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
      { kind: "tm", text: "경기" },
      {
        kind: "rs",
        text: (
          <>
            완전
            <br />
            휴식
          </>
        ),
      },
    ],
  },
  {
    row: "오후",
    cells: [
      {
        kind: "tm",
        text: (
          <>
            팀<br />
            훈련
          </>
        ),
      },
      {
        kind: "lb",
        text: (
          <>
            약발
            <br />
            60분
          </>
        ),
      },
      {
        kind: "tm",
        text: (
          <>
            팀<br />
            훈련
          </>
        ),
      },
      {
        kind: "lb",
        text: (
          <>
            키핑
            <br />
            60분
          </>
        ),
      },
      {
        kind: "tm",
        text: (
          <>
            팀<br />
            훈련
          </>
        ),
      },
      { kind: "e", text: "—" },
      {
        kind: "rs",
        text: (
          <>
            스트
            <br />
            레칭
          </>
        ),
      },
    ],
  },
  {
    row: "야간",
    cells: [
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
      {
        kind: "lb",
        text: (
          <>
            심리
            <br />
            격주
          </>
        ),
      },
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
      { kind: "e", text: "—" },
    ],
  },
];

const LEGEND = [
  { color: "rgba(16,34,74,.11)", label: "소속팀" },
  { color: "#0A8C70", label: "플레이어 랩 처방" },
  { color: "rgba(232,135,30,.3)", label: "회복 · 휴식" },
];

export default function Rx() {
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

      <section className="sec sec--w">
        <div className="wrap">
          <div className="rxs" style={{ marginTop: 0 }}>
            <div className="rv">
              <h2 className="h3">처방전을 쓰는 다섯 가지 원칙</h2>
              <ul className="pts">
                {RULES.map((rule, i) => (
                  <li key={rule}>
                    <i>{String(i + 1).padStart(2, "0")}</i>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--soft)",
                  marginTop: 22,
                  lineHeight: 1.75,
                  maxWidth: "52ch",
                }}
              >
                부모님이 가장 알고 싶은 것은 “그래서 이번 주에 뭘 시켜야
                하나요”입니다. 처방전은 그 질문에만 답합니다.
              </p>
            </div>

            <div className="rx rv rx__w">
              <div className="card__hd">
                <b>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2FE6B0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 7v10M7 12h10" />
                  </svg>
                  훈련 처방전
                </b>
                <span>PL-2601-0384 · WEEK 03/12</span>
              </div>

              <div className="rx__sec">
                <div className="rx__lb">처방 분야</div>
                {PRESCRIBED.map((item) => (
                  <div className="rx__r" key={item.field}>
                    <b>{item.field}</b>
                    <span>{item.cycle}</span>
                  </div>
                ))}
              </div>

              <div className="rx__sec">
                <div className="rx__lb">주간 훈련표</div>
                <div className="gr">
                  <div className="cel hd" />
                  {DAYS.map((day) => (
                    <div className="cel hd" key={day}>
                      {day}
                    </div>
                  ))}
                  {SCHEDULE.map((line) => (
                    <div key={line.row} style={{ display: "contents" }}>
                      <div className="cel rw">{line.row}</div>
                      {line.cells.map((cell, i) => (
                        <div className={`cel ${cell.kind}`} key={DAYS[i]}>
                          {cell.text}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rx__sec">
                <div className="rx__lb">이번 주 하지 않을 것</div>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "var(--soft)",
                    lineHeight: 1.7,
                  }}
                >
                  · 토요일 경기 후 개인 슈팅 훈련 (일요일 완전 휴식 유지)
                  <br />· 헤딩 반복 훈련 — 공중볼은 관찰요망 단계로 처방 대상
                  아님
                </p>
              </div>

              <div className="lg">
                {LEGEND.map((item) => (
                  <span key={item.label}>
                    <i style={{ background: item.color }} />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="linkrow">
            <Link href="/report" className="btn btn--ink">
              이 처방의 근거 결과지 보기
            </Link>
            <Link href="/coach" className="btn btn--out">
              전문 강사진 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
