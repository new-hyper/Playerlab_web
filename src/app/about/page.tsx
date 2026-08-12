import ComingSoon from "@/components/ComingSoon";
import PageHead from "@/components/PageHead";

export const metadata = {
  title: "플레이어랩 소개 — 고다지 풋볼 플레이어 랩",
};

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
      <ComingSoon />
    </div>
  );
}
