-- Portal de clientes: perfil y operaciones (Acceso de Clientes — auth real)
-- Correr en: Dashboard → SQL Editor → New query → Run
-- Proyecto: kegnvggnfyfdimkvoeqp
--
-- profiles: 1:1 con auth.users. Se crea sola gracias al trigger
-- `on_auth_user_created` (al final de este archivo): al crear un usuario
-- de prueba desde Authentication → Users → Add user, podés completar el
-- campo "User Metadata" con `{"full_name": "Nombre Apellido"}` para que
-- el trigger lo use. Si lo dejás vacío, el profile se crea igual, con
-- el placeholder "Sin nombre" (después se puede corregir a mano).
-- client_operations: reemplaza a MOCK_CLIENT_OPERATIONS, se carga a mano
-- (Table Editor / SQL Editor) por cada operación de cada cliente.
--
-- Si ya corriste una versión anterior, este script es idempotente:
-- vuelve a aplicar grants + policies + trigger.

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

-- =====================================================================
-- Trigger: auto-crear profile al crear un usuario en auth.users
--
-- Por qué existe: `profiles` es 1:1 con `auth.users`, pero Supabase
-- no crea esa fila sola. Sin este trigger, cada vez que se crea un
-- usuario a mano desde el Dashboard (Authentication → Users → Add user),
-- alguien tendría que acordarse de insertar también la fila en
-- `profiles` — si se olvida, el login funciona pero el panel del
-- cliente se muestra vacío (falta el full_name).
--
-- Qué hace: después de cada INSERT en auth.users, crea automáticamente
-- la fila correspondiente en public.profiles, usando el metadata
-- `full_name` si se cargó al crear el usuario (Dashboard permite
-- setear "User Metadata" en JSON), o un placeholder si no.
-- =====================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Sin nombre')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
