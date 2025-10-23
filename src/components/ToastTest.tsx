import React, { useState } from 'react';
import { toast } from 'react-toastify';

/**
 * Componente di test per verificare che i Toast si chiudano correttamente su mobile
 */
const ToastTest: React.FC = () => {
  const [testCount, setTestCount] = useState(0);

  const testToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    setTestCount(prev => prev + 1);
    
    const messages = {
      success: `Test ${testCount + 1}: Toast di successo - dovrebbe scomparire in 3 secondi`,
      error: `Test ${testCount + 1}: Toast di errore - dovrebbe scomparire in 4 secondi`,
      info: `Test ${testCount + 1}: Toast informativo - dovrebbe scomparire in 3 secondi`,
      warning: `Test ${testCount + 1}: Toast di avvertimento - dovrebbe scomparire in 3.5 secondi`
    };

    const durations = {
      success: 3000,
      error: 4000,
      info: 3000,
      warning: 3500
    };

    toast[type](messages[type], {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: durations[type],
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const testMultipleToasts = () => {
    toast.success('Primo toast - 3s', { autoClose: 3000 });
    setTimeout(() => toast.info('Secondo toast - 3s', { autoClose: 3000 }), 500);
    setTimeout(() => toast.warning('Terzo toast - 3.5s', { autoClose: 3500 }), 1000);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg m-4">
      <h2 className="text-xl font-bold mb-4">Test Toast AutoClose</h2>
      <p className="text-sm text-gray-300 mb-4">
        Testa che i Toast si chiudano automaticamente dopo il tempo specificato.
        Su mobile dovrebbero apparire in basso e scomparire dopo 3-4 secondi.
      </p>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => testToast('success')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Success (3s)
        </button>
        
        <button
          onClick={() => testToast('error')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Error (4s)
        </button>
        
        <button
          onClick={() => testToast('info')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Info (3s)
        </button>
        
        <button
          onClick={() => testToast('warning')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Warning (3.5s)
        </button>
      </div>
      
      <button
        onClick={testMultipleToasts}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded"
      >
        Test Multiple Toasts
      </button>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>• Su mobile: Toast in basso-centro</p>
        <p>• Su desktop: Toast in alto-destra</p>
        <p>• Progress bar visibile per mostrare il countdown</p>
        <p>• Click per chiudere manualmente</p>
      </div>
    </div>
  );
};

export default ToastTest;
