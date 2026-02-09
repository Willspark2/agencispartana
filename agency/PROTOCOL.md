# 📜 PROTOCOLO SPARTANA (Cadência & Eficiência)

## 1. Gestão de Contexto (Economia de Tokens)
- **Spawn Isolado:** Cada tarefa complexa deve ser executada via `sessions_spawn`.
- **Input Minimalista:** O sub-agente recebe apenas a tarefa e o link para os arquivos necessários.
- **Output Direto:** O resultado deve ser escrito em um arquivo na pasta `tasks/` e notificado no dashboard.
- **Heartbeat de Cadência (15 min):** Os agentes operacionais (Ícaro, Maya, etc.) são "acordados" a cada 15 minutos via Cron ou Heartbeat para verificar o `agency/CRM.json`. Se não houver tarefa pendente, eles voltam ao standby imediatamente.

## 2. Hierarquia e Comunicação
- **Erika (Head):** Interface direta com o Will. Erika recebe as ordens, define a estratégia e delega para os agentes operacionais no CRM. Erika não "suja as mãos" no código ou copy, ela gerencia a excelência.
- **Comunicação Inter-Agentes:** Agentes devem ler o arquivo `tasks/` e logs de cadência para entender o estado atual do projeto antes de agir.
- **Will (Sócio):** Insere tarefas e define prioridades diretamente no Dashboard ou via Erika.

## 3. Seleção de Modelos
- **Complexidade ALTA (Estratégia/Arquitetura):** Gemini 1.5 Pro.
- **Complexidade MÉDIA (Copy/Execução):** Gemini 3 Flash.
- **Complexidade BAIXA (Formatação/Logs):** Gemini 1.5 Flash.

## 5. Organização de Repositórios
- **agencispartana (Este):** HQ dos Agentes. Contém o CRM, DASHBOARD, SOUL dos agentes e toda a inteligência operacional da agência.
- **spartana_shared (ou outros):** Entrega de Projetos. Cada projeto originado de briefing ou vendas será versionado em pastas específicas em repositórios de entrega, mantendo o HQ limpo de código de clientes.
