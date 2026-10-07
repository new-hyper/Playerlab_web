import type { AdminMember } from "@/lib/admin-member";
import { loginIdFromAuthEmail } from "@/lib/auth-login-id";
import { createServerSupabase } from "@/lib/supabase/server";

export type MyProfile = {
  loginId: string;
  name: string;
  phone: string;
  points: number;
  missing: boolean;
};

export async function getMyProfile(): Promise<MyProfile | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("login_id, name, phone, points")
    .eq("uid", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(`회원 정보를 불러오지 못했습니다: ${error.message}`);
  }

  const loginId =
    (data?.login_id as string | null) || loginIdFromAuthEmail(user.email);

  return {
    loginId,
    name: (data?.name as string | null) ?? "",
    phone: (data?.phone as string | null) ?? "",
    points: typeof data?.points === "number" ? data.points : 0,
    missing: !data,
  };
}

export async function getAdminMembers(): Promise<AdminMember[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("users")
    .select("uid, login_id, name, phone, points, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`회원 목록을 불러오지 못했습니다: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    uid: row.uid as string,
    loginId: (row.login_id as string | null) ?? "",
    name: (row.name as string | null) ?? "",
    phone: (row.phone as string | null) ?? "",
    points: typeof row.points === "number" ? row.points : 0,
    createdAt: (row.created_at as string | null) ?? "",
  }));
}
