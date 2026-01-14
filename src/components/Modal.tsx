import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Importaremos los estilos en el siguiente paso

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, showCloseButton, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          {showCloseButton && (<button className="modal-close-button" onClick={onClose}>
            &times;
          </button>)}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;