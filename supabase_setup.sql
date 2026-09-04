-- =========================================================
-- PROMPT STUDIO AI - SUPABASE SCHEMA SETUP (1-CLICK)
-- =========================================================
-- Execute este script no SQL Editor do seu projeto Supabase

-- 1. Criar tabela de histórico de prompts gerados
create table if not exists public.prompts_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  model text not null,
  original_idea text not null,
  optimized_prompt text not null,
  recommendations jsonb,
  breakdown jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar RLS (Row Level Security) para proteção de dados
alter table public.prompts_history enable row level security;

-- 3. Políticas de segurança: Usuário só lê e salva seus próprios prompts
create policy "Usuários podem ver seus próprios prompts"
  on public.prompts_history for select
  using (auth.uid() = user_id);

create policy "Usuários podem criar prompts no seu histórico"
  on public.prompts_history for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem deletar seus próprios prompts"
  on public.prompts_history for delete
  using (auth.uid() = user_id);

-- Pronto! O banco de dados está seguro e configurado.
