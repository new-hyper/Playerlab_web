import Link from "next/link";

import BrandMark from "@/components/BrandMark";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "검진 결과지 예시 — 고다지 풋볼 플레이어 랩",
};

/** 판정 세 가지. 점 색과 배지 문구가 함께 정해진다. */
const JUDGE = {
  ok: { label: "정상", badge: "jd jd--ok", dot: "pb__dot" },
  wt: { label: "관찰요망", badge: "jd jd--wt", dot: "pb__dot w" },
  bd: { label: "개선필요", badge: "jd jd--bd", dot: "pb__dot b" },
} as const;

type Tone = keyof typeof JUDGE;

type Row = {
  name: string;
  value: string;
  standard: string;
  /** 또래 분포 막대 위 점의 가로 위치 */
  dot: string;
  tone: Tone;
};

const PATIENT = [
  { label: "선수명", value: "김○윤" },
  { label: "연령대", value: "U13 (중1)" },
  { label: "소속", value: "고다지FC U13" },
  { label: "포지션", value: "중앙 미드필더" },
  { label: "주발", value: "오른발" },
  { label: "신장 / 체중", value: "158.2cm / 45.6kg" },
];

const AREAS: { title: string; summary: string; rows: Row[] }[] = [
  {
    title: "AREA 01 · 피지컬",
    summary: "8개 항목 · 정상 7 / 관찰 1",
    rows: [
      { name: "5m 스프린트", value: "1.09s", standard: "1.02–1.15", dot: "55%", tone: "ok" },
      { name: "10m 스프린트", value: "1.88s", standard: "1.80–1.96", dot: "58%", tone: "ok" },
      { name: "20m 스프린트", value: "3.42s", standard: "3.30–3.55", dot: "62%", tone: "ok" },
      { name: "505 방향전환", value: "2.61s", standard: "2.45–2.68", dot: "29%", tone: "wt" },
      { name: "CMJ 수직 점프", value: "31.4cm", standard: "28–36", dot: "54%", tone: "ok" },
      { name: "요요 지구력 (IR1)", value: "720m", standard: "640–900", dot: "48%", tone: "ok" },
      { name: "예측 성인신장", value: "176.8cm", standard: "참고값", dot: "66%", tone: "ok" },
      { name: "좌우 근력 균형차", value: "8.6%", standard: "0–10", dot: "41%", tone: "ok" },
    ],
  },
  {
    title: "AREA 02 · 기술",
    summary: "10개 항목 · 정상 5 / 관찰 2 / 개선 3",
    rows: [
      { name: "약발 사용률", value: "12%", standard: "25–40", dot: "8%", tone: "bd" },
      { name: "약발 패스 정확도", value: "51%", standard: "65–80", dot: "14%", tone: "bd" },
      { name: "볼 키핑 성공률", value: "41%", standard: "55–70", dot: "18%", tone: "bd" },
      { name: "1v1 돌파 성공률", value: "44%", standard: "35–50", dot: "62%", tone: "ok" },
      { name: "퍼스트 터치 정확도", value: "76%", standard: "70–85", dot: "55%", tone: "ok" },
      { name: "압박 하 패스 성공률", value: "68%", standard: "65–80", dot: "38%", tone: "ok" },
      { name: "롱킥 비거리", value: "38m", standard: "34–44", dot: "50%", tone: "ok" },
      { name: "슈팅 정확도", value: "46%", standard: "40–58", dot: "47%", tone: "ok" },
      { name: "공중볼 경합 승률", value: "38%", standard: "45–60", dot: "28%", tone: "wt" },
      { name: "스로인 거리", value: "16.2m", standard: "15–22", dot: "30%", tone: "wt" },
    ],
  },
  {
    title: "AREA 03 · 경기 지능",
    summary: "9개 항목 · 정상 8 / 관찰 1",
    rows: [
      { name: "스캐닝 빈도 (분당)", value: "4.8회", standard: "3.5–5.0", dot: "88%", tone: "ok" },
      { name: "받기 전 몸 방향 확보", value: "71%", standard: "55–70", dot: "84%", tone: "ok" },
      { name: "전진 패스 비율", value: "34%", standard: "25–38", dot: "78%", tone: "ok" },
      { name: "의사결정 시간", value: "0.72s", standard: "0.70–1.10", dot: "86%", tone: "ok" },
      { name: "패스 선택 정확도", value: "81%", standard: "70–85", dot: "76%", tone: "ok" },
      { name: "위험지역 소유권 상실", value: "18%", standard: "10–25", dot: "58%", tone: "ok" },
      { name: "오프더볼 이동거리", value: "6.9km", standard: "6.0–8.0", dot: "62%", tone: "ok" },
      { name: "수비 전환 반응", value: "3.4s", standard: "2.5–4.0", dot: "55%", tone: "ok" },
      { name: "위치 이탈 빈도", value: "12회", standard: "5–12", dot: "31%", tone: "wt" },
    ],
  },
  {
    title: "AREA 04 · 심리",
    summary: "6개 항목 · 정상 2 / 관찰 2 / 개선 2",
    rows: [
      { name: "실수 후 회복 시간", value: "21s", standard: "0–10", dot: "12%", tone: "bd" },
      { name: "경기 전 불안 척도", value: "68점", standard: "0–50", dot: "19%", tone: "bd" },
      { name: "동기 유형", value: "자율형", standard: "참고값", dot: "72%", tone: "ok" },
      { name: "코치어빌리티", value: "82점", standard: "60–100", dot: "70%", tone: "ok" },
      { name: "자기효능감", value: "54점", standard: "60–100", dot: "32%", tone: "wt" },
      { name: "압박 상황 수행 유지", value: "61%", standard: "65–85", dot: "34%", tone: "wt" },
    ],
  },
  {
    title: "AREA 05 · 환경",
    summary: "6개 항목 · 정상 2 / 관찰 2 / 개선 2",
    rows: [
      { name: "주당 훈련 부하", value: "14.5h", standard: "8–14", dot: "80%", tone: "wt" },
      { name: "실제 출전 시간 비율", value: "62%", standard: "50–100", dot: "52%", tone: "ok" },
      { name: "평균 수면 시간", value: "6.4h", standard: "8–10", dot: "13%", tone: "bd" },
      { name: "주당 완전 휴식일", value: "0.5일", standard: "1–2", dot: "16%", tone: "bd" },
      { name: "최근 12개월 부상", value: "0건", standard: "0–1", dot: "74%", tone: "ok" },
      { name: "다종목 참여", value: "없음", standard: "권장 1종", dot: "27%", tone: "wt" },
    ],
  },
];

function ReportRow({ row }: { row: Row }) {
  const judge = JUDGE[row.tone];
  return (
    <tr>
      <td className="nm">{row.name}</td>
      <td className="vl" data-l="결과">
        {row.value}
      </td>
      <td className="st" data-l="또래 표준">
        {row.standard}
      </td>
      <td className="pbc" data-l="또래 분포">
        <span className="pb">
          <i className="pb__band" style={{ left: "25%", width: "50%" }} />
          <i className={judge.dot} style={{ left: row.dot }} />
        </span>
      </td>
      <td className="jc">
        <span className={judge.badge}>{judge.label}</span>
      </td>
    </tr>
  );
}

export default function Report() {
  return (
    <div className="page on">
      <PageHead
        crumb="SAMPLE · 검진 결과지"
        title="선수 검진 결과지"
        lead="실제로 발행되는 결과지의 예시입니다. 39개 항목 전체가 영역별로 묶여 있고, 항목마다 결과값·또래 표준범위·백분위·판정이 함께 표시됩니다. 개인정보는 가상으로 작성했습니다."
      />

      <section
        className="sec sec--w"
        style={{ paddingTop: "clamp(34px,4vw,54px)" }}
      >
        <div className="wrap">
          <div className="rep rv">
            <div className="rep__hd">
              <div className="rep__brand">
                <BrandMark />
                <div>
                  <small>GODZ FOOTBALL PLAYER LAB · GODZ SCAN</small>
                  <h2>선수 검진 결과지</h2>
                </div>
              </div>
              <div className="meta">
                차트번호 PL-2601-0384
                <br />
                검진일 2026.08.06 · 발행 2026.08.13
                <br />
                담당 진단관 · 정○○
              </div>
            </div>

            <div className="rep__pt">
              {PATIENT.map((field) => (
                <div key={field.label}>
                  <small>{field.label}</small>
                  <b>{field.value}</b>
                </div>
              ))}
            </div>

            <div className="rep__sum">
              <div className="rep__op">
                <h4>종합 소견</h4>
                <p>
                  경기를 읽는 능력이 또래 상위권입니다. 공을 받기 전 주위를 보는
                  횟수와 몸의 방향 확보가 모두 표준범위 상단에 있어, 판단으로
                  경기를 푸는 유형입니다.
                  <br />
                  <br />
                  다만 <strong>왼발과 볼 키핑</strong>이 그 강점을 막고
                  있습니다. 좋은 자리를 잡아도 오른발로 돌아서느라 한 박자를
                  잃고, 등지고 받는 상황에서 소유권을 놓칩니다. 이 두 가지만
                  표준범위에 들어와도 지금의 판단력이 경기에서 그대로 나올 수
                  있습니다.
                  <br />
                  <br />
                  심리 영역에서 <strong>실수 직후 회복 시간이 21초</strong>로
                  길게 나옵니다. 한 번 실수하면 다음 두세 번의 관여가 사라지는
                  패턴이 영상에서 반복 확인되어 상담을 함께 처방합니다.
                  <br />
                  <br />
                  환경 항목의 수면 6.4시간과 주당 완전 휴식 0.5일은 개선필요
                  판정이지만 수업으로 처방하지 않습니다. 가정에서 조정해 주셔야
                  하는 부분이며, 4주 뒤 재검진에서 다시 확인합니다.
                </p>
              </div>

              <div className="rep__cnt">
                <h4
                  style={{
                    fontFamily: "var(--fm)",
                    fontSize: "9.5px",
                    letterSpacing: ".13em",
                    color: "var(--soft)",
                    marginBottom: 12,
                  }}
                >
                  판정 요약 · 39개 항목
                </h4>
                <div className="segbar">
                  <i
                    style={{
                      width: "61.5%",
                      background: "linear-gradient(90deg,#0FA985,#0A8C70)",
                    }}
                  />
                  <i
                    style={{
                      width: "20.5%",
                      background: "linear-gradient(90deg,#EFA243,#E8871E)",
                    }}
                  />
                  <i
                    style={{
                      width: "18%",
                      background: "linear-gradient(90deg,#EC6650,#E2452F)",
                    }}
                  />
                </div>
                <div className="cnt">
                  <span className="jd jd--ok">정상</span>
                  <b style={{ color: "var(--ok)" }}>24</b>
                </div>
                <div className="cnt">
                  <span className="jd jd--wt">관찰요망</span>
                  <b style={{ color: "var(--warn)" }}>8</b>
                </div>
                <div className="cnt">
                  <span className="jd jd--bd">개선필요</span>
                  <b style={{ color: "var(--bad)" }}>7</b>
                </div>
                <div
                  style={{
                    borderTop: "1px solid var(--line)",
                    paddingTop: 12,
                    marginTop: 5,
                    fontSize: "12.3px",
                    color: "var(--soft)",
                    lineHeight: 1.65,
                  }}
                >
                  개선필요 7개 중 경기 영향도가 큰{" "}
                  <b style={{ color: "var(--ink)" }}>
                    3개만 이번 12주에 처방
                  </b>
                  합니다. 나머지는 다음 주기로 넘깁니다.
                </div>
              </div>
            </div>

            {AREAS.map((area, areaIndex) => (
              <div className="rep__grp" key={area.title}>
                <div className="rep__gh">
                  <span style={{ color: "inherit" }}>{area.title}</span>
                  <span>{area.summary}</span>
                </div>
                <table className="rtbl">
                  {/* 표 머리글은 첫 영역에만 둔다. 아래 표들은 같은 열 구성이 이어진다. */}
                  {areaIndex === 0 && (
                    <thead>
                      <tr>
                        <th>검사 항목</th>
                        <th style={{ textAlign: "center" }}>결과</th>
                        <th style={{ textAlign: "center" }}>또래 표준</th>
                        <th className="pbc">또래 분포</th>
                        <th style={{ textAlign: "center" }}>판정</th>
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {area.rows.map((row) => (
                      <ReportRow row={row} key={row.name} />
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="rep__two">
              <div>
                <h4 style={{ color: "var(--ok)" }}>강점 · 유지할 것</h4>
                <ol>
                  <li>
                    <i style={{ background: "var(--ok)" }}>01</i>
                    <span>
                      <b>스캐닝과 사전 몸 방향</b> — 또래 상위 15%. 받기 전에
                      이미 다음 선택을 정해 놓는 유형입니다.
                    </span>
                  </li>
                  <li>
                    <i style={{ background: "var(--ok)" }}>02</i>
                    <span>
                      <b>의사결정 속도 0.72초</b> — 표준범위 하한에 근접.
                      망설임이 거의 없습니다.
                    </span>
                  </li>
                  <li>
                    <i style={{ background: "var(--ok)" }}>03</i>
                    <span>
                      <b>코치어빌리티 82점</b> — 피드백을 받아 바로 적용하는
                      능력이 높아 처방 효과가 빠를 것으로 봅니다.
                    </span>
                  </li>
                </ol>
              </div>
              <div>
                <h4 style={{ color: "var(--bad)" }}>이번 12주 처방 대상</h4>
                <ol>
                  <li>
                    <i style={{ background: "var(--bad)" }}>01</i>
                    <span>
                      <b>약발</b> (사용률 12% · 패스 정확도 51%) → 약발 트레이닝
                      주 1회
                    </span>
                  </li>
                  <li>
                    <i style={{ background: "var(--bad)" }}>02</i>
                    <span>
                      <b>볼 키핑</b> (성공률 41%) → 볼 키핑 주 1회
                    </span>
                  </li>
                  <li>
                    <i style={{ background: "var(--bad)" }}>03</i>
                    <span>
                      <b>실수 후 회복 21초 · 경기 전 불안 68점</b> → 심리 상담
                      격주
                    </span>
                  </li>
                  <li>
                    <i style={{ background: "var(--warn)" }}>—</i>
                    <span>
                      <b>수면 6.4시간 · 완전 휴식 0.5일</b>은 수업 처방이 아닌{" "}
                      <b>가정 조정 권고</b>로 분류합니다.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="rep__ft">
              <b>다음 재검진 2026.09.03</b> · 동일 항목을 동일 방법으로 재측정해
              변화량을 산출합니다. 판정이 정상으로 바뀐 항목의 수업은 종료하고
              다음 우선순위로 넘어갑니다.
              <br />본 결과지는 현재 상태 진단 문서이며 선수 선발·등급 평가·미래
              예측 용도로 사용하지 않습니다. 의학적 진단이 아니며, 통증이나
              부상이 있는 경우 의료기관 진료를 먼저 받으시기 바랍니다.
            </div>
          </div>

          <div className="linkrow">
            <Link href="/rx" className="btn btn--ink">
              이 결과로 나온 훈련 처방전 보기
            </Link>
            <Link href="/apply" className="btn btn--out">
              우리 아이도 검진 받기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
