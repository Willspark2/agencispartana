# 🗺️ ROADMAP MVP: App Unificado Spartana (Gestão Agência & Vida)
*ID: plan-001 | Versão: 1.0 (HD)*

## 🎯 Escopo Geral
Desenvolver um ecossistema (Web/Mobile) para gestão de agência e vida pessoal, cobrindo: **Trabalho, Relacionamento, Dinheiro e Hábitos.**

---

## ✅ Requisitos Funcionais (Core)

### 🏢 Módulo Agência (Profissional)
- **RF01-02:** Gestão de Projetos e Tarefas (Kanban/Lista/Calendário).
- **RF03-04:** CRM & Pipeline de Vendas com histórico e próximos passos.
- **RF05-06:** Time Tracking e Carga de Trabalho da Equipe.
- **RF07-08:** Financeiro (Contratos, Faturas, Lucratividade por Projeto).
- **RF09:** Portal do Cliente.
- **RF11:** Automação de Fluxos de Funil.

### 👤 Módulo Pessoal (Life)
- **RF13:** Gestão de Tarefas Pessoais.
- **RF14:** Integração com Google/Outlook Calendar.
- **RF16:** Rastreador de Hábitos e Rotinas HD.
- **RF17:** Acompanhamento de Metas de Vida.
- **RF19:** CRM de Relacionamentos (Follow-up de pessoas importantes).

### ⚙️ Núcleo & Infra (Spartana Engine)
- **RF20-22:** Busca Global e Alternância de Workspaces (Isolamento de Dados).
- **Stack:** React/Vite (Frontend), Supabase/PostgreSQL (Database), Node.js (Backend).

---

## 🔐 Modelo de Ameaças & Segurança
- Isolamento total de dados entre Agência e Pessoal.
- Criptografia em repouso.
- Controle rigoroso de permissões.

---

## 🔢 Plano de Execução Imediata
1. **Fase 1:** Arquitetura de Dados no Supabase (Mapear tabelas de Workspaces, Projetos e Tarefas).
2. **Fase 2:** Implementação do CRUD HD (Create, Read, Update, Delete) no Dashboard Web.
3. **Fase 3:** Automações de Gatilhos via n8n.
4. **Fase 4:** Desenvolvimento do módulo Pessoal (Dívidas e Hábitos).
