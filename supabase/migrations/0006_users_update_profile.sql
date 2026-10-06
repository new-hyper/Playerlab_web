-- 마이페이지. 로그인한 사람은 자기 이름·전화만 고친다.
-- 포인트와 아이디는 컬럼 권한을 주지 않아서 앱에서 못 바꾼다.

drop policy if exists "자기 이름·전화만 수정" on public.users;
create policy "자기 이름·전화만 수정"
  on public.users
  for update
  to authenticated
  using (uid = auth.uid())
  with check (uid = auth.uid());

grant update (name, phone) on table public.users to authenticated;
