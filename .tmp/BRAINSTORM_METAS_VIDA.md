# 🧠 BRAINSTORM: Plano de Metas de Vida (Modo Pessoal)
*Status: Iniciado | Orquestradora: Erika*

## 🎯 Objetivo Central
Criar um plano de guerra para atingir as metas pessoais do Will, focando nos quatro blocos: Trabalho, Relacionamento, Dinheiro e Hábitos, seguindo o roadmap `plan-001`.

---

## 🦁 Erika (Head de Performance) - Estratégia de Vida
*Entrada: 2026-02-10 10:45*
Para as metas de vida, não podemos ser genéricos. Precisamos de:
1. **Métricas Claras:** O que não é medido não é gerenciado.
2. **Ciclos de 30 Dias:** Foco total no Rastreador de Hábitos que já implementamos.
3. **Isolamento de Foco:** O Midas vai cuidar do estancamento das dívidas enquanto eu foco na rotina de elite.
4. **Integração Externa:** Precisamos conectar o sistema do "Seu Costela" para automatizar a visão de caixa rápido.

---

## 💰 Midas (Estrategista Financeiro) - Visão de Patrimônio e Dívidas
*Entrada: 2026-02-10 10:48*

Minha estratégia para o bloco de 'Dinheiro' foca na **velocidade de liquidação** e na **blindagem do caixa**:

1.  **Conexão Agência-Dívida:** O faturamento da agência é o nosso combustível. Vamos estabelecer um **Ponto de Equilíbrio (Break-even)** operacional. Todo real acima desse ponto será dividido: 70% para o "Fundo de Extermínio de Dívidas" e 30% para reinvestimento/caixa operacional. Se o faturamento subir 20%, o ritmo de pagamento sobe exponencialmente, não linearmente.
2.  **Primeiro Marco Financeiro (O "Respiro"):** Antes de focar na maior dívida, o primeiro marco é a **Reserva de Sobrevivência de 1 Mês** (custo de vida mínimo + custos fixos da agência). Isso evita o uso de crédito caro para emergências durante o plano.
3.  **Mapeamento de Juros:** Vou ranquear as dívidas por **Custo Efetivo Total (CET)**. O foco inicial não é o valor total, mas onde estamos perdendo mais sangue (juros).
4.  **Integração Costela:** Preciso que o Ícaro priorize a conexão com o 'Seu Costela' para que eu tenha o DRE de caixa em tempo real. Sem dado limpo, não há estratégia de guerra.


---

## 🛠️ Ícaro (Architect/Ops) - Infraestrutura e Integrações
*Entrada: 2026-02-10 10:55*

Para viabilizar as estratégias da Erika e do Midas, vou estruturar a infraestrutura sobre três pilares técnicos:

1.  **Unificação de Identidade (Clerk):**
    *   Utilizaremos o Clerk como provedor de autenticação principal. Isso garante que o acesso ao Dashboard e ao sistema 'Seu Costela' seja fluido e seguro.
    *   **Webhooks do Clerk:** Vou configurar webhooks para sincronizar o perfil do usuário e metadados de permissão diretamente no nosso banco de dados centralizado toda vez que houver uma alteração de login ou nível de acesso.

2.  **Pipeline de Dados 'Seu Costela' (Supabase):**
    *   **Acesso Direto via API:** O 'Seu Costela' expõe o banco via PostgREST. Vou conectar o Dashboard diretamente às tabelas de `financial_transactions` e `invoices` usando a `supabase-js` client.
    *   **Database Webhooks:** Implementarei triggers no Supabase que disparam webhooks para nossa camada de orquestração sempre que um novo faturamento for registrado. Isso permitirá o cálculo imediato da divisão 70/30 (Fundo de Dívidas vs. Reinvestimento) sugerida pelo Midas.
    *   **Realtime Subscriptions:** O Dashboard usará o canal Realtime do Supabase para que os widgets de "Extermínio de Dívida" e "Fluxo de Caixa" atualizem instantaneamente na tela assim que os dados forem inseridos.

3.  **Automação de Metas e Hábitos:**
    *   **Edge Functions:** Criarei funções no limite (Edge Functions) para processar as regras de negócio (ex: cálculo do Ponto de Equilíbrio Dinâmico) de forma isolada e performática.
    *   **Sincronização de Hábitos:** O Rastreador de Hábitos será integrado via uma tabela espelho no Supabase. Cada registro de hábito concluído disparará uma verificação automática contra as metas de performance da Erika.
    *   **Alertas de Desvio:** Configurarei um sistema de monitoramento que, via API, notificará o agente se o faturamento cair abaixo da projeção mensal ou se um hábito chave for negligenciado, garantindo correção de curso em tempo real.
