# 🧠 RESUMO EXECUTIVO (Memória de Curto Prazo)
*Última Atualização: 2026-02-10 02:15*

## 🎯 Estado Atual
- **Infraestrutura:** HQ e Dashboards operacionais. Repositórios divididos em HQ (`agencispartana`) e Entrega (`spartana_shared`).
- **Equipe:** Erika (Head), Ícaro (Ops), Maya (Copy), Midas (Financeiro).
- **Ferramentas:** MCP Supabase, Context7, n8n, shadcn/ui e Stitch integrados.
- **Segurança:** Gestão dinâmica de ferramentas (75/100 tools ativos). Fallback local (Ollama) definido.

## ⚡ Últimas Decisões
1. **Fallback Ollama:** Contingência para erro 429 e heartbeats rotineiros (custo zero).
2. **Logo Oficial:** Imagem processada via Canvas para transparência real no Dashboard.
3. **Gestão On-Demand de MCPs:** Erika irá ativar/desativar servidores MCP conforme a necessidade da tarefa para manter a saúde do sistema e respeitar o limite de 100 tools.
4. **Brainstorm Inter-Agentes:** Fluxo de colaboração via arquivo central em `.tmp/` ativo e visível no Dashboard.
5. **Estratégia "Google Invisível":** Plano de prospecção pronto para execução (Extração -> Dossiê -> Copy -> Oferta Fast-Cash).

## 📋 Próximos Passos
- Implementar interatividade de adição de tarefas no Dashboard (UI) vinculada ao Supabase.
- Criar script `execution/find_local_leads.py` baseado no brainstorm de prospecção.
- Validar templates de "Dossiê de Invisibilidade" para envio automático.
