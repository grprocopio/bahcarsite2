import React from 'react';

interface HeroProps {
  onOpenPartner?: () => void;
  onOpenLaunch?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPartner, onOpenLaunch }) => {
  return (
    <section id="hero" className="relative w-full bg-erva overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-40">
        <div className="hero-texto">
          <h1 className="titulo titulo-largo text-[clamp(2.4rem,10vw,5.5rem)] text-white">
            Pessoas movem a cidade.
            <br />
            A Bah conecta.
          </h1>

          <p className="mt-5 sm:mt-6 max-w-[34rem] text-base sm:text-lg text-musgo leading-relaxed">
            O aplicativo de mobilidade feito em Santa Maria, para quem dirige e para quem pede a corrida.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenPartner}
              className="rounded-full bg-lima text-erva px-7 py-3.5 text-base font-semibold hover:bg-lima-escuro transition-colors cursor-pointer"
            >
              Quero ser motorista
            </button>
            <button
              onClick={onOpenLaunch}
              className="rounded-full border border-white/30 text-white px-7 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              Quero ser passageiro
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: recorte da foto vertical mostrando cuia, celular e carro */}
      <div className="lg:hidden relative -mt-10 aspect-[4/5] hero-foto" aria-hidden="true">
        <img
          src="/hero-mobile.jpg?v=4"
          alt=""
          className="w-full h-full object-cover object-[50%_82%]"
          loading="eager"
        />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-erva to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-erva to-transparent" />
      </div>

      {/* Desktop: a foto aparece inteira — cuia, celular e carro — logo abaixo do texto */}
      <div className="hidden lg:block relative -mt-[12vw] hero-foto">
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
