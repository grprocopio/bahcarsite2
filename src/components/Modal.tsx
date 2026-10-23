import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}

/** Janela modal compartilhada: fecha com Esc e clique fora, prende a rolagem e devolve o foco. */
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, wide }) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 bg-erva/80 animate-fadeIn" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${wide ? 'sm:max-w-xl' : 'sm:max-w-md'} max-h-[90svh] overflow-y-auto bg-papel text-erva rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 outline-none`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 inline-flex items-center justify-center rounded-full text-pedra hover:bg-erva/5 hover:text-erva transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 id={titleId} className="titulo text-2xl sm:text-[1.75rem] pr-12">
          {title}
        </h3>

        <div className="mt-4 text-base text-pedra leading-relaxed">{children}</div>

        {footer && <div className="mt-8">{footer}</div>}
      </div>
    </div>
  );
};

export const ModalButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="w-full rounded-full bg-erva text-lima px-6 py-3.5 text-base font-semibold hover:bg-erva-2 transition-colors cursor-pointer"
  >
    {children}
  </button>
);

export default Modal;
