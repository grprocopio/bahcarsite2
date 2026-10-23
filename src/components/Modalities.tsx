import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

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

const TOTAL = MODALITIES_LIST.length;
// Pequena folga no começo e no fim para a primeira e a última categoria ficarem paradas um instante
const FOLGA = 0.06;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * Cada categoria fica parada por um trecho da rolagem e só então desliza para a próxima,
 * para a pessoa nunca ficar "no meio" de duas telas.
 */
const PAUSA = 0.32; // fração de cada trecho em que a tela fica parada (em cada ponta)
const comPausas = (r: number) => {
  const seg = Math.min(TOTAL - 2, Math.floor(r));
  const t = clamp((r - seg - PAUSA) / (1 - PAUSA * 2));
  const suave = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  return seg + suave;
};

/** Conteúdo de uma categoria: foto grande, nome gigante e ficha */
const Vitrine: React.FC<{ item: ModalityItem; deslocamento: number }> = ({ item, deslocamento }) => {
  // deslocamento: 0 quando a categoria está no centro; -1/+1 quando está uma tela para o lado
  const foto = { transform: `translateX(${deslocamento * -12}%) scale(1.12)` };
  const nome = { transform: `translateX(${deslocamento * 28}%)` };
  const opacidade = 1 - clamp(Math.abs(deslocamento) * 1.4);

  return (
    <div className="relative w-screen h-full shrink-0 overflow-hidden">
      {/* Foto: no celular ocupa a metade de cima; no computador, a tela toda */}
      <div className="absolute inset-x-0 top-0 h-[50%] lg:h-full overflow-hidden">
        <img
          src={item.imageSrc}
          alt={item.alt}
          className="w-full h-full object-cover will-change-transform"
          style={foto}
          loading="lazy"
          onError={(e) => {
            const t = e.currentTarget;
            if (!t.dataset.fallback) {
              t.dataset.fallback = 'true';
              t.src = '/images/bahcar_pop.jpg';
            }
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-erva to-transparent lg:hidden" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-erva/90 via-erva/45 to-transparent" />
        <div className="hidden lg:block absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-erva to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-28 sm:pb-32 lg:pb-36">
        <h3
          className="titulo-impacto text-[clamp(2.9rem,9.5vw,8.5rem)] leading-[0.88] will-change-transform"
          style={nome}
        >
          {item.name}
        </h3>

        <div style={{ opacity: opacidade }} className="mt-4 lg:mt-6 max-w-2xl">
          <p className="font-heading font-semibold italic text-xl sm:text-2xl text-lima">{item.yearRule}</p>
          <p className="mt-3 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">{item.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
            {item.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-base text-white">
                <span className="w-6 h-6 rounded-md bg-lima text-erva inline-flex items-center justify-center shrink-0" aria-hidden="true">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>

          {item.models && (
            <p className="mt-5 text-sm sm:text-base text-musgo leading-relaxed">
              <span className="font-semibold text-white">Modelos pré-aprovados: </span>
              {item.models.join(', ')}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const Modalities: React.FC = () => {
  const secaoRef = useRef<HTMLElement>(null);
  const [posicao, setPosicao] = useState(0); // 0 … TOTAL-1, contínuo
  const [reduz, setReduz] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduz(true);
      return;
    }
    const secao = secaoRef.current;
    if (!secao) return;
    let ticking = false;
    const atualiza = () => {
      ticking = false;
      const r = secao.getBoundingClientRect();
      const percurso = secao.offsetHeight - window.innerHeight;
      const p = percurso > 0 ? clamp(-r.top / percurso) : 0;
      setPosicao(comPausas(clamp((p - FOLGA) / (1 - FOLGA * 2)) * (TOTAL - 1)));
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

  const ativa = Math.round(posicao);

  // Leva a rolagem até a categoria escolhida
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
          <div key={item.id} className="h-[100svh] min-h-[640px]">
            <Vitrine item={item} deslocamento={0} />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section ref={secaoRef} id="modalidades" className="relative w-full bg-erva text-white" style={{ height: `${TOTAL * 110}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Trilho horizontal com as 4 categorias */}
        <div
          className="flex h-full will-change-transform"
          style={{ transform: `translateX(${-posicao * 100}vw)` }}
        >
          {MODALITIES_LIST.map((item, i) => (
            <Vitrine key={item.id} item={item} deslocamento={i - posicao} />
          ))}
        </div>

        {/* Título da seção, fixo no canto */}
        <div className="absolute top-0 inset-x-0 pointer-events-none">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28">
            <h2 className="titulo text-2xl sm:text-3xl text-white/90 lg:block hidden">Modalidades</h2>
          </div>
        </div>

        {/* Navegação: nomes das categorias + barra de progresso */}
        <div className="absolute bottom-0 inset-x-0">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-7 sm:pb-9">
            <div className="h-[3px] bg-white/15 rounded-full overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-lima origin-left"
                style={{ transform: `scaleX(${(posicao + 1) / TOTAL})`, transition: 'transform 120ms linear' }}
              />
            </div>
            <nav aria-label="Ir para a modalidade" className="mt-3 flex justify-between gap-2">
              {MODALITIES_LIST.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => irPara(i)}
                  aria-current={i === ativa ? 'true' : undefined}
                  className={`font-heading font-extrabold italic uppercase text-xs sm:text-base whitespace-nowrap transition-colors cursor-pointer ${
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
