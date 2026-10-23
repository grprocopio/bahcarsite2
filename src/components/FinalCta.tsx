import React from 'react';

interface FinalCtaProps {
  onOpenLaunch: () => void;
  onOpenPartner: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenLaunch, onOpenPartner }) => {
  return (
    <section id="final-cta" className="relative w-full bg-erva text-white overflow-hidden border-t border-white/10">
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 py-24 sm:py-32 lg:py-40 text-center flex flex-col items-center">
        <h2 data-reveal="linhas" className="titulo-impacto text-[clamp(2.5rem,8vw,6rem)] leading-[0.98]">
          <span className="linha">
            <span style={{ ['--i' as string]: 0 }}>Santa Maria vai</span>
          </span>
          <span className="linha text-lima drop-shadow-[0_0_30px_rgba(174,232,39,0.25)]">
            <span style={{ ['--i' as string]: 1 }}>se mover diferente.</span>
          </span>
        </h2>

        <p
          data-reveal="up"
          style={{ ['--d' as string]: 3 }}
          className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl mx-auto"
        >
          Um ecossistema local feito para valorizar de verdade quem dirige e oferecer aos passageiros a resposta mais
          rápida e segura de Santa Maria.
        </p>

        <div data-reveal="cascata" className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenPartner}
            style={{ ['--i' as string]: 4 }}
            className="w-full sm:w-auto px-9 py-4 font-heading font-extrabold italic uppercase tracking-wide text-base text-erva bg-lima hover:bg-lima-escuro rounded-2xl transition-[background-color,transform] duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            Quero ser motorista
          </button>
          <button
            onClick={onOpenLaunch}
            style={{ ['--i' as string]: 5 }}
            className="w-full sm:w-auto px-9 py-4 font-heading font-extrabold italic uppercase tracking-wide text-base text-white border border-white/25 hover:border-lima hover:text-lima rounded-2xl transition-[color,border-color,transform] duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            Quero ser passageiro
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
