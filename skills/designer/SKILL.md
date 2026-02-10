---
name: designer
description: Ferramentas e fluxos para design gráfico, especificamente remoção de fundo de imagens (background removal) e tratamento básico de ativos da marca Spartana. Use quando precisar limpar o fundo de um logo ou imagem enviada pelo usuário.
---

# Designer Skill

Esta skill fornece ferramentas para o Designer da Agência Spartana tratar imagens e ativos de marca.

## Remoção de Fundo (Background Removal)

Para imagens com fundo sólido (especialmente branco ou cores claras), utilize o script Python integrado.

### Como usar o script:

```bash
python3 skills/designer/scripts/remove_bg.py <input_path> <output_path> [threshold]
```

- **threshold**: Opcional. Padrão é 220. Valores maiores removem apenas brancos puros; valores menores são mais agressivos com tons de cinza claro.

### Fluxo de Trabalho:
1. Identifique a imagem enviada pelo usuário (geralmente em `/root/.openclaw/media/inbound/`).
2. Execute o script definindo o `output_path` como uma extensão `.png`.
3. Valide o resultado e mova para a pasta de ativos final (ex: `briefing-form/public/`).

## Ativos da Marca Spartana
- Logo Oficial: `briefing-form/public/logo_spartana.png`
- Cores: Dourado Premium, Fundo Preto Onyx.
