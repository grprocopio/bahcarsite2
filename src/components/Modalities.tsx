import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

interface ModalityItem {
  id: 'pop' | 'plus' | 'confort' | 'black';
  name: string;
  yearRule: string;
  summary: string;
  highlights: string[];
  image: string; // prefixo das versões .webp em /images
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
    image: 'pop',
    alt: 'Carro da categoria POP em uma rua à noite',
  },
  {
    id: 'plus',
    name: 'PLUS',
    yearRule: 'Hatch e elétrico, 2023 em diante',
    summary: 'Veículos hatch e elétricos modernos, confortáveis e eficientes.',
    highlights: ['Hatch e elétrico', 'Ano 2023 em diante'],
    image: 'plus',
    alt: 'Carro da categoria PLUS',
  },
  {
    id: 'confort',
    name: 'CONFORT SEDAN',
    yearRule: 'Sedãs 2019 em diante',
    summary: 'Porta-malas espaçoso e conforto extra para viagens, compras e famílias.',
    highlights: ['Sedãs a partir de 2019', 'Porta-malas amplo'],
    image: 'confort',
    alt: 'Sedã da categoria CONFORT SEDAN',
    models: ['Onix Plus', 'Versa', 'Virtus', 'Cronos', 'Yaris Sedan', 'HB20S', 'Kicks', 'Duster', 'Peugeot 2008'],
  },
  {
    id: 'black',
    name: 'BLACK',
    yearRule: 'Modelos homologados',
    summary: 'Padrão executivo premium com os motoristas parceiros mais bem avaliados.',
    highlights: ['Modelos homologados', 'Motoristas mais bem avaliados'],
    image: 'black',
    alt: 'Sedã preto da categoria BLACK em uma avenida molhada',
    models: ['Corolla', 'Creta', 'Tracker', 'Sentra 25/26', 'Duster 24/25/26', 'Cerato', 'Jetta', 'Kicks'],
  },
];

const TOTAL = MODALITIES_LIST.length;
const FOLGA = 0.05; // pausa extra no começo e no fim da seção
const PAUSA = 0.3; // fração de cada trecho em que a tela fica parada (em cada ponta)

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Cada categoria fica parada um trecho da rolagem e só então desliza para a próxima */
const comPausas = (r: number) => {
  const seg = Math.min(TOTAL - 2, Math.floor(r));
  return seg + suave(clamp((r - seg - PAUSA) / (1 - PAUSA * 2)));
};

interface VitrineProps {
  item: ModalityItem;
  fotoRef?: (el: HTMLImageElement | null) => void;
  textoRef?: (el: HTMLDivElement | null) => void;
}

/** Uma categoria: texto numa coluna limpa, foto ao lado (nada sobreposto ao carro) */
const Vitrine: React.FC<VitrineProps> = ({ item, fotoRef, textoRef }) => (
  <div className="relative w-screen h-full shrink-0">
    <div className="h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-40 sm:pt-48 lg:pt-40 pb-24 sm:pb-28 flex flex-col justify-center lg:grid lg:grid-cols-12 lg:items-center gap-5 sm:gap-8 lg:gap-14">
      {/* Foto: em cima no celular, à direita no computador */}
      <div className="lg:order-2 lg:col-span-7 shrink-0">
        <div className="relative h-[clamp(120px,25svh,250px)] lg:h-auto lg:aspect-[16/10] overflow-hidden rounded-xl bg-erva-2">
          <img
            ref={fotoRef}
            src={`/images/${item.image}-1376.webp`}
            srcSet={`/images/${item.image}-760.webp 760w, /images/${item.image}-1376.webp 1376w`}
            sizes="(min-width: 1024px) 58vw, 100vw"
            alt={item.alt}
            width={1376}
            height={768}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.14)' }}
          />
        </div>
      </div>

      {/* Ficha */}
      <div ref={textoRef} className="lg:order-1 lg:col-span-5 min-w-0">
        <h3 className="titulo-impacto text-[clamp(2.4rem,9vw,3.4rem)] lg:text-[clamp(3.2rem,5.2vw,5.25rem)] leading-[0.9]">
          {item.name}
        </h3>
        <p className="mt-3 font-heading font-semibold italic text-lg sm:text-2xl text-lima">{item.yearRule}</p>
        <p className="mt-3 sm:mt-4 text-[0.95rem] sm:text-lg text-white/80 leading-relaxed max-w-md [@media(max-height:720px)_and_(max-width:1023px)]:hidden">{item.summary}</p>

        <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
          {item.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-[0.95rem] sm:text-base text-white">
              <span className="w-6 h-6 rounded-md bg-lima text-erva inline-flex items-center justify-center shrink-0" aria-hidden="true">
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        {item.models && (
          <p className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10 text-sm text-musgo leading-relaxed max-w-md">
            <span className="font-semibold text-white">Modelos pré-aprovados: </span>
            {item.models.join(', ')}.
          </p>
        )}
      </div>
    </div>
  </div>
);

export const Modalities: React.FC = () => {
  const secaoRef = useRef<HTMLElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);
  const fotos = useRef<(HTMLImageElement | null)[]>([]);
  const textos = useRef<(HTMLDivElement | null)[]>([]);
  const [ativa, setAtiva] = useState(0);
  const ativaRef = useRef(0);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const [reduz, setReduz] = useState(false);

  // A animação escreve direto no estilo dos elementos (sem re-renderizar o React a cada quadro)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduz(true);
      return;
    }
    const secao = secaoRef.current;
    if (!secao) return;

    let ticking = false;
    let ultimaAtiva = -1;

    const atualiza = () => {
      ticking = false;
      const r = secao.getBoundingClientRect();
      const percurso = secao.offsetHeight - window.innerHeight;
      const p = percurso > 0 ? clamp(-r.top / percurso) : 0;
      const pos = comPausas(clamp((p - FOLGA) / (1 - FOLGA * 2)) * (TOTAL - 1));

      if (trilhoRef.current) trilhoRef.current.style.transform = `translate3d(${-pos * 100}vw,0,0)`;
      if (barraRef.current) barraRef.current.style.transform = `scaleX(${(pos + 1) / TOTAL})`;

      for (let i = 0; i < TOTAL; i++) {
        const d = i - pos; // 0 = no centro; ±1 = uma tela para o lado
        if (Math.abs(d) > 1.2) continue;
        const foto = fotos.current[i];
        const texto = textos.current[i];
        if (foto) foto.style.transform = `translate3d(${d * -9}%,0,0) scale(1.14)`;
        if (texto) {
          texto.style.opacity = String(1 - clamp(Math.abs(d) * 1.6));
          texto.style.transform = `translate3d(${d * 60}px,0,0)`;
        }
      }

      const nova = Math.round(pos);
      if (nova !== ultimaAtiva) {
        ultimaAtiva = nova;
        ativaRef.current = nova;
        setAtiva(nova);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(atualiza);
      }
    };
    atualiza();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Leva a rolagem até a categoria escolhida (meio da pausa dela)
  const irPara = (i: number) => {
    const secao = secaoRef.current;
    if (!secao) return;
    const percurso = secao.offsetHeight - window.innerHeight;
    const p = FOLGA + (i / (TOTAL - 1)) * (1 - FOLGA * 2);
    window.scrollTo({ top: secao.offsetTop + p * percurso, behavior: 'smooth' });
  };

  // Sem animação: as categorias aparecem uma embaixo da outra
  if (reduz) {
    return (
      <section id="modalidades" className="relative w-full bg-erva text-white">
        <h2 className="titulo text-[clamp(2.6rem,6.5vw,5rem)] max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24">Modalidades</h2>
        {MODALITIES_LIST.map((item) => (
          <div key={item.id} className="min-h-[100svh] flex">
            <Vitrine item={item} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={secaoRef} id="modalidades" className="relative w-full bg-erva text-white" style={{ height: `${TOTAL * 110}vh` }}>
      <div
        className="sticky top-0 h-[100svh] overflow-hidden"
        // Arrastar para o lado troca de modalidade (celular e tablet)
        onTouchStart={(e) => {
          const t = e.touches[0];
          toque.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          const inicio = toque.current;
          toque.current = null;
          if (!inicio) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - inicio.x;
          const dy = t.clientY - inicio.y;
          if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
          const proxima = Math.min(TOTAL - 1, Math.max(0, ativaRef.current + (dx < 0 ? 1 : -1)));
          if (proxima !== ativaRef.current) irPara(proxima);
        }}
      >
        {/* Título fixo da seção: fica parado enquanto as categorias passam */}
        <div className="absolute top-0 inset-x-0 z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-[4.75rem] sm:pt-24">
            <h2 data-reveal="linhas" className="titulo text-white text-[clamp(2.6rem,11vw,3.4rem)] lg:text-[clamp(3.6rem,6vw,5.75rem)]" style={{ fontWeight: 900 }}>
              <span className="linha">
                <span>Modalidades</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Trilho horizontal com as 4 categorias */}
        <div ref={trilhoRef} className="flex h-full will-change-transform">
          {MODALITIES_LIST.map((item, i) => (
            <Vitrine
              key={item.id}
              item={item}
              fotoRef={(el) => {
                fotos.current[i] = el;
              }}
              textoRef={(el) => {
                textos.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* Navegação: nomes das categorias + barra de progresso */}
        <div className="absolute bottom-0 inset-x-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-6 sm:pb-8">
            <div className="h-[3px] bg-white/15 rounded-full overflow-hidden" aria-hidden="true">
              <div ref={barraRef} className="h-full bg-lima origin-left will-change-transform" style={{ transform: `scaleX(${1 / TOTAL})` }} />
            </div>
            <nav aria-label="Ir para a modalidade" className="mt-3 flex justify-between gap-2">
              {MODALITIES_LIST.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => irPara(i)}
                  aria-current={i === ativa ? 'true' : undefined}
                  className={`font-heading font-extrabold italic uppercase text-xs sm:text-base whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                    i === ativa ? 'text-lima' : 'text-white/45 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modalities;
