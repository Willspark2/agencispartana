-- SQL PARA INITIALIZAÇÃO DO QG SPARTANA NO SUPABASE
-- Execute este script no SQL Editor do seu projeto Supabase

-- 1. Tabela de Missões (CRM/Kanban)
CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    objectives TEXT,
    steps TEXT,
    outcome TEXT,
    questions TEXT,
    priority TEXT DEFAULT 'Normal',
    status TEXT DEFAULT 'todo', -- 'todo', 'in_progress', 'done'
    category TEXT DEFAULT 'agency', -- 'agency', 'personal'
    project TEXT DEFAULT 'Interno',
    resp TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabela de Hábitos (30 Dias)
CREATE TABLE IF NOT EXISTS habits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    days BOOLEAN[] DEFAULT array_fill(false, ARRAY[30]),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabela de Finanças
CREATE TABLE IF NOT EXISTS finances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL, -- 'debt', 'income'
    name TEXT NOT NULL,
    value NUMERIC DEFAULT 0,
    rate TEXT,
    status TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Tabela de Brainstorm (Feed)
CREATE TABLE IF NOT EXISTS brainstorm_feed (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent TEXT NOT NULL,
    text TEXT NOT NULL,
    color TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
