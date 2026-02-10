# Diretiva: Brainstorm Inter-Agentes (Cadência de Ideias)

## Objetivo
Promover a colaboração entre agentes especializados para resolver problemas complexos, gerar ideias ou validar estratégias, mantendo a eficiência de tokens.

## Participantes
- **Erika (Orquestradora/Head):** Define o tema, as regras do brainstorm e faz a síntese final.
- **Ícaro (Architect/Ops):** Focado em viabilidade técnica, processos e estrutura.
- **Maya (Copy/Social):** Focada em persuasão, ângulos de venda e comunicação.
- **Midas (Financeiro):** Focado em ROI, custos e sustentabilidade financeira.

## Fluxo de Execução
1. **Início:** Erika detecta uma necessidade de brainstorm (ex: "Criar oferta para novo nicho").
2. **Criação do QG Temporário:** Erika cria um arquivo em `.tmp/BRAINSTORM_[TEMA].md`.
3. **Rodadas de Cadência:**
   - Erika define a pergunta central no arquivo.
   - Cada agente (via `sessions_spawn` sequencial) lê o arquivo, adiciona sua contribuição sob seu nome e salva.
   - **Regra:** Cada agente deve comentar brevemente a ideia do anterior antes de propor a sua.
4. **Síntese:** Erika lê o arquivo completo, destila a melhor estratégia e atualiza o `agency/SESSION_SUMMARY.md`.
5. **Limpeza:** O arquivo em `.tmp/` é movido para `tasks/archive/` ou deletado.

## Regras de Eficiência
- Agentes devem usar modelos leves (Flash ou Ollama) para o brainstorm inicial.
- O texto deve ser direto: "Concordo com X, mas sugiro Y por causa de Z".
- Máximo de 2 rodadas por tema.

## Saídas
- Estratégia final consolidada no `SESSION_SUMMARY.md`.
- Relatório de brainstorm em `tasks/`.
