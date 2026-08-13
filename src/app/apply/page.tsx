import Link from "next/link";

import PageHead from "@/components/PageHead";

export const metadata = {
  title: "무료 선수진단 신청 — 고다지 풋볼 플레이어 랩",
};

// 문진은 구글폼으로 받는다. 폼을 만든 뒤 여기에 주소를 넣으면 버튼이 살아난다.
const GOOGLE_FORM_URL = "";

const SECTIONS = [
  {
    no: "01",
    title: "선수 기본 정보",
    desc: "차트를 만들기 위한 최소 정보입니다.",
    items: ["선수 이름", "연령대 (U8–U16+)", "주 포지션", "소속 (선택)"],
  },
  {
    no: "02",
    title: "현재 상황",
    desc: "정체의 원인이 실력이 아닌 경우가 많아 함께 여쭙니다.",
    items: [
      "가장 큰 고민",
      "주당 총 훈련 시간",
      "실제 출전 비중",
      "평균 수면 시간",
    ],
  },
  {
    no: "03",
    title: "결과 받으실 곳",
    desc: "요약 리포트를 보내 드릴 연락처입니다.",
    items: ["보호자 성함", "연락처", "이메일 (선택)", "부상 이력 등 (선택)"],
  },
];

export default function Apply() {
  return (
    <div className="page on">
      <PageHead
        crumb="FREE · 무료 선수진단"
        title={
          <>
            초기 문진으로
            <br />
            먼저 방향을 확인하세요
          </>
        }
        lead="약 2분이면 끝납니다. 작성하시면 요약 리포트를 보내 드리고, 정밀 검진 여부는 그걸 보신 뒤 결정하시면 됩니다. 비용은 없습니다."
      />

      <section
        className="sec sec--d"
        style={{ paddingTop: "clamp(30px,4vw,50px)" }}
      >
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">무엇을 여쭙는지</div>
            <h2 className="h2">세 가지를 묻습니다</h2>
            <p className="lede">
              답하기 어려운 질문은 없습니다. 모르는 항목은 비워두셔도 됩니다.
            </p>
          </div>

          <div className="g3" style={{ marginTop: 38 }}>
            {SECTIONS.map((section) => (
              <div className="sc rv" key={section.no}>
                <div className="sc__n">STEP {section.no}</div>
                <h4>{section.title}</h4>
                <p>{section.desc}</p>
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap wrap--n">
          <div className="rv" style={{ textAlign: "center" }}>
            <h2 className="h3">문진 작성하기</h2>
            <p
              style={{
                fontSize: "14.5px",
                color: "var(--soft)",
                marginTop: 12,
                lineHeight: 1.75,
              }}
            >
              구글 폼으로 연결됩니다. 제출하시면 영업일 기준 2일 안에 요약
              리포트를 보내 드립니다.
            </p>

            <div
              className="linkrow"
              style={{ justifyContent: "center", marginTop: 26 }}
            >
              {GOOGLE_FORM_URL ? (
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--mint btn--lg"
                >
                  무료 문진 작성하기
                </a>
              ) : (
                <span className="chip chip--o">
                  문진 폼 주소가 준비되는 대로 연결됩니다
                </span>
              )}
            </div>
          </div>

          <div className="note rv" style={{ marginTop: 26 }}>
            <em>PRIVACY</em>
            <span>
              미성년자 자료이므로 보호자 동의 후에만 수집합니다. 초기 문진
              응답은 요약 리포트 발송과 상담 목적으로만 사용하며, 정밀 검진으로
              이어지지 않을 경우 90일 뒤 파기합니다.
            </span>
          </div>

          <div className="linkrow" style={{ justifyContent: "center" }}>
            <Link href="/report" className="btn btn--ink">
              정밀 검진 결과지 예시 보기
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
