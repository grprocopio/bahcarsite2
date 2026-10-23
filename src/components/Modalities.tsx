import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export const Modalities: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef(0);

  const current = MODALITIES_LIST[activeIndex];
  const total = MODALITIES_LIST.length;

  const select = (index: number, focus = false) => {
    const next = (index + total) % total;
    if (next === activeIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveIndex(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); select(activeIndex + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(activeIndex - 1, true); }
    if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    if (e.key === 'End') { e.preventDefault(); select(total - 1, true); }
  };

  return (
    <section id="modalidades" className="relative w-full bg-erva text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2 className="titulo titulo-largo text-[clamp(2.2rem,5.5vw,4.25rem)]">Modalidades</h2>

          <div
            role="tablist"
            aria-label="Modalidades BahCar"
            className="flex gap-6 sm:gap-8 overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0 border-b border-white/15"
          >
            {MODALITIES_LIST.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(el) => { tabRefs.current[idx] = el; }}
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={active}
                  aria-controls="painel-modalidade"
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(idx)}
                  onKeyDown={onTabKeyDown}
                  className={`relative shrink-0 pb-3 text-base sm:text-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active ? 'text-white' : 'text-musgo hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 right-0 -bottom-px h-[3px] rounded-full transition-colors ${
                      active ? 'bg-lima' : 'bg-transparent'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="painel-modalidade"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          <div
            className="lg:col-span-7 relative"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (delta < -40) select(activeIndex + 1);
              if (delta > 40) select(activeIndex - 1);
            }}
          >
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-erva-2">
              <img
                key={current.id}
                src={current.imageSrc}
                alt={current.alt}
                onError={(e) => {
                  const t = e.currentTarget;
                  if (!t.dataset.fallback) {
                    t.dataset.fallback = 'true';
                    t.src = '/images/bahcar_pop.jpg';
                  }
                }}
                className="modalidade-entra w-full h-full object-cover"
                style={{ ['--desloca' as string]: `${direction * 16}px` }}
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-musgo">
              <span className="numeros">
                {activeIndex + 1} de {total}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => select(activeIndex - 1)}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Modalidade anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => select(activeIndex + 1)}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Próxima modalidade"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div key={current.id} className="lg:col-span-5 modalidade-entra" style={{ ['--desloca' as string]: '0px' }}>
            <h3 className="titulo text-[clamp(2rem,4vw,3rem)]">{current.name}</h3>
            <p className="mt-1 text-lg text-lima font-medium">{current.yearRule}</p>
            <p className="mt-5 text-lg text-white/85 leading-relaxed max-w-[32rem]">{current.summary}</p>

            <ul className="mt-6 space-y-2.5">
              {current.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-base text-white/90">
                  <span className="w-2 h-2 rounded-full bg-lima shrink-0" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            {current.models && (
              <div className="mt-8 pt-6 border-t border-white/15">
                <h4 className="text-base font-semibold text-white">Modelos pré-aprovados</h4>
                <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-base text-musgo">
                  {current.models.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modalities;
