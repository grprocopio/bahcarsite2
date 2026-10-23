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
      className={`indicador-rolagem fixed left-1/2 -translate-x-1/2 bottom-5 sm:bottom-7 z-40 flex items-center gap-2.5 text-sm text-white/80 pointer-events-none ${
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
    <section id="hero" className="relative w-full bg-erva overflow-hidden flex flex-col min-h-[100svh] lg:block lg:min-h-0">
      <IndicadorRolagem />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 lg:pt-44">
        <h1
          data-reveal="linhas"
          style={{ ['--d' as string]: 2 }}
          className="titulo-impacto text-[clamp(2.5rem,10vw,7rem)] text-white"
        >
          {LINHAS.map((linha, i) => (
            <span key={i} className="linha">
              <span style={{ ['--i' as string]: i }}>{linha}</span>
            </span>
          ))}
        </h1>
      </div>

      {/* Mobile: recorte da foto vertical mostrando cuia, celular e carro */}
      <div className="lg:hidden relative -mt-6 flex-1 min-h-[110vw] hero-foto" aria-hidden="true">
        <img src="/hero-mobile-1080.webp" alt="" width={1080} height={2340} decoding="async" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-[50%_82%]" loading="eager" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-erva to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-erva to-transparent" />
      </div>

      {/* Desktop: a foto aparece inteira — cuia, celular e carro — logo abaixo do título */}
      <div className="hidden lg:block relative -mt-[14vw] hero-foto">
        <img
          src="/carromate-1920.webp"
          srcSet="/carromate-1920.webp 1920w, /carromate-2752.webp 2752w"
          sizes="100vw"
          width={1920}
          height={1072}
          decoding="async"
          fetchPriority="high"
          alt="Cuia de chimarrão, celular com o app da BahCar e um carro com os faróis acesos à noite"
          className="w-full h-auto block"
          loading="eager"
        />
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-erva to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-erva to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
