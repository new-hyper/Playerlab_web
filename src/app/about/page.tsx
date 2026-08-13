import Link from "next/link";

import BrandMark from "@/components/BrandMark";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "플레이어랩 소개 — 고다지 풋볼 플레이어 랩",
};

const REALITIES = [
  {
    tag: "REALITY 01",
    title: "진단해 주는 사람이 없습니다",
    desc: "“열심히 하면 돼요”는 진단이 아닙니다. 무엇이 또래보다 얼마나 부족한지 숫자와 영상으로 설명해 주는 곳이 없습니다. 소속팀은 지도자 한 명이 스무 명이 넘는 선수를 보기 때문에, 개인별 진단까지 하기는 어려운 구조입니다.",
  },
  {
    tag: "REALITY 02",
    title: "한 명이 모든 걸 가르칩니다",
    desc: "약발도 헤딩도 프리킥도 멘탈도 트레이너 한 명이 다 가르칩니다. 종합병원에 내과 의사 한 명만 있는 셈입니다. 세부 기술마다 가르치는 방법이 완전히 다른데도 그렇습니다.",
  },
  {
    tag: "REALITY 03",
    title: "시간은 되돌아오지 않습니다",
    desc: "유소년 시기는 하루하루가 경쟁입니다. 방향이 틀린 6개월은 노력의 문제가 아니라, 다시 오지 않는 시간을 잃는 일입니다. 그 시간을 아끼는 유일한 방법은 시작 전에 정확히 아는 것입니다.",
  },
];

const COMPARISON = [
  ["현재 위치 파악", "모의고사 백분위", "GODZ SCAN 39개 항목 · 또래 표준범위"],
  ["약한 곳 진단", "과목별 오답 분석", "항목별 정상 · 관찰요망 · 개선필요 판정"],
  ["계획 수립", "3년 로드맵 · 주간 학습표", "12주 플랜 · 주간 훈련 처방전"],
  ["전문 지도", "과목별 전담 강사", "분야별 전문 강사 10개 과정"],
  ["주기적 점검", "월례고사 · 성적 추이", "4주 재검진 · 변화량 리포트"],
  ["장기 설계", "대학·학과 목표 역산", "진학 · 상위 무대까지 성장 로드맵"],
  ["소통", "학부모 상담", "부모 · 선수 · 소속팀 지도자 3자 공유"],
];

const PRINCIPLES = [
  {
    tag: "PRINCIPLE 01",
    title: "측정하지 않은 것은 말하지 않습니다",
    desc: "“좋아 보인다”, “아쉽다” 같은 인상 평가는 결과지에 쓰지 않습니다. 모든 문장 뒤에는 측정값이나 영상 근거가 붙습니다.",
  },
  {
    tag: "PRINCIPLE 02",
    title: "정상이면 수업을 붙이지 않습니다",
    desc: "판정이 정상인 항목에는 처방을 내지 않습니다. 개선필요 판정이 나온 1~3개만 처방하고, 정상으로 바뀌면 그 수업은 종료합니다.",
  },
  {
    tag: "PRINCIPLE 03",
    title: "등급과 순위를 매기지 않습니다",
    desc: "A급·B급, 몇 등 같은 표기는 어떤 문서에도 쓰지 않습니다. 유망주 선별이나 미래 예측은 저희가 할 수 있는 일이 아닙니다.",
  },
  {
    tag: "PRINCIPLE 04",
    title: "소속팀을 평가하지 않습니다",
    desc: "이적이나 팀 변경을 권하지 않습니다. 처방전은 소속팀 일정을 먼저 넣고 남는 시간에 짜며, 지도자에게 전달할 요청서를 함께 드립니다.",
  },
];

const BRANDS = [
  {
    tag: "PARENT BRAND",
    title: "고다지 (GODZ)",
    desc: "축구 콘텐츠와 지도자 교육을 해 온 상위 브랜드입니다. 플레이어 랩의 신뢰 기반이자, 다른 서비스가 붙을 때 공통으로 쓰이는 이름입니다.",
  },
  {
    tag: "SERVICE",
    title: "플레이어 랩 (PLAYER LAB)",
    desc: "선수를 접수하고, 진단하고, 전문 강사를 배정하고, 훈련 처방전을 발행하는 서비스입니다. 상담과 레슨, 재검진까지 이곳에서 진행합니다.",
  },
  {
    tag: "SYSTEM",
    title: "GODZ SCAN",
    desc: "현장 측정과 경기 영상 코딩을 표준화한 진단 시스템입니다. 39개 항목을 같은 방법으로 측정합니다. 클럽·학교 단체 검진에도 동일하게 적용됩니다.",
  },
];

export default function About() {
  return (
    <div className="page on">
      <PageHead
        crumb="01 · ABOUT US"
        title={
          <>
            부족한 부분은 느끼는데,
            <br />
            정확히 진단해 주는 곳이 없습니다
          </>
        }
        lead="아이가 잘 안 되고 있다는 건 부모님도 압니다. 문제는 무엇이 어떻게 부족한지 짚어 주는 사람이 없고, 그걸 정확히 고쳐 줄 선생님을 찾을 방법도 없다는 것입니다. 고다지 풋볼 플레이어 랩은 그 자리를 채우기 위해 만들어졌습니다."
      />

      <section className="sec">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">우리가 본 현실</div>
            <h2 className="h2">세 가지가 빠져 있었습니다</h2>
          </div>
          <div className="g3" style={{ marginTop: 38 }}>
            {REALITIES.map((item) => (
              <div className="box rv" key={item.tag}>
                <div className="box__t box__t--r">{item.tag}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="cmp rv">
            <div className="cmp__hd">
              <h3>
                공부에는 있는 것이,
                <br />
                축구에는 없었습니다
              </h3>
              <p>
                입시에는 성적을 분석하고 계획을 세워 주는 컨설팅이 있습니다.
                축구에도 같은 것이 있으면 좋겠다고 생각했고, 그 구조를 그대로
                옮겨왔습니다.
              </p>
            </div>
            <table className="cmp__t">
              <thead>
                <tr>
                  <th>단계</th>
                  <th>공부 · 입시 컨설팅</th>
                  <th>축구 · 플레이어 랩</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([step, study, football]) => (
                  <tr key={step}>
                    <td>{step}</td>
                    <td>{study}</td>
                    <td>{football}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec sec--d">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">운영 원칙</div>
            <h2 className="h2">네 가지를 지킵니다</h2>
            <p className="lede">
              진단 기관이 지켜야 할 것을 먼저 정해 두고 시작했습니다. 이 원칙은
              상담에서도, 결과지에서도 똑같이 적용됩니다.
            </p>
          </div>
          <div className="g2" style={{ marginTop: 38 }}>
            {PRINCIPLES.map((item) => (
              <div className="sc rv" key={item.tag}>
                <div className="sc__n">{item.tag}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--w">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">역할 구분</div>
            <h2 className="h2">브랜드 구조</h2>
            <p className="lede">
              상위 브랜드 · 서비스 · 진단 시스템을 나눠서 씁니다. 검사는 GODZ
              SCAN이 하고, 진단과 처방은 플레이어 랩이 합니다.
            </p>
          </div>

          <div
            className="rv"
            style={{
              marginTop: 34,
              background: "var(--deep)",
              borderRadius: 14,
              padding: "clamp(28px,4vw,44px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span className="lockup lockup--lg">
              <BrandMark large />
            </span>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-.03em",
                color: "rgba(234,241,251,.7)",
              }}
            >
              고다지 풋볼 플레이어 랩
            </div>
            <div
              style={{
                fontFamily: "var(--fm)",
                fontSize: "10.5px",
                letterSpacing: ".16em",
                color: "rgba(47,230,176,.6)",
                textAlign: "center",
                lineHeight: 1.9,
                borderTop: "1px solid rgba(47,230,176,.18)",
                paddingTop: 16,
                width: "100%",
                maxWidth: 420,
              }}
            >
              방패 = 팀의 엠블럼 · 곡선 = 성장 궤적
              <br />
              중간의 꺾임은 성장급등기, 끝의 점은 도달점
            </div>
          </div>

          <div className="g3" style={{ marginTop: 14 }}>
            {BRANDS.map((item) => (
              <div className="box rv" key={item.tag}>
                <div className="box__t">{item.tag}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="note rv">
            <em>NOTE</em>
            <span>
              <b>고다지 풋볼 플레이어 랩은 의료기관이 아닙니다.</b> 병원의 진료
              과정을 참고해 절차를 설계했을 뿐, 의학적 진단이나 치료를 제공하지
              않습니다. 부상 진단과 치료가 필요한 경우 정형외과·재활의학과
              진료를 먼저 권합니다.
            </span>
          </div>
          <div className="note rv" style={{ marginTop: 12 }}>
            <em>표기</em>
            <span>
              <b>정식 명칭</b>은 고다지 풋볼 플레이어 랩 / GODZ FOOTBALL PLAYER
              LAB, <b>약칭</b>은 플레이어 랩입니다. 본문에서는 첫 언급만 정식
              명칭을 쓰고 이후에는 약칭을 씁니다.
            </span>
          </div>

          <div className="linkrow">
            <Link href="/scan" className="btn btn--ink">
              선수진단 항목 보기
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
