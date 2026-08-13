/** coaches 테이블 한 행. 강사 한 명과 그가 맡는 커리큘럼. */
export type Coach = {
  id: number;
  sortOrder: number;

  name: string;
  photoUrl: string | null;

  curriculumCode: string;
  curriculumName: string;
  description: string;

  /** 배열 순서가 곧 단계 번호다. 단계 수는 강사마다 다르다. */
  steps: string[];
  details: string[];

  target: string;
  recommendedSessions: string;
  minDuration: string;
  sessionFormat: string;
  exitCriteria: string | null;
};
