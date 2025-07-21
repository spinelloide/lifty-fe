import Modal from "../ui/Modal";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Conferma eliminazione",
  message = "Sei sicuro di voler procedere?",
  confirmLabel = "Elimina",
  cancelLabel = "Annulla",
}: ConfirmDeleteModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-gray-300 mb-6">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDeleteModal;
