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
| Erva | `#11170C` | fundo escuro (hero, modalidades, chamada final, rodapé); tinta sobre lima/papel |
| Erva 2 | `#1B2414` | superfícies elevadas no escuro |
| Papel | `#EEF1E8` | fundo claro (manifesto) e modais |
| Musgo | `#A3AC98` | texto secundário sobre fundo escuro |
| Pedra | `#555D4D` | texto secundário sobre papel e lima |

## Tipografia

Duas famílias, servidas localmente em `public/fonts/`:

- **Kanit** (títulos): pedido do cliente, a fonte "gordinha" da versão anterior.
  - `.titulo-impacto`: Kanit 900 itálico em caixa alta, para a hero, a chamada final e o nome da modalidade.
  - `.titulo`: Kanit 800 em pé, em caixa normal, para os demais títulos de seção.
- **Archivo** (texto corrido, rótulos e botões secundários).

## Ritmo das seções

Erva (hero com a foto inteira) → Papel (manifesto) → **Lima (comissão)** → Erva (modalidades, fotos noturnas) → Erva (chamada final, como na versão anterior) → Erva (rodapé, com ícones de Instagram e WhatsApp).

## Princípios

1. Ousadia em um lugar só: a seção de comissão em lima chapado, com as barras de ganho comparando 84% e 65%.
2. Quase nada brilha: só um brilho leve no "se mover diferente." da chamada final, como na versão anterior.
3. A foto do hero aparece inteira (cuia, celular e carro). Logo centralizada no topo, sem botões na hero.
4. Movimento conforme a rolagem (pedido do cliente): `useRevealOnScroll` + atributos `data-reveal` (`up`, `left`, `scale`, `wipe`, `linhas`, `cascata`, `barras`). Tudo desligado com "reduzir movimento".
5. Modalidades com cara de tecnologia: pílula deslizante nas abas, visor com marcas de canto, varredura com linha lima na troca de foto e avanço automático com barra de progresso (pausa com mouse/foco e para quando a pessoa escolhe).
6. Texto alinhado à esquerda; centro só em elementos pontuais, como a chamada final.
