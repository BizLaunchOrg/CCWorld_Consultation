-- Live chat: conversations (one per user/session) and messages. Realtime for both client and admin.

-- Conversations: one per site visitor (user_id when logged in, or anonymous)
create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_chat_conversations_user_id on public.chat_conversations(user_id);
create index if not exists idx_chat_conversations_updated_at on public.chat_conversations(updated_at desc);

create trigger chat_conversations_updated_at
  before update on public.chat_conversations
  for each row execute function public.set_updated_at();

-- Messages: one row per message; sender_role 'user' | 'admin' | 'system'
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations(id) on delete cascade,
  sender_role text not null check (sender_role in ('user', 'admin', 'system')),
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists idx_chat_messages_conversation_id on public.chat_messages(conversation_id);
create index if not exists idx_chat_messages_created_at on public.chat_messages(created_at);

-- Keep conversation.updated_at in sync when a message is added
create or replace function public.chat_conversation_updated_on_message()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  update public.chat_conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$;
create trigger chat_messages_set_conversation_updated
  after insert on public.chat_messages
  for each row execute function public.chat_conversation_updated_on_message();

-- RLS
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;

-- User: can select/insert their own conversations (user_id = auth.uid() or created anonymously and we allow insert)
create policy "chat_conversations_select_own" on public.chat_conversations
  for select using (
    user_id = auth.uid() or user_id is null
  );
create policy "chat_conversations_insert_own" on public.chat_conversations
  for insert with check (user_id = auth.uid() or user_id is null);
-- Admin: can select all conversations
create policy "chat_conversations_select_admin" on public.chat_conversations
  for select using (public.get_my_role() = 'admin');

-- Messages: user can select messages for conversations they own
create policy "chat_messages_select_own" on public.chat_messages
  for select using (
    exists (
      select 1 from public.chat_conversations c
      where c.id = conversation_id
      and (c.user_id = auth.uid() or c.user_id is null)
    )
  );
create policy "chat_messages_insert_user" on public.chat_messages
  for insert with check (
    sender_role = 'user'
    and exists (
      select 1 from public.chat_conversations c
      where c.id = conversation_id
      and (c.user_id = auth.uid() or c.user_id is null)
    )
  );
-- Admin: can select all messages and insert admin messages
create policy "chat_messages_select_admin" on public.chat_messages
  for select using (public.get_my_role() = 'admin');
create policy "chat_messages_insert_admin" on public.chat_messages
  for insert with check (public.get_my_role() = 'admin' and sender_role = 'admin');
create policy "chat_messages_update_admin" on public.chat_messages
  for update using (public.get_my_role() = 'admin');

-- Grants
grant select, insert on public.chat_conversations to authenticated, anon;
grant select, insert, update on public.chat_messages to authenticated, anon;
grant all on public.chat_conversations to service_role;
grant all on public.chat_messages to service_role;

-- Realtime: enable for chat_messages so client and admin get new messages without refresh
alter publication supabase_realtime add table public.chat_messages;
