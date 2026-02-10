# 🔴 Missão: Configuração e Implementação de Métricas Essenciais

**Prioridade:** 🔥 CRÍTICA | **Responsável:** Ícaro (Architect/Ops) | **Status:** Backlog

## 📄 Descrição
Definir e configurar tracking básico nos ativos digitais (pixel e tags) para mensurar tráfego, conversão, e engajamento nas campanhas recorrentes da Agência Spartana.

---

## 🎯 Objetivo (Entregável)
- Implementar tracking completo (Meta & Google) em todos os ativos digitais.
- Assegurar a captação precisa de dados para otimização de campanhas High Ticket.

## 🛠 Plano de Execução
1.  **Levantamento:** Acessar Meta Business Manager e GA4; extrair IDs de medição e Pixel.
2.  **Instalação Base:** Inserir Pixel base no `<head>` de todas as páginas via GTM ou código direto.
3.  **Configuração de Eventos:**
    - **Meta:** Configurar eventos de "Envio de Formulário" e "Clique em WhatsApp" via Event Setup Tool.
    - **GA4:** Criar Tags de Configuração e Tags de Evento (Scroll, Clicks, Form Submission).
4.  **Engajamento:** Validar métricas de tempo de página e profundidade de rolagem.
5.  **Publicação:** Dar deploy nas versões do Google Tag Manager.
6.  **QA Técnico:** Testar via Meta Pixel Helper e Google Tag Assistant.

## ✅ Critérios de Conclusão
- [ ] Pixel disparando PageView em 100% das URLs.
- [ ] Eventos de conversão aparecendo no DebugView do GA4.
- [ ] Relatório de validação preenchido e compartilhado no QG.

## 🔍 Subtarefas
- [ ] Mapear IDs das plataformas.
- [ ] Instalar GTM no backend do site.
- [ ] Configurar Gatilhos (Triggers) de conversão.
- [ ] Testar disparos em modo Preview.
- [ ] Documentar logs de sucesso em `tasks/004_logs.md`.
