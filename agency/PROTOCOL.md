# 📜 PROTOCOLO SPARTANA (Cadência & Eficiência)

## 1. Gestão de Contexto (Economia de Tokens)
- **Spawn Isolado:** Cada tarefa complexa deve ser executada via `sessions_spawn`.
- **Input Minimalista:** O sub-agente recebe apenas a tarefa e o link para os arquivos necessários.
- **Output Direto:** O resultado deve ser escrito em um arquivo na pasta `tasks/` e notificado no dashboard.

## 2. Fluxo de Cadência
1. **Erika (Head)** define a estratégia e cria a tarefa no `agency/CRM.json`.
2. **Ícaro (Architect)** quebra a tarefa em sub-passos técnicos se necessário.
3. **Maya (Copy)** ou **Dante (Visual)** executam a criação.
4. **Revisão:** Erika valida e entrega ao Will.

## 3. Seleção de Modelos
- **Complexidade ALTA (Estratégia/Arquitetura):** Gemini 1.5 Pro.
- **Complexidade MÉDIA (Copy/Execução):** Gemini 3 Flash.
- **Complexidade BAIXA (Formatação/Logs):** Gemini 1.5 Flash.

## 5. Organização de Repositórios
- **agencispartana (Este):** HQ dos Agentes. Contém o CRM, DASHBOARD, SOUL dos agentes e toda a inteligência operacional da agência.
- **spartana_shared (ou outros):** Entrega de Projetos. Cada projeto originado de briefing ou vendas será versionado em pastas específicas em repositórios de entrega, mantendo o HQ limpo de código de clientes.
