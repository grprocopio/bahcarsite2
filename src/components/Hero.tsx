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
    <section id="hero" className="relative w-full bg-erva overflow-hidden min-h-[100svh] flex flex-col">
      <IndicadorRolagem />
      {/* Faixa do título: fica acima da foto para não cobrir os rostos */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-28 pb-6 lg:pb-8">
        <h1
          data-reveal="linhas"
          style={{ ['--d' as string]: 2 }}
          className="titulo-impacto text-[clamp(2.5rem,10vw,7rem)] lg:text-[clamp(3.4rem,5.2vw,6rem)] text-white"
        >
          {LINHAS.map((linha, i) => (
            <span key={i} className="linha">
              <span style={{ ['--i' as string]: i }}>{linha}</span>
            </span>
          ))}
        </h1>
      </div>

      {/* Foto da equipe: preenche o resto da primeira tela, enquadrada nas pessoas */}
      <div className="relative flex-1 min-h-[52vw] hero-foto">
        <img
          src="/hero-equipe-1672.webp"
          srcSet="/hero-equipe-1200.webp 1200w, /hero-equipe-1672.webp 1672w"
          sizes="100vw"
          alt="Equipe da BahCar com camisetas verdes da marca, num bosque de pinheiros"
          width={1672}
          height={941}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[50%_78%]"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default Hero;
