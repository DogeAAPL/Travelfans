create index site_content_updated_by_idx on public.site_content (updated_by);
comment on table private.admins is 'Correos autorizados como administradores. Sin políticas RLS a propósito: solo private.is_admin() (security definer) la lee.';
