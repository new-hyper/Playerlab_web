import { redirect } from "next/navigation";

import MyPageForm from "@/components/MyPageForm";
import PageHead from "@/components/PageHead";
import { getMyProfile } from "@/lib/users";
import { createServerSupabase } from "@/lib/supabase/server";

export const metadata = {
  title: "마이페이지 — 고다지 풋볼 플레이어 랩",
};

export const dynamic = "force-dynamic";

export default async function MyPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  const profile = await getMyProfile();
  if (!profile) redirect("/login");

  return (
    <div className="page on">
      <PageHead
        crumb="ACCOUNT · 마이페이지"
        title={
          <>
            내 정보를
            <br />
            확인하고 고칩니다
          </>
        }
        lead="아이디와 포인트는 바꿀 수 없습니다. 이름과 전화번호는 연락용이며, 비밀번호는 로그인한 상태에서 바꿀 수 있습니다."
      />
      <section className="sec">
        <div className="wrap wrap--n">
          <MyPageForm
            loginId={profile.loginId}
            name={profile.name}
            phone={profile.phone}
            points={profile.points}
            missing={profile.missing}
          />
        </div>
      </section>
    </div>
  );
}
