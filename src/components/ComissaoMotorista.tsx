import React, { useId, useState } from 'react';

interface ComissaoMotoristaProps {
  onOpenPartner?: () => void;
}

const MIN = 10;
const MAX = 100;
const TAXA_BAHCAR = 0.16;
const TAXA_OUTROS = 0.35;

const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const ComissaoMotorista: React.FC<ComissaoMotoristaProps> = () => {
  const [valor, setValor] = useState(35);
  const sliderId = useId();

  const liquidoBahcar = valor * (1 - TAXA_BAHCAR);
  const liquidoOutros = valor * (1 - TAXA_OUTROS);
  const diferenca = liquidoBahcar - liquidoOutros;
  const preenche = ((valor - MIN) / (MAX - MIN)) * 100;

  const linhas = [
    { nome: 'BahCar', taxa: 'taxa fixa de 16%', liquido: liquidoBahcar, destaque: true },
    { nome: 'Outros apps', taxa: 'cerca de 35%', liquido: liquidoOutros, destaque: false },
  ];

  return (
    <section id="comissao-clara" className="sobre-lima relative w-full bg-lima text-erva">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-5" data-reveal="left">
          <h2 className="titulo text-[clamp(2.6rem,6.4vw,5rem)]">
            Taxa fixa de 16%. O resto é seu.
          </h2>
          <p className="mt-5 text-lg text-erva/80 leading-relaxed max-w-[30rem]">
            Sem tarifas confusas ou descontos de até 40%. Você fica com 84% de cada viagem.
          </p>
        </div>

        <div className="lg:col-span-7 lg:pl-6" data-reveal="up" style={{ ['--d' as string]: 2 }}>
          <label htmlFor={sliderId} className="block text-base font-medium text-erva/80">
            Simule uma corrida de
          </label>
          <output htmlFor={sliderId} className="kanit-num block text-[clamp(3.2rem,8.5vw,6rem)] leading-none mt-1">
            {brl(valor)}
          </output>

          <input
            id={sliderId}
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="slider-corrida mt-4"
            style={{ ['--preenche' as string]: `${preenche}%` }}
            aria-valuetext={brl(valor)}
          />
          <div className="flex justify-between text-sm text-erva/70 numeros" aria-hidden="true">
            <span>{brl(MIN)}</span>
            <span>{brl(MAX)}</span>
          </div>

          <dl className="mt-10 space-y-6" data-reveal="barras">
            {linhas.map((l) => (
              <div key={l.nome}>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-base">
                    <span className="font-semibold">{l.nome}</span>
                    <span className="text-erva/70">, {l.taxa}</span>
                  </dt>
                  <dd className={`kanit-num text-2xl sm:text-4xl ${l.destaque ? '' : 'text-erva/60'}`}>
                    {brl(l.liquido)}
                  </dd>
                </div>
                <div className="mt-2 h-4 sm:h-5 rounded-full bg-erva/10 overflow-hidden" aria-hidden="true">
                  <div
                    className={`barra h-full rounded-full ${
                      l.destaque ? 'bg-erva' : 'bg-erva/35'
                    }`}
                    style={{ width: `${(l.liquido / valor) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-8 pt-6 border-t border-erva/20 text-lg" aria-live="polite">
            Nessa corrida, você leva <strong className="numeros font-bold">{brl(diferenca)}</strong> a mais com a BahCar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComissaoMotorista;
