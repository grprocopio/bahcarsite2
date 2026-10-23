import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface ModalityItem {
  id: 'pop' | 'plus' | 'confort' | 'black';
  name: string;
  yearRule: string;
  summary: string;
  highlights: string[];
  imageSrc: string;
  alt: string;
  models?: string[];
}

const MODALITIES_LIST: ModalityItem[] = [
  {
    id: 'pop',
    name: 'POP',
    yearRule: '2011 em diante',
    summary: 'Mobilidade ágil, prática e acessível para o dia a dia em Santa Maria.',
    highlights: ['Carros a partir de 2011', '4 portas com ar-condicionado'],
    imageSrc: '/images/bahcar_real_pop.jpg',
    alt: 'Carro da categoria POP em uma rua à noite',
  },
  {
    id: 'plus',
    name: 'PLUS',
    yearRule: 'Hatch e elétrico, 2023 em diante',
    summary: 'Veículos hatch e elétricos modernos, confortáveis e eficientes.',
    highlights: ['Hatch e elétrico', 'Ano 2023 em diante'],
    imageSrc: '/images/bahcar_real_plus.jpg',
    alt: 'Carro da categoria PLUS',
  },
  {
    id: 'confort',
    name: 'CONFORT SEDAN',
    yearRule: 'Sedãs 2019 em diante',
    summary: 'Porta-malas espaçoso e conforto extra para viagens, compras e famílias.',
    highlights: ['Sedãs a partir de 2019', 'Porta-malas amplo'],
    imageSrc: '/images/bahcar_real_confort.jpg',
    alt: 'Sedã da categoria CONFORT SEDAN',
    models: ['Onix Plus', 'Versa', 'Virtus', 'Cronos', 'Yaris Sedan', 'HB20S', 'Kicks', 'Duster', 'Peugeot 2008'],
  },
  {
    id: 'black',
    name: 'BLACK',
    yearRule: 'Modelos homologados',
    summary: 'Padrão executivo premium com os motoristas parceiros mais bem avaliados.',
    highlights: ['Modelos homologados', 'Motoristas mais bem avaliados'],
    imageSrc: '/images/bahcar_real_black.jpg',
    alt: 'Sedã preto da categoria BLACK em uma avenida molhada',
    models: ['Corolla', 'Creta', 'Tracker', 'Sentra 25/26', 'Duster 24/25/26', 'Cerato', 'Jetta', 'Kicks'],
  },
];

const DURACAO_MS = 7000;

export const Modalities: React.FC = () => {
  const total = MODALITIES_LIST.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'direita' | 'esquerda'>('direita');
  const [pill, setPill] = useState({ left: 0, width: 0 });

  // Avanço automático: só com a seção na tela, pausa com mouse/foco, para de vez quando a pessoa escolhe
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef(0);

  const current = MODALITIES_LIST[activeIndex];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAutoplay(false);
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number, opts: { user?: boolean; focus?: boolean } = {}) => {
      const next = (index + total) % total;
      if (opts.user) setAutoplay(false);
      if (next === activeIndex) return;
      const forward = (next > activeIndex && !(activeIndex === 0 && next === total - 1)) || (activeIndex === total - 1 && next === 0);
      setDirection(forward ? 'direita' : 'esquerda');
      setPrevIndex(activeIndex);
      setActiveIndex(next);
      if (opts.focus) tabRefs.current[next]?.focus();
    },
    [activeIndex, total]
  );

  // Pílula lima que desliza até a aba ativa
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabRefs.current[activeIndex];
      if (tab) setPill({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeIndex]);

  // Mantém a aba ativa visível quando a lista rola no celular
  useEffect(() => {
    const list = tabListRef.current;
    const tab = tabRefs.current[activeIndex];
    if (list && tab && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' });
    }
  }, [activeIndex]);

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: activeIndex + 1, ArrowLeft: activeIndex - 1, Home: 0, End: total - 1 };
    if (e.key in keys) {
      e.preventDefault();
      goTo(keys[e.key], { user: true, focus: true });
    }
  };

  const rodando = autoplay && inView && !paused;
  const prev = prevIndex !== null ? MODALITIES_LIST[prevIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="modalidades"
      className="relative w-full bg-erva text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Grade técnica sutil ao fundo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 30%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2 data-reveal="left" className="titulo text-[clamp(2.6rem,6.5vw,5rem)]">
            Modalidades
          </h2>

          {/* Abas com pílula deslizante */}
          <div data-reveal="up" style={{ ['--d' as string]: 1 }} className="-mx-5 px-5 sm:mx-0 sm:px-0">
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Modalidades BahCar"
              className="relative flex gap-1 p-1.5 rounded-full border border-white/15 bg-erva-2/80 overflow-x-auto w-max max-w-full [scrollbar-width:none]"
            >
              <span
                className="absolute top-1.5 bottom-1.5 rounded-full bg-lima transition-[left,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ left: pill.left, width: pill.width }}
                aria-hidden="true"
              />
              {MODALITIES_LIST.map((item, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    role="tab"
                    id={`tab-${item.id}`}
                    aria-selected={active}
                    aria-controls="painel-modalidade"
                    tabIndex={active ? 0 : -1}
                    onClick={() => goTo(idx, { user: true })}
                    onKeyDown={onTabKeyDown}
                    className={`relative z-10 shrink-0 rounded-full px-3.5 sm:px-6 py-2.5 font-heading font-extrabold italic uppercase text-sm sm:text-lg leading-none whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                      active ? 'text-erva' : 'text-musgo hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          id="painel-modalidade"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Visor da foto */}
          <div className="lg:col-span-7" data-reveal="wipe" style={{ ['--d' as string]: 1 }}>
            <div
              className="visor relative aspect-[16/9] overflow-hidden rounded-lg bg-erva-2"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const delta = e.changedTouches[0].clientX - touchStartX.current;
                if (delta < -40) goTo(activeIndex + 1, { user: true });
                if (delta > 40) goTo(activeIndex - 1, { user: true });
              }}
            >
              <span className="canto-a" aria-hidden="true" />
              <span className="canto-b" aria-hidden="true" />

              {prev && (
                <img src={prev.imageSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
              )}
              <div key={current.id} className={`absolute inset-0 overflow-hidden ${prev ? `foto-entra-${direction}` : ''}`}>
                <img
                  src={current.imageSrc}
                  alt={current.alt}
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (!t.dataset.fallback) {
                      t.dataset.fallback = 'true';
                      t.src = '/images/bahcar_pop.jpg';
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              {prev && (
                <span
                  key={`linha-${current.id}`}
                  className={`linha-varredura-${direction} absolute top-0 bottom-0 w-[3px] -ml-[1.5px] bg-lima z-[2]`}
                  aria-hidden="true"
                />
              )}

              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-erva/80 to-transparent pointer-events-none" />

              {/* Progresso do avanço automático */}
              {autoplay && (
                <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-white/10 z-[3]" aria-hidden="true">
                  <div
                    key={`p-${activeIndex}`}
                    className={`progresso h-full bg-lima ${rodando ? '' : 'pausado'}`}
                    style={{ ['--duracao' as string]: `${DURACAO_MS}ms` }}
                    onAnimationEnd={() => goTo(activeIndex + 1)}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="kanit-num text-lg text-musgo" aria-live="polite">
                <span className="text-white">{activeIndex + 1}</span> de {total}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => goTo(activeIndex - 1, { user: true })}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-lima hover:text-erva hover:border-lima transition-colors cursor-pointer"
                  aria-label="Modalidade anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => goTo(activeIndex + 1, { user: true })}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-lima hover:text-erva hover:border-lima transition-colors cursor-pointer"
                  aria-label="Próxima modalidade"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Ficha da modalidade */}
          <div className="lg:col-span-5" data-reveal="up" style={{ ['--d' as string]: 3 }}>
            <div key={current.id}>
              <h3 className="nome-entra titulo-impacto text-[clamp(3rem,7vw,5.25rem)] leading-[0.9]">{current.name}</h3>

              <div className="dados-entram">
                <p style={{ ['--i' as string]: 0 }} className="mt-3 font-heading font-semibold italic text-xl sm:text-2xl text-lima">
                  {current.yearRule}
                </p>
                <p style={{ ['--i' as string]: 1 }} className="mt-5 text-lg text-white/85 leading-relaxed max-w-[32rem]">
                  {current.summary}
                </p>

                <ul style={{ ['--i' as string]: 2 }} className="mt-6 space-y-3">
                  {current.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-base sm:text-lg text-white">
                      <span className="w-7 h-7 rounded-md bg-lima text-erva inline-flex items-center justify-center shrink-0" aria-hidden="true">
                        <Check className="w-4 h-4" strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                {current.models && (
                  <div style={{ ['--i' as string]: 3 }} className="mt-8 pt-6 border-t border-white/15">
                    <h4 className="font-heading font-extrabold text-lg">Modelos pré-aprovados</h4>
                    <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {current.models.map((m, i) => (
                        <li
                          key={m}
                          style={{ ['--i' as string]: i }}
                          className="entra-modelo rounded-md border border-white/12 bg-white/[0.03] px-3 py-2.5 font-heading font-semibold italic uppercase text-sm text-white/90"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modalities;
