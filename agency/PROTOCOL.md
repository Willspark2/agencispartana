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

## 4. Comunicação Inter-Agentes
- Agentes devem deixar "notas de passagem" em `tasks/NOTE_TASKID.md`.
- No `DASHBOARD.md`, a seção **CADÊNCIA** deve refletir as últimas 5 ações globais.
