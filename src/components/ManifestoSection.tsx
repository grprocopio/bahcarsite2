import React from 'react';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="relative w-full bg-papel text-erva">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <p data-reveal="left" className="titulo text-[clamp(1.9rem,4.4vw,3.75rem)] leading-[1.08] max-w-[24ch] lg:ml-[16.66%]">
          A plataforma gaúcha de mobilidade urbana que conecta motoristas e passageiros com transparência, tecnologia e
          respeito à nossa cidade.
        </p>
      </div>
    </section>
  );
};

export default ManifestoSection;
