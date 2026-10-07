import { redirect } from "next/navigation";

import AdminMembers from "@/components/AdminMembers";
import PageHead from "@/components/PageHead";
import type { AdminMember } from "@/lib/admin-member";
import { isAdminFromClaims } from "@/lib/auth-admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { getAdminMembers } from "@/lib/users";

export const metadata = {
  title: "어드민 — 고다지 풋볼 플레이어 랩",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");
  if (!isAdminFromClaims(data.claims)) redirect("/");

  let members: AdminMember[] = [];
  let loadError: string | null = null;
  try {
    members = await getAdminMembers();
  } catch {
    loadError = "회원 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
  }

  return (
    <div className="page on">
      <PageHead
        crumb="ADMIN · 회원"
        title={
          <>
            회원 포인트만
            <br />
            여기서 고칩니다
          </>
        }
        lead="아이디·이름·전화는 볼 수만 있습니다. 포인트만 바꿀 수 있고, 일반 회원은 이 페이지에 들어올 수 없습니다."
      />
      <section className="sec">
        <div className="wrap wrap--n">
          <AdminMembers members={members} loadError={loadError} />
        </div>
      </section>
    </div>
  );
}
