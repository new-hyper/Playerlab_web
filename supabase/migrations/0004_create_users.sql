-- 회원 프로필. Auth 계정(로그인)과 1:1 이다.
-- 비밀번호는 Auth 에만 두고, 여기에는 마이페이지용 정보와 포인트만 둔다.

create table if not exists public.users (
  uid        uuid primary key references auth.users (id) on delete cascade,
  phone      text,
  name       text,
  points     integer not null default 0,
  created_at timestamptz not null default now(),

  constraint users_points_nonnegative check (points >= 0)
);

create index if not exists users_phone_idx on public.users (phone);

alter table public.users enable row level security;

-- 로그인한 사람은 자기 행만 읽는다. 포인트 변경은 대시보드에서만 한다.
drop policy if exists "자기 행만 읽기" on public.users;
create policy "자기 행만 읽기"
  on public.users
  for select
  to authenticated
  using (uid = auth.uid());

grant select on table public.users to authenticated;
revoke insert, update, delete on table public.users from authenticated, anon;

-- 가입이 끝나면 Auth 와 같은 uid 로 이 표에 한 줄을 만든다.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (uid, phone, points)
  values (new.id, new.phone, 0)
  on conflict (uid) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 이미 Auth 에 있는 테스트 계정에도 행을 만든다.
insert into public.users (uid, phone, points)
select id, phone, 0
from auth.users
on conflict (uid) do nothing;
