"use client";

import { useState } from "react";
import CoachAvatar from "./CoachAvatar";
import CoachDetail from "./CoachDetail";
import type { Coach } from "@/types/coach";

/**
 * 카드를 누르면 아래에 상세가 펼쳐지고, 같은 카드를 다시 누르면 닫힌다.
 * 어떤 카드가 열려 있는지만 기억하면 되므로 상태는 id 하나다.
 */
export default function CoachList({ coaches }: { coaches: Coach[] }) {
  const [openId, setOpenId] = useState<number | null>(null);
  const openCoach = coaches.find((coach) => coach.id === openId);

  return (
    <>
      <div className="g4" style={{ marginTop: 0 }}>
        {coaches.map((coach) => (
          <button
            key={coach.id}
            type="button"
            className="dp rv"
            onClick={() => setOpenId(openId === coach.id ? null : coach.id)}
          >
            <div className="dp__hd">
              <CoachAvatar coach={coach} />
              <div className="dp__id">
                <span className="dp__en">{coach.curriculumCode}</span>
                <b>{coach.curriculumName}</b>
              </div>
            </div>
            <div className="dp__who">{coach.name}</div>
            <p>{coach.description}</p>
            <div className="dp__more">커리큘럼 보기 →</div>
          </button>
        ))}
      </div>

      {openCoach && <CoachDetail coach={openCoach} />}
    </>
  );
}
