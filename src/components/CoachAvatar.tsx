import type { Coach } from "@/types/coach";

/**
 * 사진이 있으면 사진을, 없으면 실루엣을 보여준다.
 * .av 는 크기와 모서리만 정하므로 svg 든 img 든 같은 자리에 들어간다.
 */
export default function CoachAvatar({ coach }: { coach: Coach }) {
  if (coach.photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="av"
        src={coach.photoUrl}
        alt={`${coach.name} 프로필 사진`}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <svg className="av" viewBox="0 0 120 120" aria-hidden="true">
      <rect width="120" height="120" rx="16" fill="#12244C" />
      <circle cx="60" cy="128" r="52" fill="rgba(47,230,176,.07)" />
      <path d="M18 120c0-27 20-38 42-38s42 11 42 38z" fill="#1E3A6B" />
      <ellipse cx="60" cy="50" rx="23" ry="25" fill="#2B4880" />
    </svg>
  );
}
