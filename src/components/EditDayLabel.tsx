import { useState } from "react";

interface EditDayLabelProps {
  initialLabel: string;
  onSubmit: (label: string) => void;
  onClose: () => void;
  loading?: boolean;
}

const EditDayLabel = ({ initialLabel, onSubmit, onClose, loading }: EditDayLabelProps) => {
  const [label, setLabel] = useState(initialLabel);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(label);
      }}
      className="min-w-[40vw]"
    >
      <label className="block mb-2 text-white">
        Modifica label del giorno
      </label>
      <input
        className="w-full bg-white/10 border-0 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-primary disabled:opacity-30"
        value={label}
        onChange={e => setLabel(e.target.value)}
        placeholder="Inserisci nome personalizzato"
        disabled={loading}
      />
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 px-4 py-2 rounded bg-gray-400 text-white"
          disabled={loading}
        >
          Annulla
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-white"
          disabled={loading}
        >
          Salva
        </button>
      </div>
    </form>
  );
};

export default EditDayLabel; 