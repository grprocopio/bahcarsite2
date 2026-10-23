import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenPartner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
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
        isScrolled ? 'py-2.5 bg-erva/95 backdrop-blur-sm border-white/10' : 'py-5 sm:py-6 bg-transparent border-transparent'
      }`}
    >
      <div className="flex justify-center px-5">
        <a href="#" onClick={scrollToTop} aria-label="BahCar, voltar ao início" className="block">
          <img
            src="/bahcar-logo-white.png?v=2"
            alt=""
            className={`w-auto transition-[height] duration-300 ${isScrolled ? 'h-9 sm:h-10' : 'h-12 sm:h-14'}`}
          />
        </a>
      </div>
    </header>
  );
};

export default Navbar;
