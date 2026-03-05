-- Auto-send a system message after each user message: WhatsApp CTA so they can reach out if no one responds in time.
-- WhatsApp link opens with pre-filled text. Change the phone number in the URL if needed (E.164: 2348064477558 for +234 806 447 7558).

create or replace function public.chat_auto_whatsapp_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  -- Pre-encoded WhatsApp URL (apostrophe = %27 so "couldn't" in pre-filled text)
  whatsapp_url text := 'https://wa.me/2348064477558?text=Hi%2C%20I%20couldn%27t%20get%20a%20response%20on%20time%20from%20your%20site.';
  msg_body text;
begin
  if new.sender_role <> 'user' then
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
