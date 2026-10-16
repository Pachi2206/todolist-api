-- Paso 1: tabla de tareas.
-- Ejecutar en Supabase -> SQL Editor.

create table if not exists public.tasks (
  -- El id lo pone la base de datos, no el cliente.
  id          bigint generated always as identity primary key,
  title       text not null check (char_length(title) between 1 and 200),
  description text check (char_length(description) <= 2000),
  done        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- RLS sin políticas: la tabla queda cerrada para la llave pública.
-- Solo nuestro servidor, con la secret key (rol service_role), puede leerla y escribirla.
alter table public.tasks enable row level security;

grant select, insert, update, delete on table public.tasks to service_role;

-- Filas de ejemplo.
insert into public.tasks (title, description, done) values
  ('Preparar la demo', 'Ensayar cada paso', false),
  ('Crear el proyecto en Supabase', null, true),
  ('Documentar la API con Swagger', 'Usar los schemas de zod', false);
