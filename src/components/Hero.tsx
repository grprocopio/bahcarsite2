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
    <section id="hero" className="relative w-full bg-erva overflow-hidden min-h-[100svh]">
      {/* Foto da equipe em tela cheia, com uma camada preta por cima que baixa a exposição */}
      <div className="absolute inset-0 hero-foto">
        <img
          src="/hero-equipe-1600.webp"
          srcSet="/hero-equipe-1000.webp 1000w, /hero-equipe-1600.webp 1600w, /hero-equipe-2400.webp 2400w"
          sizes="(min-width: 1024px) 100vw, 400vw"
          alt="Equipe da BahCar com camisetas verdes da marca, num bosque de pinheiros"
          width={2400}
          height={1340}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center origin-top scale-[1.15]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      </div>

      <IndicadorRolagem />
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-10 xl:px-14 pt-24 sm:pt-28 lg:pt-24">
        <h1
          data-reveal="linhas"
          style={{ ['--d' as string]: 2 }}
          className="titulo-impacto hero-titulo text-[clamp(2.5rem,10.2vw,7rem)] lg:text-[clamp(4rem,5.5vw,6.5rem)] text-white"
        >
          {LINHAS.map((linha, i) => (
            <span key={i} className="linha">
              <span style={{ ['--i' as string]: i }}>{linha}</span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
