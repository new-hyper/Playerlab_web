import { redirect } from "next/navigation";

import LoginForm from "@/components/LoginForm";
import PageHead from "@/components/PageHead";
import { createServerSupabase } from "@/lib/supabase/server";

export const metadata = {
  title: "로그인 — 고다지 풋볼 플레이어 랩",
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getClaims();
  if (data?.claims) redirect("/");

  return (
    <div className="page on">
      <PageHead
        crumb="ACCOUNT · 로그인"
        title={
          <>
            전화번호로
            <br />
            로그인합니다
          </>
        }
        lead="가입할 때 정하신 비밀번호를 입력하세요. 로그인하면 홈으로 이동합니다."
      />
      <section className="sec">
        <div className="wrap wrap--n">
          <LoginForm />
        </div>
      </section>
    </div>
  );
}
