# 🧠 RESUMO EXECUTIVO (Memória de Curto Prazo)
*Última Atualização: 2026-02-10 01:25*

## 🎯 Estado Atual
- **Infraestrutura:** HQ e Dashboards operacionais. Repositórios divididos em HQ (`agencispartana`) e Entrega (`spartana_shared`).
- **Equipe:** Erika (Head), Ícaro (Ops), Maya (Copy), Midas (Financeiro).
- **Ferramentas:** MCP Supabase, Context7, n8n (Domínio Spartano) e **shadcn/ui** integrados.
- **Segurança:** Protocolos de tokens e fallback local (Ollama) definidos.

## ⚡ Últimas Decisões
1. **Fallback Ollama:** Implementado como contingência para erro 429 nos agentes.
2. **Logo Oficial:** Imagem atualizada pelo Will com transparência e escala 150% no Dashboard.
3. **Protocolo de Cadência:** Agentes operam em pulso de 15 minutos via leitura de CRM. **Utilização prioritária do Ollama para heartbeats e tarefas rotineiras.**
4. **Brainstorm Inter-Agentes:** Implementado fluxo de colaboração via arquivo central em `.tmp/`. Erika coordena a cadência entre agentes para decisões complexas.
5. **Estratégia "Google Invisível":** Plano de prospecção aprovado. Pipeline: Extração (Ícaro) -> Dossiê de Invisibilidade (Ícaro) -> Copy de Ego e Medo (Maya) -> Oferta Fast-Cash R$ 2.497 (Midas).
6. **n8n Intelectual:** Servidor MCP `n8n-mcp` ativado para orquestração de workflows complexos via Erika e Ícaro.
7. **Shadcn UI Force:** Servidor MCP `shadcn` ativado para acelerar o design e implementação de componentes de alta qualidade nos nossos Dashboards e ferramentas.

## 📋 Próximos Passos
- Implementar interatividade de adição de tarefas no Dashboard (UI) vinculada ao Supabase.
- Criar script `execution/find_local_leads.py` baseado no brainstorm de prospecção.
- Validar templates de "Dossiê de Invisibilidade" para envio automático.
- Integrar tabelas do Supabase (Agência vs Pessoal) para persistência real de dados.
