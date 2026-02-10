# 🧠 BRAINSTORM: Estratégia de Prospecção - "Quem não é visto não é lembrado"
*Status: Em Andamento | Iniciado por: Erika*

## 🎯 Pergunta Central
Como abordar e converter donos de negócios sem site ou com baixo posicionamento no Google, criando uma comunicação assertiva e baseada em padrões de comportamento?

---

## 🦁 Erika (Head de Performance) - Visão Estratégica
*Entrada: 2026-02-10 01:10*
O foco não é vender "site", é vender **lucro cessante**. O cliente não sente falta de um site, ele sente falta do dinheiro que está deixando na mesa por ser invisível. 
- **Persona:** Pequenos/médios empresários locais que já faturam mas estão estagnados no "boca a boca".
- **Comportamento:** Eles buscam por si mesmos no Google e sentem frustração ao ver o concorrente no topo.
- **Minha proposta:** Abordagem via "Análise de Visibilidade Digital" — mostrar o problema antes de oferecer a cura.

---

## 🛠️ Ícaro (Architect/Ops) - Visão Técnica e Viabilidade
*Entrada: 2026-02-10 01:15*

Para escalar a visão da Erika, precisamos transformar "procura manual" em um **pipeline de dados determinístico**. 

### 1. Automação de Descoberta em Massa
A estratégia de identificação deve ser dividida em três camadas:
- **Camada de Extração (Scraping):** Utilizar a API do Google Places ou scripts de scraping em massa (Playwright/Puppeteer) focados em categorias de alto valor (ex: Clínicas, Advocacia, Oficinas Premium).
- **Filtro de Qualificação:** O script deve validar a ausência da chave `website` no JSON do Google Maps e, simultaneamente, realizar uma busca secundária pelo `Nome da Empresa + Cidade`. Se o primeiro resultado orgânico não for o domínio oficial, o lead é classificado como "Invisível".
- **Enriquecimento:** Uso de ferramentas de busca de CNPJ ou redes sociais para encontrar o WhatsApp/Email do decisor.

### 2. A "Prova Técnica" (A Prova do Crime)
Para gerar autoridade imediata na abordagem, propõe-se a geração automatizada de um **Dossiê de Invisibilidade**:
- **Screenshot Automatizado:** Um robô abre o Google, pesquisa o nome da empresa e tira um print da tela. O script deve destacar (via CSS overlay ou edição de imagem) a ausência do botão "Website" no Perfil da Empresa (GMB) e a presença de concorrentes no topo.
- **Relatório de "Custo de Oportunidade":** Um script simples que calcula o volume de buscas mensais para a palavra-chave do setor na região (via Google Keyword Planner API) e estima quantos cliques o cliente está perdendo para o concorrente direto.

### 3. Pipeline de Execução Proposto
1. `execution/find_local_leads.py`: Busca empresas sem site por região/nicho.
2. `execution/generate_visual_proof.py`: Gera o screenshot da "invisibilidade".
3. `execution/outreach_sender.py`: Dispara a mensagem via WhatsApp com o print anexo.

**Viabilidade:** 100% automatizável. O custo por lead qualificado (com print gerado) ficaria abaixo de R$ 0,50 considerando custos de API/Proxy.

---

---

## ✍️ Maya (Copy/Social) - Visão Persuasiva e Ângulos de Venda
*Entrada: 2026-02-10 01:20*

Erika e Ícaro já deram o "esqueleto" e os "músculos". Eu vou dar a **voz** que faz o empresário perder o sono (no bom sentido). O segredo aqui não é tecnologia, é **ego e medo**.

### 1. O Hook (A "Ferroada" Inicial)
Esqueça "Olá, somos uma agência". Ninguém quer uma agência. Eles querem o cliente que está sumindo.
- **Opção A (Foco em Ego):** "Eu tentei te indicar para um amigo agora pouco, mas não achei seu link oficial no Google. Quase mandei ele pro seu concorrente sem querer..."
- **Opção B (Foco em Lucro Cessante - O favorito):** "Vi que [X] pessoas pesquisaram por '[Nicho]' na nossa cidade este mês. Quantas delas chegaram no seu WhatsApp? Se a resposta for 'não sei', o print abaixo explica o porquê."

### 2. A 'Invisibilidade' como Gatilho de Urgência
Vamos tratar a falta de site não como um "detalhe técnico", mas como uma **loja de portas fechadas em dia de liquidação**.
- **O Conceito:** "A Invisibilidade Digital Seletiva". O Google não esqueceu dele; o Google está escondendo ele ativamente para proteger a experiência do usuário. 
- **Urgência:** "A cada hora que você passa sem esse botão, o algoritmo do Google 'vicia' em entregar o tráfego para o seu concorrente. Reverter isso daqui a 6 meses será 3x mais caro."

### 3. Micro-Script de 3 Passos (O "Direto ao Ponto")

*   **Passo 1: Abordagem (O susto com prova):**
    > "Olá, [Nome]! Sou a Maya. Estava analisando o mercado de [Nicho] em [Cidade] e vi que a [Nome da Empresa] está sofrendo um 'bloqueio de visibilidade' no Google. Dá uma olhada nesse print: seus concorrentes têm porta de entrada, você tem uma parede." (Enviar o Dossiê do Ícaro).
*   **Passo 2: Dor (O prejuízo materializado):**
    > "Isso não é só estética. São [X] potenciais clientes por mês que digitam seu serviço, não encontram um site oficial e, por segurança, clicam no vizinho que parece 'mais profissional'. Você está financiando o crescimento do seu concorrente com o seu silêncio digital."
*   **Passo 3: Solução (A pílula mágica):**
    > "Não quero te vender um projeto de 3 meses. Quero ativar sua 'chave de presença' em 48h para que esse fluxo pare de vazar. Tenho uma estratégia pronta para o seu nicho. Podemos validar os números em 5 minutos de call?"

---

---

## 💰 Midas (Estrategista Financeiro) - Visão de ROI e Sustentabilidade
*Entrada: 2026-02-10 01:25*

Para que essa operação não seja apenas um "job" e sim uma **máquina de fluxo de caixa**, precisamos de uma estrutura que maximize a margem inicial sem sacrificar a retenção (LTV). O Will precisa de dinheiro agora, mas o negócio precisa de previsibilidade amanhã.

### 1. O Valor Justo e o Psicológico do Preço
Vender "site" é commodity. Vender "Estancamento de Sangria Financeira" permite cobrar por valor, não por hora.
*   **Setup (O "Pedágio"):** R$ 1.497,00.
    *   *Por que esse valor?* Está abaixo da barreira psicológica de R$ 2k, mas acima dos "sobrinhos" de R$ 500. Garante margem de lucro de ~80% considerando o custo operacional automatizado.
*   **Mensalidade (O "Seguro de Visibilidade"):** R$ 197,00/mês.
    *   Inclui: Hospedagem, SSL, suporte básico e um "Relatório Mensal de Cliques Recuperados" (crucial para evitar churn).

### 2. Pacote "Fast-Cash" (Para o Will gerar caixa imediato)
Para injetar liquidez rápida, utilizaremos a **Ancoragem por Antecipação**:
*   **Oferta de Ativação:** Setup (R$ 1.497) + 12 meses de manutenção (R$ 2.364) = R$ 3.861 total.
*   **Condição Especial (Válida por 48h):** R$ 2.497 à vista (ou em até 12x no cartão com juros para o cliente).
*   **Resultado:** O Will recebe R$ 2.5k limpos no dia 1, garante o cliente por 1 ano e o custo de entrega (templates + automação) é marginal.

### 3. Projeção de LTV e ROI
*   **LTV (Lifetime Value - 24 meses):** R$ 1.497 (Setup) + R$ 4.728 (Mensalidades) = **R$ 6.225 por cliente.**
*   **CAC (Custo de Aquisição):** Com a automação do Ícaro (R$ 0,50/lead) e uma conversão conservadora de 1%, o custo de aquisição de um cliente de R$ 6k será de aproximadamente R$ 50 a R$ 100 em infraestrutura e tempo de prospecção.
*   **ROI para o Cliente:** Se o ticket médio do cliente for R$ 500,00, ele só precisa de **3 vendas vindas do Google** para pagar todo o investimento do primeiro ano. É um "no-brainer".

### 4. Estratégia de Upsell (Fase 2)
Assim que o cliente sentir o gosto dos primeiros cliques, o "Seguro de Visibilidade" (R$ 197) sobe para "Gestão de Presença Local" (R$ 597/mês), onde incluímos gestão de Google Meu Negócio e R$ 1.000 em tráfego pago (com fee de agência).

---
