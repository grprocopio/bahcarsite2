import React from 'react';
import { Modal, ModalButton } from './Modal';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="O aplicativo será lançado em breve"
    footer={<ModalButton onClick={onClose}>Entendido</ModalButton>}
  >
    <p>
      O aplicativo da <strong className="text-erva font-semibold">BahCar</strong> para motoristas parceiros está em fase
      final de preparação em Santa Maria. Em breve o credenciamento e o download estarão liberados oficialmente.
    </p>
    <p className="mt-4 text-erva font-medium">Disponível em breve para Android e iOS.</p>
  </Modal>
);

export default PartnerModal;
