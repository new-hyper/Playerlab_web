import CoachAvatar from "./CoachAvatar";
import type { Coach } from "@/types/coach";

/** 운영 기준은 컬럼이 정해져 있어서, 화면에 뿌리기 좋게 여기서 짝지어 준다. */
function criteriaOf(coach: Coach) {
  const rows: { label: string; value: string }[] = [
    { label: "권장 회차", value: coach.recommendedSessions },
    { label: "최소 기간", value: coach.minDuration },
    { label: "진행 형태", value: coach.sessionFormat },
  ];
  if (coach.exitCriteria) {
    rows.push({ label: "종료 기준", value: coach.exitCriteria });
  }
  return rows;
}

export default function CoachDetail({ coach }: { coach: Coach }) {
  return (
    <div className="dtl">
      <div className="dtl__hd">
        <h3>{coach.curriculumName}</h3>
        <span>{coach.curriculumCode}</span>
      </div>

      <div className="dtl__bd">
        <div>
          <div className="dtl__who">
            <CoachAvatar coach={coach} />
            <div>
              <b>{coach.name}</b>
            </div>
          </div>

          <h5>커리큘럼 {coach.steps.length}단계</h5>
          <div className="stp">
            {coach.steps.map((step, i) => (
              <div key={step}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <h5 style={{ marginTop: 18 }}>배정 대상</h5>
          <p
            style={{
              fontSize: "13.4px",
              color: "var(--soft)",
              lineHeight: 1.65,
            }}
          >
            {coach.target}
          </p>
        </div>

        <div>
          <h5>운영 기준</h5>
          <div className="kv">
            {criteriaOf(coach).map((row) => (
              <div key={row.label}>
                <span>{row.label}</span>
                <b>{row.value}</b>
              </div>
            ))}
          </div>

          {coach.details.length > 0 && (
            <>
              <h5 style={{ marginTop: 18 }}>세부 항목</h5>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
              >
                {coach.details.map((detail) => (
                  <span className="chip" key={detail}>
                    {detail}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
