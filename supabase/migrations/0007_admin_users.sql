-- 어드민 페이지. JWT app_metadata.role = admin 인 사람만
-- 회원 전체를 읽고, 포인트만 고친다.
-- 포인트 컬럼 UPDATE 권한을 authenticated 에 주면
-- 일반 회원도 자기 행 수정 정책으로 포인트를 바꿀 수 있어서,
-- 함수(security definer)로만 바꾼다.

drop policy if exists "어드민은 회원 전체 읽기" on public.users;
create policy "어드민은 회원 전체 읽기"
  on public.users
  for select
  to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create or replace function public.admin_set_points(p_uid uuid, p_points integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if (auth.jwt() -> 'app_metadata' ->> 'role') is distinct from 'admin' then
    raise exception 'not allowed';
  end if;
  if p_points is null or p_points < 0 then
    raise exception 'invalid points';
  end if;
  update public.users
  set points = p_points
  where uid = p_uid;
  if not found then
    raise exception 'member not found';
  end if;
end;
$$;

revoke all on function public.admin_set_points(uuid, integer) from public, anon;
grant execute on function public.admin_set_points(uuid, integer) to authenticated;
