import React from 'react';

interface FinalCtaProps {
  onOpenLaunch: () => void;
  onOpenPartner: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenLaunch, onOpenPartner }) => {
  return (
    <section id="final-cta" className="relative w-full bg-papel text-erva">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 grid lg:grid-cols-12 gap-10 lg:gap-12 lg:items-end">
        <h2 className="lg:col-span-7 titulo titulo-largo text-[clamp(2.4rem,6.5vw,5.25rem)]">
          Santa Maria vai se mover diferente.
        </h2>

        <div className="lg:col-span-5">
          <p className="text-lg text-pedra leading-relaxed max-w-[30rem]">
            Um app local, feito para valorizar de verdade quem dirige e oferecer aos passageiros a resposta mais rápida e
            segura de Santa Maria.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenPartner}
              className="rounded-full bg-erva text-lima px-7 py-3.5 text-base font-semibold hover:bg-erva-2 transition-colors cursor-pointer"
            >
              Quero ser motorista
            </button>
            <button
              onClick={onOpenLaunch}
              className="rounded-full border border-erva/30 text-erva px-7 py-3.5 text-base font-semibold hover:bg-erva/5 transition-colors cursor-pointer"
            >
              Quero ser passageiro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
