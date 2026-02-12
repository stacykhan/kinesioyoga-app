-- Extensions
create extension if not exists pgcrypto;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- Catalog
create table if not exists public.categories (
  id bigserial primary key,
  slug text not null unique,
  translations jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id bigserial primary key,
  slug text not null unique,
  duration_minutes integer not null check (duration_minutes > 0),
  level text not null check (level in ('beginner','intermediate','advanced')),
  category_id bigint not null references public.categories(id) on delete restrict,
  youtube_id text not null,
  is_premium boolean not null default false,
  translations jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.programs (
  id bigserial primary key,
  slug text not null unique,
  translations jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.program_days (
  id bigserial primary key,
  program_id bigint not null references public.programs(id) on delete cascade,
  day_number integer not null check (day_number between 1 and 365),
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  unique (program_id, day_number)
);

create table if not exists public.favorites (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.progress (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id bigint not null references public.lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.subscriptions (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  entitlement text not null,
  status text not null,
  expires_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, provider, entitlement)
);

-- helper functions
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists(
    select 1 from public.profiles p where p.id = uid and p.role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_lessons_updated_at on public.lessons;
create trigger trg_lessons_updated_at
before update on public.lessons
for each row execute procedure public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.lessons enable row level security;
alter table public.programs enable row level security;
alter table public.program_days enable row level security;
alter table public.favorites enable row level security;
alter table public.progress enable row level security;
alter table public.subscriptions enable row level security;

-- profiles policies
create policy "profiles own read" on public.profiles
for select using (auth.uid() = id or public.is_admin(auth.uid()));

create policy "profiles own update" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

-- categories
create policy "categories read all" on public.categories
for select using (true);

create policy "categories write admin" on public.categories
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- lessons
create policy "lessons anon free" on public.lessons
for select to anon using (is_premium = false);

create policy "lessons auth all" on public.lessons
for select to authenticated using (true);

create policy "lessons write admin" on public.lessons
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- programs/program_days
create policy "programs read all" on public.programs
for select using (true);

create policy "programs write admin" on public.programs
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy "program_days read all" on public.program_days
for select using (true);

create policy "program_days write admin" on public.program_days
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- favorites/progress
create policy "favorites own all" on public.favorites
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "progress own all" on public.progress
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- subscriptions
create policy "subscriptions own read" on public.subscriptions
for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

create policy "subscriptions write admin" on public.subscriptions
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
