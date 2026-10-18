-- Esquema privado (no expuesto por la Data API) para datos de autorización.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table private.admins (
  email text primary key check (email = lower(email))
);
alter table private.admins enable row level security;
revoke all on private.admins from public, anon, authenticated;

insert into private.admins (email) values ('angelwtf36@gmail.com');

-- true si el usuario autenticado está en la lista de administradores.
-- SECURITY DEFINER para poder leer private.admins sin exponerla; vive en un esquema no expuesto,
-- tiene search_path fijo y solo depende del email verificado por Supabase Auth en el JWT.
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from private.admins a
    where a.email = lower(coalesce((select auth.jwt()) ->> 'email', ''))
  );
$$;
revoke execute on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

-- Contenido del sitio: una sola fila (id = 1) con todo el contenido en JSON.
create table public.site_content (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null check (jsonb_typeof(data) = 'object'),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null default auth.uid()
);
alter table public.site_content enable row level security;

revoke all on public.site_content from public, anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;

create policy "Cualquiera puede leer el contenido"
  on public.site_content for select
  to anon, authenticated
  using (true);

create policy "Solo admins insertan contenido"
  on public.site_content for insert
  to authenticated
  with check ((select private.is_admin()));

create policy "Solo admins actualizan contenido"
  on public.site_content for update
  to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create or replace function private.touch_site_content()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

create trigger site_content_touch
  before insert or update on public.site_content
  for each row execute function private.touch_site_content();

-- Bucket público para imágenes del sitio (lectura pública por URL, escritura solo admins).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 2097152, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

create policy "Admins ven imagenes del sitio"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'site-images' and (select private.is_admin()));

create policy "Admins suben imagenes del sitio"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images' and (select private.is_admin()));

create policy "Admins borran imagenes del sitio"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images' and (select private.is_admin()));
