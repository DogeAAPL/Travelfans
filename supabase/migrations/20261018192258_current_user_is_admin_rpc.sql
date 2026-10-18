-- RPC para que el frontend sepa si la sesión actual es de un administrador.
-- SECURITY INVOKER: solo delega en private.is_admin(), no expone la lista de correos.
create or replace function public.current_user_is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_admin();
$$;
revoke execute on function public.current_user_is_admin() from public, anon;
grant execute on function public.current_user_is_admin() to authenticated;
