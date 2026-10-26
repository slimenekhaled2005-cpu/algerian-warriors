-- AW The Mind: initial schema and row-level security.
-- Apply in Supabase SQL Editor or via Supabase CLI migrations.
-- IMPORTANT: Never use the Supabase service-role key in student chat routes or admin dashboards.

create extension if not exists pgcrypto;

create type public.aw_role as enum ('student', 'admin');
create type public.aw_subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled', 'expired');
create type public.aw_message_role as enum ('user', 'assistant');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (char_length(display_name) <= 80),
  preferred_language text not null default 'en' check (preferred_language in ('en', 'ar', 'fr')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.aw_role not null default 'student',
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

create or replace function public.has_aw_role(_user_id uuid, _role public.aw_role)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = _user_id and ur.role = _role
  );
$$;

revoke all on function public.has_aw_role(uuid, public.aw_role) from public;
grant execute on function public.has_aw_role(uuid, public.aw_role) to authenticated;

create table public.tutors (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  subject text not null,
  description text not null default '',
  instructions text not null,
  model_id text not null,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_code text not null check (plan_code in ('starter', 'warrior', 'elite')),
  status public.aw_subscription_status not null default 'trialing',
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  payment_provider text,
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);
create index subscriptions_user_status_idx on public.subscriptions(user_id, status);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tutor_id uuid not null references public.tutors(id) on delete restrict,
  title text not null default 'New study session' check (char_length(title) <= 160),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index conversations_user_updated_idx on public.conversations(user_id, updated_at desc);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.aw_message_role not null,
  content text not null check (char_length(content) <= 50000),
  created_at timestamptz not null default now()
);
create index messages_conversation_created_idx on public.messages(conversation_id, created_at);

-- Metrics only: never put prompts, completions, filenames, or excerpts in this table.
create table public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tutor_id uuid references public.tutors(id) on delete set null,
  conversation_id uuid references public.conversations(id) on delete set null,
  input_tokens integer not null default 0 check (input_tokens >= 0),
  output_tokens integer not null default 0 check (output_tokens >= 0),
  estimated_cost_minor bigint not null default 0 check (estimated_cost_minor >= 0),
  created_at timestamptz not null default now()
);
create index usage_logs_created_idx on public.usage_logs(created_at desc);
create index usage_logs_user_created_idx on public.usage_logs(user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.tutors enable row level security;
alter table public.subscriptions enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.usage_logs enable row level security;

-- Students can access their own profile only.
create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Role assignment is trusted-admin-only; clients can only read their own role rows.
create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using (user_id = (select auth.uid()));

-- Students see active tutors; admins can manage tutor definitions.
create policy "tutors_read_active" on public.tutors
  for select to authenticated using (
    is_active = true or public.has_aw_role((select auth.uid()), 'admin')
  );
create policy "tutors_admin_insert" on public.tutors
  for insert to authenticated with check (public.has_aw_role((select auth.uid()), 'admin'));
create policy "tutors_admin_update" on public.tutors
  for update to authenticated using (public.has_aw_role((select auth.uid()), 'admin'))
  with check (public.has_aw_role((select auth.uid()), 'admin'));
create policy "tutors_admin_delete" on public.tutors
  for delete to authenticated using (public.has_aw_role((select auth.uid()), 'admin'));

-- Students see their own subscription; admins manage subscription records.
create policy "subscriptions_read_own_or_admin" on public.subscriptions
  for select to authenticated using (
    user_id = (select auth.uid()) or public.has_aw_role((select auth.uid()), 'admin')
  );
create policy "subscriptions_admin_insert" on public.subscriptions
  for insert to authenticated with check (public.has_aw_role((select auth.uid()), 'admin'));
create policy "subscriptions_admin_update" on public.subscriptions
  for update to authenticated using (public.has_aw_role((select auth.uid()), 'admin'))
  with check (public.has_aw_role((select auth.uid()), 'admin'));
create policy "subscriptions_admin_delete" on public.subscriptions
  for delete to authenticated using (public.has_aw_role((select auth.uid()), 'admin'));

-- Conversation metadata: owner-only. There is intentionally no admin policy.
create policy "conversations_owner_select" on public.conversations
  for select to authenticated using (user_id = (select auth.uid()));
create policy "conversations_owner_insert" on public.conversations
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "conversations_owner_update" on public.conversations
  for update to authenticated using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy "conversations_owner_delete" on public.conversations
  for delete to authenticated using (user_id = (select auth.uid()));

-- Message content: owner-only through the parent conversation. No admin policy.
create policy "messages_owner_select" on public.messages
  for select to authenticated using (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id and c.user_id = (select auth.uid())
    )
  );
create policy "messages_owner_insert" on public.messages
  for insert to authenticated with check (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id and c.user_id = (select auth.uid())
    )
  );
create policy "messages_owner_delete" on public.messages
  for delete to authenticated using (
    user_id = (select auth.uid())
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id and c.user_id = (select auth.uid())
    )
  );

-- Admins can inspect usage metrics only, never message content through the app policies.
create policy "usage_logs_read_own_or_admin" on public.usage_logs
  for select to authenticated using (
    user_id = (select auth.uid()) or public.has_aw_role((select auth.uid()), 'admin')
  );
create policy "usage_logs_insert_own" on public.usage_logs
  for insert to authenticated with check (user_id = (select auth.uid()));

-- Security note: service_role and database-owner credentials bypass RLS.
-- Never expose them to browsers or use them for chat/admin-dashboard reads of messages.
