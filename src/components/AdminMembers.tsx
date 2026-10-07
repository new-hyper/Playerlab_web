"use client";

import { FormEvent, useState } from "react";

import type { AdminMember } from "@/lib/admin-member";
import { formatNational, formatPhoneMask } from "@/lib/phone";
import { createBrowserSupabase } from "@/lib/supabase/client";

type Props = {
  members: AdminMember[];
  loadError: string | null;
};

function displayPhone(phone: string): string {
  if (!phone) return "—";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("82")) return formatNational(phone);
  return formatPhoneMask(digits) || "—";
}

function displayDate(iso: string): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replaceAll("-", ".");
}

export default function AdminMembers({ members: initial, loadError }: Props) {
  const [members, setMembers] = useState(initial);
  const [drafts, setDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(initial.map((m) => [m.uid, String(m.points)])),
  );
  const [busyUid, setBusyUid] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [oks, setOks] = useState<Record<string, string | null>>({});

  async function save(event: FormEvent, uid: string) {
    event.preventDefault();
    const parsed = Number.parseInt(drafts[uid] ?? "", 10);
    if (!Number.isInteger(parsed) || parsed < 0) {
      setErrors((prev) => ({
        ...prev,
        [uid]: "포인트는 0 이상의 정수여야 합니다.",
      }));
      setOks((prev) => ({ ...prev, [uid]: null }));
      return;
    }

    setBusyUid(uid);
    setErrors((prev) => ({ ...prev, [uid]: null }));
    setOks((prev) => ({ ...prev, [uid]: null }));

    const supabase = createBrowserSupabase();
    const { error } = await supabase.rpc("admin_set_points", {
      p_uid: uid,
      p_points: parsed,
    });

    setBusyUid(null);

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [uid]: "포인트를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      }));
      return;
    }

    setMembers((prev) =>
      prev.map((m) => (m.uid === uid ? { ...m, points: parsed } : m)),
    );
    setDrafts((prev) => ({ ...prev, [uid]: String(parsed) }));
    setOks((prev) => ({ ...prev, [uid]: "저장했습니다." }));
  }

  if (loadError) {
    return (
      <div className="form">
        <p className="mem__msg mem__msg--bad">{loadError}</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="form">
        <p style={{ margin: 0, fontSize: 14.5, color: "var(--soft)" }}>
          가입한 회원이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="form">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <b style={{ fontSize: 16, letterSpacing: "-0.03em" }}>회원 목록</b>
        <span
          style={{
            fontFamily: "var(--fm)",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: "var(--soft)",
          }}
        >
          {members.length}명
        </span>
      </div>

      <ul className="memlist">
        {members.map((member) => {
          const changed = drafts[member.uid] !== String(member.points);
          return (
            <li className="mem" key={member.uid}>
              <div className="mem__top">
                <b className="mem__nm">{member.name || "이름 없음"}</b>
                <form
                  className="mem__pts"
                  onSubmit={(event) => void save(event, member.uid)}
                >
                  <label htmlFor={`pts-${member.uid}`}>포인트</label>
                  <input
                    id={`pts-${member.uid}`}
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    value={drafts[member.uid] ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      setDrafts((prev) => ({ ...prev, [member.uid]: value }));
                      setErrors((prev) => ({ ...prev, [member.uid]: null }));
                      setOks((prev) => ({ ...prev, [member.uid]: null }));
                    }}
                  />
                  <button
                    className="btn btn--mint"
                    type="submit"
                    disabled={busyUid === member.uid || !changed}
                  >
                    {busyUid === member.uid ? "저장 중" : "저장"}
                  </button>
                </form>
              </div>
              <div className="mem__meta">
                <div>
                  <small>아이디</small>
                  <b className="mono">{member.loginId || "—"}</b>
                </div>
                <div>
                  <small>전화번호</small>
                  <b>{displayPhone(member.phone)}</b>
                </div>
                <div>
                  <small>가입일</small>
                  <b className="mono">{displayDate(member.createdAt)}</b>
                </div>
              </div>
              {errors[member.uid] ? (
                <p className="mem__msg mem__msg--bad">{errors[member.uid]}</p>
              ) : null}
              {oks[member.uid] ? (
                <p className="mem__msg mem__msg--ok">{oks[member.uid]}</p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
