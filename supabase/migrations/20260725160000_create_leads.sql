-- Captación de leads (formulario /suscriptores)
-- Correr en: Dashboard → SQL Editor → New query → Run
-- Proyecto: kegnvggnfyfdimkvoeqp
--
-- Si ya corriste la versión anterior, este script es idempotente:
-- vuelve a aplicar grants + policies.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  interest text not null
    check (interest in ('comprar', 'vender', 'alquilar', 'tasar', 'informacion')),
  accepts_marketing boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

-- Permisos a nivel tabla (RLS solo no alcanza sin GRANT)
grant usage on schema public to anon, authenticated;
grant insert on table public.leads to anon, authenticated;
revoke select, update, delete on table public.leads from anon, authenticated;

-- Formulario público: cualquiera puede insertar un lead.
-- `TO public` cubre anon, authenticated y roles de las publishable keys nuevas.
drop policy if exists "anon_can_insert_leads" on public.leads;
create policy "anon_can_insert_leads"
  on public.leads
  for insert
  to public
  with check (true);
