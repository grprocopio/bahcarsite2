import React from 'react';
import { Modal, ModalButton } from './Modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Privacidade e segurança"
    wide
    footer={<ModalButton onClick={onClose}>Entendido</ModalButton>}
  >
    <h4 className="font-semibold text-erva">Proteção de dados pessoais (LGPD)</h4>
    <p className="mt-2">
      A <strong className="text-erva font-semibold">BahCar Mobilidade Urbana Ltda.</strong> trata os dados de passageiros
      e motoristas parceiros em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018),
      garantindo criptografia, finalidade legítima e armazenamento seguro em Santa Maria/RS.
    </p>
  </Modal>
);

export default PrivacyModal;
