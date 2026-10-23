# BahCar — Design

Landing page da BahCar, app de mobilidade urbana de Santa Maria/RS.
Modo: **Persuade** — o visitante (motorista ou passageiro) precisa entender a proposta e agir.

## Por que este redesign

O cliente relatou que o site tinha "cara de IA". O diagnóstico apontou os padrões genéricos de páginas geradas:

- fundo quase preto com um único verde-ácido brilhante e glow (`drop-shadow`) em tudo;
- todos os títulos com o mesmo tratamento: itálico, black, CAIXA ALTA;
- uma palavra destacada em cor ou contorno neon em cada título;
- rótulos pequenos em monoespaçada com tracking largo;
- cards de vidro (glassmorphism) com o mesmo raio e a mesma sombra;
- animação de "sobe e aparece" em todas as seções;
- 10 famílias de fonte carregadas.

## Direção

A identidade vem da própria marca: o logo é um "bah" geométrico e gordinho, verde-lima chapado, com uma cuia de chimarrão virando carro. É simpático, local e direto, não "cyberpunk de corrida". O verde da marca passa a ser usado como **superfície chapada**, como no logo, e não como luz neon.

## Tokens

| Nome | Hex | Uso |
|---|---|---|
| Lima | `#AEE827` | cor do logo; superfície da seção de comissão, botão principal |
| Lima escuro | `#97CC1C` | hover do botão principal |
| Erva | `#11170C` | fundo escuro (hero, modalidades, rodapé); tinta sobre lima/papel |
| Erva 2 | `#1B2414` | superfícies elevadas no escuro |
| Papel | `#EEF1E8` | fundo claro (manifesto, chamada final) |
| Musgo | `#A3AC98` | texto secundário sobre fundo escuro |
| Pedra | `#555D4D` | texto secundário sobre papel e lima |

## Tipografia

Uma família só: **Archivo** (variável, eixos de largura e peso), servida localmente em `public/fonts/`.
O contraste vem do eixo de largura: títulos expandidos (`wdth` 112–125, peso 800), texto em largura normal (`wdth` 100, peso 400–500).
Títulos em caixa normal (sentence case), sem itálico, sem palavra destacada.

## Ritmo das seções

Erva (hero com a foto inteira) → Papel (manifesto) → **Lima (comissão: o elemento memorável)** → Erva (modalidades, fotos noturnas) → Papel (chamada final) → Erva (rodapé).

## Princípios

1. Ousadia em um lugar só: a seção de comissão em lima chapado, com as barras de ganho comparando 84% e 65%.
2. Nada brilha. Sem glow, sem contorno neon, sem vidro.
3. A foto do hero aparece inteira (cuia, celular e carro), sem texto por cima no desktop.
4. Movimento só na entrada do hero e em resposta à ação da pessoa (slider, abas, modais).
5. Texto alinhado à esquerda; centro só em elementos pontuais.
