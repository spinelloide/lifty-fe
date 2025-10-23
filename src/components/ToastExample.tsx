import React from 'react';
import { useToast } from '../hooks/useToast';

/**
 * Componente di esempio per testare i Toast responsive
 */
const ToastExample: React.FC = () => {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Operazione completata con successo!');
  };

  const handleError = () => {
    toast.error('Si è verificato un errore. Riprova.');
  };

  const handleInfo = () => {
    toast.info('Informazione importante da leggere.');
  };

  const handleWarning = () => {
    toast.warning('Attenzione: controlla i dati inseriti.');
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg m-4">
      <h2 className="text-xl font-bold mb-4">Test Toast Responsive</h2>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleSuccess}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Success
        </button>
        
        <button
          onClick={handleError}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Error
        </button>
        
        <button
          onClick={handleInfo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Info
        </button>
        
        <button
          onClick={handleWarning}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Warning
        </button>
      </div>
      
      <p className="mt-4 text-sm text-gray-300">
        Su mobile i Toast appariranno in basso al centro, su desktop in alto a destra.
      </p>
    </div>
  );
};

export default ToastExample;
