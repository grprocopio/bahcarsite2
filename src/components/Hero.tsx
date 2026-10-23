import React from 'react';

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

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="hero" className="relative w-full bg-erva overflow-hidden">
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
      <div className="lg:hidden relative -mt-6 aspect-[4/5] hero-foto" aria-hidden="true">
        <img src="/hero-mobile.jpg?v=4" alt="" className="w-full h-full object-cover object-[50%_82%]" loading="eager" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-erva to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-erva to-transparent" />
      </div>

      {/* Desktop: a foto aparece inteira — cuia, celular e carro — logo abaixo do título */}
      <div className="hidden lg:block relative -mt-[14vw] hero-foto">
        <img
          src="/carromate.jpg"
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
