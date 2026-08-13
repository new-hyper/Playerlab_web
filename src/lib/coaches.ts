import { supabase } from "./supabase";
import type { Coach } from "@/types/coach";

/** DB 컬럼은 snake_case, 화면에서 쓰는 모델은 camelCase 라서 여기서 한 번 변환한다. */
type CoachRow = {
  id: number;
  sort_order: number;
  name: string;
  photo_url: string | null;
  curriculum_code: string;
  curriculum_name: string;
  description: string;
  steps: string[];
  details: string[];
  target: string;
  recommended_sessions: string;
  min_duration: string;
  session_format: string;
  exit_criteria: string | null;
};

const COLUMNS = `
  id, sort_order, name, photo_url,
  curriculum_code, curriculum_name, description,
  steps, details,
  target, recommended_sessions, min_duration, session_format, exit_criteria
`;

function toCoach(row: CoachRow): Coach {
  return {
    id: row.id,
    sortOrder: row.sort_order,
    name: row.name,
    photoUrl: row.photo_url,
    curriculumCode: row.curriculum_code,
    curriculumName: row.curriculum_name,
    description: row.description,
    steps: row.steps,
    details: row.details,
    target: row.target,
    recommendedSessions: row.recommended_sessions,
    minDuration: row.min_duration,
    sessionFormat: row.session_format,
    exitCriteria: row.exit_criteria,
  };
}

export async function getCoaches(): Promise<Coach[]> {
  const { data, error } = await supabase
    .from("coaches")
    .select(COLUMNS)
    .order("sort_order");

  if (error) {
    throw new Error(`강사진을 불러오지 못했습니다: ${error.message}`);
  }

  return (data as CoachRow[]).map(toCoach);
}
