import { redirect } from "next/navigation";

import SignupForm from "@/components/SignupForm";
import PageHead from "@/components/PageHead";
import { createServerSupabase } from "@/lib/supabase/server";

export const metadata = {
  title: "회원가입 — 고다지 풋볼 플레이어 랩",
};

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getClaims();
  if (data?.claims) redirect("/");

  return (
    <div className="page on">
      <PageHead
        crumb="ACCOUNT · 회원가입"
        title={
          <>
            아이디로
            <br />
            계정을 만듭니다
          </>
        }
        lead="아이디와 비밀번호를 정하시면 됩니다. 전화번호는 연락용이며 인증하지 않습니다. 가입이 끝나면 홈으로 이동합니다."
      />
      <section className="sec">
        <div className="wrap wrap--n">
          <SignupForm />
        </div>
      </section>
    </div>
  );
}
