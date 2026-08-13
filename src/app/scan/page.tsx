import Link from "next/link";

import PageHead from "@/components/PageHead";

export const metadata = {
  title: "선수진단 — 고다지 풋볼 플레이어 랩",
};

const AREAS = [
  {
    tag: "AREA 01 · 8항목",
    title: "피지컬",
    desc: "지금의 몸과 앞으로 자랄 몸을 함께 봅니다.",
    items: [
      "5·10·20m 스프린트",
      "505 방향전환",
      "CMJ 점프",
      "요요 지구력",
      "예측 성인신장",
      "성숙도 · 좌우 균형",
    ],
  },
  {
    tag: "AREA 02 · 10항목",
    title: "기술",
    desc: "혼자 할 때가 아니라 압박받을 때 남는 기술을 봅니다.",
    items: [
      "약발 사용률",
      "1v1 돌파 성공률",
      "볼 키핑 성공률",
      "퍼스트 터치 정확도",
      "압박 하 패스",
      "공중볼 · 킥 정확도",
    ],
  },
  {
    tag: "AREA 03 · 9항목",
    title: "경기 지능",
    desc: "공을 받기 전에 무엇을 보고 있는지가 실력의 절반입니다.",
    items: [
      "스캐닝 빈도",
      "받기 전 몸 방향",
      "전진 패스 비율",
      "의사결정 시간",
      "소유권 상실 위치",
      "오프더볼 이동",
    ],
  },
  {
    tag: "AREA 04 · 6항목",
    title: "심리",
    desc: "실수한 다음 3초에 성장 속도가 결정됩니다.",
    items: [
      "실수 후 회복 시간",
      "동기 유형",
      "경기 전 불안",
      "코치어빌리티",
      "자기효능감",
    ],
  },
  {
    tag: "AREA 05 · 6항목",
    title: "환경",
    desc: "정체의 원인이 실력이 아닌 경우가 많습니다.",
    items: [
      "주당 훈련 부하",
      "실제 출전 시간",
      "수면 시간",
      "부상 이력",
      "다종목 참여",
    ],
  },
];

export default function Scan() {
  return (
    <div className="page on">
      <PageHead
        crumb="02 · DIAGNOSIS"
        title={
          <>
            다섯 개 영역,
            <br />
            39개 항목을 검사합니다
          </>
        }
        lead="기술만 보면 아이의 절반만 보게 됩니다. 진단 시스템 GODZ SCAN은 현장 측정과 경기 영상 코딩을 합쳐, 항목마다 또래 표준범위와 비교하고 판정을 냅니다."
      />

      <section
        className="sec sec--d"
        style={{ paddingTop: "clamp(44px,5vw,72px)" }}
      >
        <div className="wrap">
          <div className="scan" style={{ marginTop: 0 }}>
            {AREAS.map((area) => (
              <div className="sc rv" key={area.tag}>
                <div className="sc__n">{area.tag}</div>
                <h4>{area.title}</h4>
                <p>{area.desc}</p>
                <ul>
                  {area.items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">판정 기준</div>
            <h2 className="h2">
              항목마다 세 가지 중
              <br />
              하나로 판정합니다
            </h2>
            <p className="lede">
              또래 표준범위는 같은 연령·성별의 검진 데이터에서 산출합니다.
              판정이 처방으로 이어지는 규칙도 미리 정해 두었습니다.
            </p>
          </div>
          <div className="jdg" style={{ marginTop: 36 }}>
            <div className="jg rv">
              <b className="jd jd--ok">정상</b>
              <p>
                표준범위 안에 있습니다. 지금처럼 유지하면 되고{" "}
                <b style={{ color: "var(--ink)" }}>별도 처방은 하지 않습니다.</b>
              </p>
            </div>
            <div className="jg rv">
              <b className="jd jd--wt">관찰요망</b>
              <p>
                표준범위 경계에 있습니다. 처방 없이 4주 뒤 재검진에서 흐름을
                확인합니다.
              </p>
            </div>
            <div className="jg rv">
              <b className="jd jd--bd">개선필요</b>
              <p>
                표준범위를 벗어났습니다. 해당 분야 전문 강사를 배정하고 훈련
                처방전에 반영합니다.
              </p>
            </div>
          </div>
          <div className="note rv">
            <em>NOTE</em>
            <span>
              <b>개선필요가 여러 개 나와도 한 번에 1~3개만 처방합니다.</b>{" "}
              경기에 미치는 영향이 큰 순서로 우선순위를 정하고, 나머지는 다음
              12주로 넘깁니다. 한꺼번에 다 고치려다 아무것도 안 되는 것을 가장
              경계합니다.
            </span>
          </div>
        </div>
      </section>

      <section className="sec sec--w">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">검사 방법</div>
            <h2 className="h2">두 가지 방식으로 모읍니다</h2>
          </div>
          <div className="g2" style={{ marginTop: 36 }}>
            <div className="box rv">
              <div className="box__t">METHOD 01</div>
              <h3>현장 측정 · 90분</h3>
              <p>
                전자 타이밍 게이트로 스프린트와 방향전환을 재고, 매트로 점프
                높이를 측정합니다. 기술 항목은 표준화된 코스에서 동일한 횟수로
                시행합니다. 4~6인 소그룹으로 진행해 아이가 긴장하지 않게 합니다.
              </p>
            </div>
            <div className="box rv">
              <div className="box__t">METHOD 02</div>
              <h3>경기 영상 코딩 · 2경기</h3>
              <p>
                풀타임 영상을 프레임 단위로 봅니다. 공을 받기 전 몇 번 주위를
                봤는지, 어느 발로 받았는지, 어디서 뺏겼는지를 전부 기록합니다.
                눈으로 보면 놓치는 것이 데이터에는 남습니다.
              </p>
            </div>
          </div>
          <div className="linkrow">
            <Link href="/report" className="btn btn--ink">
              검진 결과지 샘플 보기
            </Link>
            <Link href="/process" className="btn btn--out">
              진행 절차 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
