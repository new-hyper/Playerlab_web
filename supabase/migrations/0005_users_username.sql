-- 로그인 아이디. Auth 이메일 칸에는 login_id@id.playerlab.internal 을 넣는다.
-- 예전 초안의 username 칸이 있으면 login_id 로 이름을 바꾼다.

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'users'
      and column_name = 'username'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'users'
      and column_name = 'login_id'
  ) then
    alter table public.users rename column username to login_id;
  end if;
end $$;

alter table public.users
  add column if not exists login_id text;

drop index if exists users_username_unique;
create unique index if not exists users_login_id_unique
  on public.users (login_id)
  where login_id is not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (uid, login_id, phone, name, points)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'login_id', ''),
    nullif(new.raw_user_meta_data->>'phone', ''),
    nullif(new.raw_user_meta_data->>'name', ''),
    0
  )
  on conflict (uid) do nothing;
  return new;
end;
$$;

drop function if exists public.username_taken(text);

create or replace function public.login_id_taken(p_login_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where login_id = lower(trim(p_login_id))
  );
$$;

revoke all on function public.login_id_taken(text) from public;
grant execute on function public.login_id_taken(text) to anon, authenticated;
