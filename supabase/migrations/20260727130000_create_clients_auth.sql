-- Portal de clientes: perfil y operaciones (Acceso de Clientes — auth real)
-- Correr en: Dashboard → SQL Editor → New query → Run
-- Proyecto: kegnvggnfyfdimkvoeqp
--
-- profiles: 1:1 con auth.users. NO hay trigger de auto-creación: los
-- usuarios de prueba se crean a mano en Auth y su fila de profiles se
-- carga a mano (Table Editor / SQL Editor) con el mismo `id`.
-- client_operations: reemplaza a MOCK_CLIENT_OPERATIONS, también se carga a mano.
--
-- Si ya corriste una versión anterior, este script es idempotente:
-- vuelve a aplicar grants + policies.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Permisos a nivel tabla (RLS solo no alcanza sin GRANT).
-- Solo `authenticated` puede leer, y solo su propia fila (ver policy).
-- Nadie puede insertar/actualizar/borrar desde el cliente: la fila se
-- carga a mano desde el Dashboard.
grant usage on schema public to authenticated;
revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;

drop policy if exists "own_profile_select" on public.profiles;
create policy "own_profile_select"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create table if not exists public.client_operations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  property_address text not null,
  operation_type text not null
    check (operation_type in ('compra', 'venta', 'alquiler')),
  status text not null
    check (status in ('activa', 'en-proceso', 'finalizada')),
  next_step text,
  updated_at timestamptz not null default now()
);

create index if not exists client_operations_user_id_idx on public.client_operations (user_id);

alter table public.client_operations enable row level security;

revoke all on table public.client_operations from anon, authenticated;
grant select on table public.client_operations to authenticated;

-- Cada cliente ve solo sus propias operaciones.
drop policy if exists "own_operations_select" on public.client_operations;
create policy "own_operations_select"
  on public.client_operations
  for select
  to authenticated
  using (auth.uid() = user_id);
