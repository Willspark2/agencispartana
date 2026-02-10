# Diretiva: Remoção de Fundo de Imagens

## Objetivo
Remover fundos sólidos (especialmente brancos) de imagens para criar ativos transparentes (PNG).

## Entradas
- Caminho da imagem original (JPG/PNG).
- Threshold (opcional, padrão 220).

## Ferramentas/Scripts
- `execution/remove_bg.py`

## Fluxo de Execução
1. Identificar o arquivo de imagem enviado pelo usuário.
2. Definir o caminho de saída com extensão `.png`.
3. Executar o script: `python3 execution/remove_bg.py <input> <output> [threshold]`.
4. Mover o resultado para a pasta de destino final (ex: `briefing-form/public/`).

## Saídas
- Arquivo PNG transparente.
- Confirmação de sucesso no chat.

## Edge Cases
- Imagens sem fundo sólido: o script pode não funcionar bem, alertar o usuário.
- Formatos não suportados: o script falhará se não for imagem válida.
