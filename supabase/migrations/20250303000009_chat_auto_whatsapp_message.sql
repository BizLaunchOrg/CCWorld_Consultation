-- Auto-send a system message once per conversation (after the first user message): WhatsApp CTA so they can reach out if no one responds in time.
-- Only sent once so the next reply is from admin. Change the phone number in the URL if needed (E.164: 2348035244102 for +234 803 524 4102).

create or replace function public.chat_auto_whatsapp_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  -- Pre-encoded WhatsApp URL (apostrophe = %27 so "couldn't" in pre-filled text)
  whatsapp_url text := 'https://wa.me/2348035244102?text=Hi%2C%20I%20couldn%27t%20get%20a%20response%20on%20time%20from%20your%20site.';
  msg_body text;
  already_sent boolean;
begin
  if new.sender_role <> 'user' then
    return new;
  end if;

  -- Send only once per conversation: if we already sent a WhatsApp CTA in this conversation, skip
  select exists (
    select 1 from public.chat_messages
    where conversation_id = new.conversation_id
      and sender_role = 'system'
      and body like '%WhatsApp%'
    limit 1
  ) into already_sent;

  if already_sent then
    return new;
  end if;

  msg_body := 'If no one is responding to you on time, kindly contact us on WhatsApp: ' || whatsapp_url;

  insert into public.chat_messages (conversation_id, sender_role, body)
  values (new.conversation_id, 'system', msg_body);

  return new;
end;
$$;

drop trigger if exists chat_auto_whatsapp_trigger on public.chat_messages;
create trigger chat_auto_whatsapp_trigger
  after insert on public.chat_messages
  for each row
  execute function public.chat_auto_whatsapp_message();
