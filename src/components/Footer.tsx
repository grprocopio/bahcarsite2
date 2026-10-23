import React from 'react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

const linkClass = 'text-white/85 hover:text-lima transition-colors underline-offset-4 hover:underline';

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenContact }) => (
  <footer className="relative w-full bg-erva text-white border-t border-white/10">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div>
          <img src="/bahcar-logo-white.png?v=2" alt="BahCar" className="h-12 w-auto" />
          <p className="mt-3 text-musgo">Santa Maria, Rio Grande do Sul</p>
        </div>

        <nav aria-label="Contato e informações" className="grid grid-cols-2 gap-x-12 gap-y-3 text-base">
          <a href="https://www.instagram.com/bahcarsm/" target="_blank" rel="noreferrer" className={linkClass}>
            Instagram
          </a>
          <a href="https://wa.me/5555991082555" target="_blank" rel="noreferrer" className={linkClass}>
            WhatsApp
          </a>
          <a href="mailto:contato@bahcar.com.br" className={linkClass}>
            contato@bahcar.com.br
          </a>
          <button onClick={onOpenContact} className={`${linkClass} text-left cursor-pointer`}>
            Fale com a gente
          </button>
          <button onClick={onOpenPrivacy} className={`${linkClass} text-left cursor-pointer`}>
            Privacidade
          </button>
        </nav>
      </div>

      <p className="mt-12 pt-6 border-t border-white/10 text-sm text-musgo">
        © {new Date().getFullYear()} BahCar Mobilidade Urbana Ltda. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
