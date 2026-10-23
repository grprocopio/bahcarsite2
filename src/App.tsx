import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ManifestoSection } from './components/ManifestoSection';
import { ComissaoMotorista } from './components/ComissaoMotorista';
import { Modalities } from './components/Modalities';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PartnerModal } from './components/PartnerModal';
import { LaunchModal } from './components/LaunchModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ContactModal } from './components/ContactModal';
import { useRevealOnScroll } from './hooks/useReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';

export default function App() {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useRevealOnScroll();
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-erva text-white relative">
      {/* Navbar Oficial */}
      <Navbar onOpenPartner={() => setPartnerModalOpen(true)} />

      <main className="relative z-10">
        {/* Hero Oficial com vídeo e canplaythrough */}
        <Hero
          onOpenPartner={() => setPartnerModalOpen(true)}
          onOpenLaunch={() => setLaunchModalOpen(true)}
        />

        {/* Frase Manifesto no estilo de título (depois do vídeo e antes da taxa) */}
        <ManifestoSection />

        {/* Comissão Clara: 16% Taxa Fixa */}
        <ComissaoMotorista
          onOpenPartner={() => setPartnerModalOpen(true)}
        />

        {/* Modalidades Oficiais: POP, PLUS, CONFORT SEDAN e BLACK */}
        <Modalities />

        {/* Chamada Final */}
        <FinalCta
          onOpenLaunch={() => setLaunchModalOpen(true)}
          onOpenPartner={() => setPartnerModalOpen(true)}
        />
      </main>

      {/* Rodapé Oficial */}
      <Footer
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Modais */}
      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      <LaunchModal
        isOpen={launchModalOpen}
        onClose={() => setLaunchModalOpen(false)}
      />

      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
