import "./Modal.scss"
interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, title, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
        <h2>{title}</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </header>
      <div className="modal-body">{children}</div>
      </div>       
    </div>
  );
}

export default Modal;
