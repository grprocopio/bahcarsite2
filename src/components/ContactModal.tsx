import React from 'react';
import { Modal, ModalButton } from './Modal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const canais = [
  { rotulo: 'WhatsApp', valor: '(55) 99108-2555', href: 'https://wa.me/5555991082555', externo: true },
  { rotulo: 'Instagram', valor: '@bahcarsm', href: 'https://www.instagram.com/bahcarsm/', externo: true },
  { rotulo: 'E-mail', valor: 'contato@bahcar.com.br', href: 'mailto:contato@bahcar.com.br', externo: false },
];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Fale com a BahCar"
    footer={<ModalButton onClick={onClose}>Fechar</ModalButton>}
  >
    <p>Atendimento local em Santa Maria/RS.</p>
    <dl className="mt-5 divide-y divide-erva/15 border-y border-erva/15">
      {canais.map((c) => (
        <div key={c.rotulo} className="flex items-baseline justify-between gap-4 py-3">
          <dt>{c.rotulo}</dt>
          <dd>
            <a
              href={c.href}
              {...(c.externo ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="font-semibold text-erva underline decoration-erva/30 underline-offset-4 hover:decoration-erva"
            >
              {c.valor}
            </a>
          </dd>
        </div>
      ))}
    </dl>
    <p className="mt-4 text-sm">BahCar Mobilidade Urbana Ltda., Santa Maria, Rio Grande do Sul.</p>
  </Modal>
);

export default ContactModal;
