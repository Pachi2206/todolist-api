-- Paso 7: tabla de usuarios para la autenticación con JWT.
-- Ejecutar en Supabase -> SQL Editor.

create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique check (email = lower(email) and char_length(email) <= 254),
  -- Nunca guardamos la contraseña: solo su hash de bcrypt ($2b$10$...).
  password_hash text not null,
  created_at    timestamptz not null default now()
);

-- RLS sin políticas: la tabla queda cerrada para la llave pública.
-- Solo nuestro servidor, con la secret key (rol service_role), puede leerla y escribirla.
alter table public.users enable row level security;

grant select, insert, update, delete on table public.users to service_role;
