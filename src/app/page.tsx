import Link from "next/link";

const SUMMARY_ROWS = [
  { name: "20m 스프린트", value: "3.42s", range: "3.30–3.55", judge: "정상", tone: "ok" },
  { name: "약발 사용률", value: "12%", range: "25–40", judge: "개선필요", tone: "bd" },
  { name: "볼 키핑 성공률", value: "41%", range: "55–70", judge: "개선필요", tone: "bd" },
  { name: "스캐닝 빈도", value: "4.8회", range: "3.5–5.0", judge: "정상", tone: "ok" },
  { name: "공중볼 경합", value: "38%", range: "45–60", judge: "관찰요망", tone: "wt" },
  { name: "실수 후 회복", value: "21s", range: "0–10", judge: "개선필요", tone: "bd" },
];

const SERVICES = [
  {
    href: "/about",
    tag: "01 · ABOUT",
    title: "플레이어랩 소개",
    desc: "왜 진단부터 하는지, 우리가 하지 않는 것은 무엇인지 밝힙니다.",
  },
  {
    href: "/scan",
    tag: "02 · DIAGNOSIS",
    title: "선수진단",
    desc: "5개 영역 39개 항목을 측정하고 또래 표준범위와 비교합니다.",
  },
  {
    href: "/process",
    tag: "03 · PROCESS",
    title: "진행 절차",
    desc: "접수부터 재검진까지 일곱 단계. 보완과 강점의 배분, 프로까지의 로드맵을 함께 설계합니다.",
  },
  {
    href: "/coach",
    tag: "04 · SPECIALIST",
    title: "전문 강사진",
    desc: "약발·헤딩·프리킥·필라테스·리듬·심리 등 열 개 분야 전담 강사가 있습니다.",
  },
  {
    href: "/rx",
    tag: "05 · PRESCRIPTION",
    title: "훈련 처방",
    desc: "이번 주에 뭘 할지, 뭘 안 할지 요일별로 적힌 한 장을 드립니다.",
  },
  {
    href: "/price",
    tag: "06 · PRICE",
    title: "검진 비용",
    desc: "검진, 12주 처방, 단과 레슨 세 가지 과정이 있습니다.",
  },
];

export default function Home() {
  return (
    <div className="page on">
      <header className="hero">
        <div className="wrap hero__in">
          <div>
            <div className="tagpill">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M12 6v12M6 12h12" />
              </svg>
              유소년 축구 진단 클리닉
            </div>
            <h1>
              선수도
              <br />
              <em>정확한 진단</em>이<br />
              필요합니다
            </h1>
            <p className="hero__p">
              축구도 병원처럼,{" "}
              <b>현재 상태를 정확히 알아야 성장할 수 있습니다.</b> 어디가
              부족한지 모른 채 시작하는 훈련은 노력이 아니라 시간을 쓰는
              일입니다.
            </p>
            <ul className="hero__pts">
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12.5l5.5 5.5L20 6.5" />
                </svg>
                <span>
                  선수의 <b>진단을 바탕으로</b> 컨설팅과 훈련 처방을 제공합니다
                </span>
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12.5l5.5 5.5L20 6.5" />
                </svg>
                <span>
                  강사 한 분이 모든 것을 가르치지 않습니다.{" "}
                  <b>선수의 데이터를 진단하여</b> 각각의 전문 강사진들이 선수를
                  케어합니다
                </span>
              </li>
            </ul>
            <div className="hero__cta">
              <Link href="/apply" className="btn btn--mint btn--lg">
                무료 선수진단 받기
              </Link>
              <Link href="/report" className="btn btn--ghost btn--lg">
                검진 결과지 보기
              </Link>
            </div>
            <p className="hero__note">
              고다지 풋볼 플레이어 랩은 레슨을 판매하는 회사가 아니라, 선수를
              진단하고 성장 계획을 처방하는 전문기관입니다. 진단 시스템{" "}
              <span
                style={{
                  color: "var(--mint)",
                  fontFamily: "var(--fm)",
                  fontSize: "11.5px",
                }}
              >
                GODZ SCAN
              </span>
              으로 측정합니다.
            </p>
          </div>

          <Link href="/report" className="card" style={{ display: "block" }}>
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
                선수 검진 결과지
              </b>
              <span>GODZ SCAN</span>
            </div>
            <div className="idrow">
              <div>
                <small>차트번호</small>
                <b>PL-2601-0384</b>
              </div>
              <div>
                <small>연령 / 포지션</small>
                <b>U13 · MF</b>
              </div>
              <div>
                <small>검진일</small>
                <b>2026.08.06</b>
              </div>
            </div>
            <table className="tbl">
              <thead>
                <tr>
                  <th>검사 항목</th>
                  <th>결과</th>
                  <th>또래 표준</th>
                  <th>판정</th>
                </tr>
              </thead>
              <tbody>
                {SUMMARY_ROWS.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td className="v" data-l="결과">
                      {row.value}
                    </td>
                    <td className="rg" data-l="표준">
                      {row.range}
                    </td>
                    <td>
                      <span className={`jd jd--${row.tone}`}>{row.judge}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card__ft">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A8C70"
                strokeWidth="2"
                style={{ flex: "none", marginTop: 2 }}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
              </svg>
              <span>
                <b>클릭하면 전체 결과지 39개 항목을 볼 수 있습니다</b>
              </span>
            </div>
          </Link>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">서비스 안내</div>
            <h2 className="h2">여섯 가지를 안내합니다</h2>
          </div>
          <div className="g3" style={{ marginTop: 40 }}>
            {SERVICES.map((item) => (
              <Link key={item.href} href={item.href} className="box rv">
                <div className="box__t">{item.tag}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Link>
            ))}
          </div>
          <p className="quote rv">
            병원에서 검사 없이 약을 주지 않듯이,
            <br />
            플레이어 랩은 진단 없이 레슨을 시작하지 않습니다.
            <small>
              무엇이 부족한지 알아야 무엇을 배울지 정할 수 있고, 무엇을 배울지
              정해야 누구에게 배울지 정할 수 있습니다.
            </small>
          </p>
        </div>
      </section>
    </div>
  );
}
