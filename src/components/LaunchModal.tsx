import React from 'react';
import { Modal, ModalButton } from './Modal';

interface LaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaunchModal: React.FC<LaunchModalProps> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="O aplicativo será lançado em breve"
    footer={<ModalButton onClick={onClose}>Entendido</ModalButton>}
  >
    <p>
      O aplicativo de viagens da <strong className="text-erva font-semibold">BahCar</strong> está em fase final de
      preparação em Santa Maria. Em breve você poderá solicitar corridas com agilidade, carros modernos e preço justo.
    </p>
    <p className="mt-4 text-erva font-medium">Disponível em breve para Android e iOS.</p>
  </Modal>
);

export default LaunchModal;
