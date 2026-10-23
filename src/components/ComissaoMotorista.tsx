import React, { useEffect, useId, useRef, useState } from 'react';

interface ComissaoMotoristaProps {
  onOpenPartner?: () => void;
}

const MIN = 10;
const MAX = 100;
const TAXA_BAHCAR = 0.16;
const TAXA_OUTROS = 0.35;

const brl = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Número que gira dígito por dígito, como um odômetro */
const Odometro: React.FC<{ texto: string; className?: string }> = ({ texto, className = '' }) => (
  <span className={`odometro ${className}`} aria-label={texto} role="img">
    {[...texto].map((c, i) =>
      /\d/.test(c) ? (
        <span key={i} className="odometro-roda" aria-hidden="true">
          <span className="odometro-coluna" style={{ transform: `translateY(-${Number(c)}em)` }}>
            {'0123456789'.split('').map((d) => (
              <span key={d}>{d}</span>
            ))}
          </span>
        </span>
      ) : (
        <span key={i} aria-hidden="true">
          {c === ' ' || c === ' ' ? ' ' : c}
        </span>
      )
    )}
  </span>
);

export const ComissaoMotorista: React.FC<ComissaoMotoristaProps> = () => {
  const [valor, setValor] = useState(35);
  const sliderId = useId();
  const painelRef = useRef<HTMLDivElement>(null);
  // entrou: a seção apareceu na tela (dispara a sequência); pronto: a sequência terminou
  const [entrou, setEntrou] = useState(false);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const el = painelRef.current;
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduz || !('IntersectionObserver' in window)) {
      setEntrou(true);
      setPronto(true);
      return;
    }
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          setEntrou(true);
          timer = window.setTimeout(() => setPronto(true), 1700);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const liquidoBahcar = valor * (1 - TAXA_BAHCAR);
  const liquidoOutros = valor * (1 - TAXA_OUTROS);
  const diferenca = liquidoBahcar - liquidoOutros;
  const preenche = ((valor - MIN) / (MAX - MIN)) * 100;

  const linhas = [
    { nome: 'BahCar', taxa: 'taxa fixa de 16%', liquido: liquidoBahcar, destaque: true },
    { nome: 'Outros apps', taxa: 'cerca de 35%', liquido: liquidoOutros, destaque: false },
  ];

  // Antes de entrar na tela: barras vazias e diferença zerada. Na entrada: enchem uma depois da outra.
  const estiloBarra = (i: number, largura: number): React.CSSProperties => ({
    width: entrou ? `${largura}%` : '0%',
    transition: pronto
      ? 'width 0.35s ease-out'
      : `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + i * 0.4}s`,
  });

  return (
    <section id="comissao-clara" className="sobre-lima relative w-full bg-lima text-erva">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 grid lg:grid-cols-12 gap-12 lg:gap-10">
        <div className="lg:col-span-5" data-reveal="left">
          <h2 className="titulo text-[clamp(2.6rem,6.4vw,5rem)]">Taxa fixa de 16%. O resto é seu.</h2>
          <p className="mt-5 text-lg text-erva/80 leading-relaxed max-w-[30rem]">
            Sem tarifas confusas ou descontos de até 40%. Você fica com 84% de cada viagem.
          </p>
        </div>

        <div ref={painelRef} className="lg:col-span-7 lg:pl-6" data-reveal="up" style={{ ['--d' as string]: 2 }}>
          <div className="flex items-end justify-between gap-4">
            <label htmlFor={sliderId} className="text-base font-medium text-erva/80">
              Simule uma corrida de
            </label>
            <output htmlFor={sliderId} className="kanit-num text-[clamp(2rem,4.5vw,3rem)] leading-none">
              {brl(valor)}
            </output>
          </div>

          <input
            id={sliderId}
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="slider-corrida mt-2"
            style={{ ['--preenche' as string]: `${preenche}%` }}
            aria-valuetext={brl(valor)}
          />
          <div className="flex justify-between text-sm text-erva/70 numeros" aria-hidden="true">
            <span>{brl(MIN)}</span>
            <span>{brl(MAX)}</span>
          </div>

          <dl className="mt-8 space-y-5">
            {linhas.map((l, i) => (
              <div key={l.nome}>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-base">
                    <span className="font-semibold">{l.nome}</span>
                    <span className="text-erva/70">, {l.taxa}</span>
                  </dt>
                  <dd className={`kanit-num text-xl sm:text-2xl ${l.destaque ? '' : 'text-erva/60'}`}>{brl(l.liquido)}</dd>
                </div>
                <div className="mt-2 h-4 sm:h-5 rounded-full bg-erva/10 overflow-hidden" aria-hidden="true">
                  <div
                    className={`h-full rounded-full ${l.destaque ? 'bg-erva' : 'bg-erva/35'}`}
                    style={estiloBarra(i, (l.liquido / valor) * 100)}
                  />
                </div>
              </div>
            ))}
          </dl>

          {/* A conclusão em destaque: quanto o motorista leva a mais */}
          <div className="mt-10 pt-6 border-t-2 border-erva">
            <p className="text-base sm:text-lg font-semibold">A mais no seu bolso, nessa corrida</p>
            <p className="mt-1" aria-live="polite">
              <Odometro
                texto={`+${brl(entrou ? diferenca : 0)}`}
                className="font-heading font-black italic text-[clamp(3.6rem,13vw,8rem)] leading-[0.95] tracking-tight"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComissaoMotorista;
