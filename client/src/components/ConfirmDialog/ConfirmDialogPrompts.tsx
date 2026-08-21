import Modal from '../Modal/Modal';
import './ConfirmDialogPrompts.scss';
interface ConfirmDialogPrompts {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogPrompts) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onCancel}>
      <p>{message}</p>
      <div className="confirm-dialog-buttons">
        <button className="cancel-button" onClick={onCancel} data-testid="confirmDialog-cancel">
          Cancel
        </button>
        <button className="delete-button" onClick={onConfirm} data-testid="confirmDialog-delete">
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
