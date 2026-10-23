import React, { useEffect, useState } from 'react';

interface HeroProps {
  onOpenPartner?: () => void;
  onOpenLaunch?: () => void;
}

const LINHAS: React.ReactNode[] = [
  'Pessoas movem',
  'a cidade.',
  <>
    A Bah <span className="texto-contorno">conecta.</span>
  </>,
];

/** Dica discreta de que a página continua; some assim que a pessoa começa a rolar */
const IndicadorRolagem: React.FC = () => {
  const [visivel, setVisivel] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisivel(window.scrollY < 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className={`indicador-rolagem hidden lg:flex fixed left-1/2 -translate-x-1/2 bottom-7 z-40 items-center gap-2.5 text-sm text-white/80 pointer-events-none ${
        visivel ? '' : 'escondido'
      }`}
      aria-hidden="true"
    >
      <span className="trilha relative block w-[22px] h-[34px] rounded-full border-2 border-white/40 overflow-hidden" />
      <span className="font-heading font-semibold italic uppercase tracking-wide">Role</span>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="hero" className="relative w-full bg-erva overflow-hidden lg:min-h-[100svh]">
      <IndicadorRolagem />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-28">
        <h1
          data-reveal="linhas"
          style={{ ['--d' as string]: 2 }}
          className="titulo-impacto text-[clamp(2.5rem,10vw,7rem)] lg:text-[clamp(3.6rem,5.6vw,6.25rem)] text-white"
        >
          {LINHAS.map((linha, i) => (
            <span key={i} className="linha">
              <span style={{ ['--i' as string]: i }}>{linha}</span>
            </span>
          ))}
        </h1>
      </div>

      {/* Celular e tablet: a cena inteira (cuia, celular e carro) em formato horizontal, sem recorte forçado */}
      <div className="lg:hidden relative mt-6 sm:mt-8 hero-foto">
        <img
          src="/hero-rua-mobile.webp"
          alt="Cuia de chimarrão e celular com o app da BahCar sobre um carro, numa rua de paralelepípedo ao anoitecer, com um Onix estacionado"
          width={1440}
          height={960}
          decoding="async"
          fetchPriority="high"
          className="block w-full h-auto"
          loading="eager"
        />
        <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-erva to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-erva to-transparent" aria-hidden="true" />
      </div>

      {/* Desktop: a foto ocupa a tela inteira; o título fica sobre o céu */}
      <div className="hidden lg:block absolute inset-x-0 bottom-0 top-[24%] hero-foto">
        <img
          src="/hero-rua-1920.webp"
          srcSet="/hero-rua-1920.webp 1920w, /hero-rua-2912.webp 2912w"
          sizes="100vw"
          width={2912}
          height={1640}
          decoding="async"
          fetchPriority="high"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          loading="eager"
        />
        <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-erva to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-erva to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
