import Modal from "../ui/Modal";

interface ConfirmDeleteExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteExerciseModal = ({ isOpen, onClose, onConfirm }: ConfirmDeleteExerciseModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4 text-white">
        Conferma eliminazione
      </h3>
      <p className="text-gray-300 mb-6">
        Sei sicuro di voler eliminare questo esercizio?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          Annulla
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Elimina
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmDeleteExerciseModal; 