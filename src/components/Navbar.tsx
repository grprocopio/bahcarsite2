import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenPartner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPartner }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const check = () => {
      setIsScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,padding] duration-300 border-b ${
        isScrolled ? 'py-2.5 bg-erva/95 backdrop-blur-sm border-white/10' : 'py-4 sm:py-5 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <a href="#" onClick={scrollToTop} className="flex items-center gap-3" aria-label="BahCar, voltar ao início">
          <img
            src="/bahcar-logo-white.png?v=2"
            alt=""
            className={`w-auto transition-[height] duration-300 ${isScrolled ? 'h-8 sm:h-9' : 'h-10 sm:h-12'}`}
          />
          <span className="hidden md:block text-sm text-musgo leading-tight max-w-[9rem]">
            Mobilidade urbana de Santa Maria
          </span>
        </a>

        <button
          onClick={onOpenPartner}
          className="shrink-0 rounded-full bg-lima text-erva px-4 sm:px-5 py-2.5 text-sm sm:text-[0.95rem] font-semibold hover:bg-lima-escuro transition-colors cursor-pointer"
        >
          Quero ser motorista
        </button>
      </div>
    </header>
  );
};

export default Navbar;
