import React from 'react';
import { toast } from 'react-toastify';

/**
 * Componente di test per verificare che le icone dei Toast siano bianche
 */
const ToastIconTest: React.FC = () => {
  const testToastWithIcons = () => {
    // Test con icone personalizzate
    toast.success('✅ Success with white icon', {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3000,
    });

    toast.error('❌ Error with white icon', {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3000,
    });

    toast.info('ℹ️ Info with white icon', {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3000,
    });

    toast.warning('⚠️ Warning with white icon', {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3000,
    });
  };

  const testToastWithoutIcons = () => {
    // Test senza icone per confronto
    toast('Plain toast without icon', {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg m-4">
      <h2 className="text-xl font-bold mb-4">Test Toast Icons (White)</h2>
      <p className="text-sm text-gray-300 mb-4">
        Testa che le icone dei Toast siano sempre bianche su tutti i tipi di toast.
      </p>
      
      <div className="space-y-3">
        <button
          onClick={testToastWithIcons}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
        >
          Test Toast with Icons
        </button>
        
        <button
          onClick={testToastWithoutIcons}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
        >
          Test Plain Toast
        </button>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>• Le icone dovrebbero essere sempre bianche</p>
        <p>• Il pulsante di chiusura dovrebbe essere bianco</p>
        <p>• La progress bar dovrebbe essere bianca semi-trasparente</p>
        <p>• Su mobile: Toast in basso-centro</p>
        <p>• Su desktop: Toast in alto-destra</p>
      </div>
    </div>
  );
};

export default ToastIconTest;
