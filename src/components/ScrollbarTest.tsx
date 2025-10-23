import React from 'react';

/**
 * Componente di test per verificare la scrollbar personalizzata
 */
const ScrollbarTest: React.FC = () => {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg m-4">
      <h2 className="text-xl font-bold mb-4">Test Custom Scrollbar</h2>
      <p className="text-sm text-gray-300 mb-4">
        Testa la scrollbar personalizzata coerente con la palette dell'app.
        La scrollbar dovrebbe essere arancione con gradiente e bordi grigi.
      </p>
      
      {/* Test con contenuto lungo */}
      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Scrollbar Standard</h3>
          <div className="h-32 overflow-y-auto border border-gray-700 p-2">
            <div className="space-y-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="bg-gray-800 p-2 rounded text-sm">
                  Item {i + 1} - Scroll per vedere la scrollbar personalizzata
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Scrollbar Custom Class</h3>
          <div className="h-32 overflow-y-auto custom-scrollbar border border-gray-700 p-2">
            <div className="space-y-2">
              {Array.from({ length: 15 }, (_, i) => (
                <div key={i} className="bg-orange-500/20 p-2 rounded text-sm">
                  Custom Item {i + 1} - Scrollbar più sottile
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Scrollbar Orizzontale</h3>
          <div className="overflow-x-auto border border-gray-700 p-2">
            <div className="flex space-x-4 w-max">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="bg-orange-500 p-4 rounded text-sm whitespace-nowrap min-w-[100px]">
                  Card {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>• Scrollbar principale: 12px con gradiente arancione</p>
        <p>• Scrollbar custom: 8px più sottile</p>
        <p>• Hover effect: Colore più scuro</p>
        <p>• Track: Grigio semi-trasparente</p>
        <p>• Compatibile con Firefox</p>
      </div>
    </div>
  );
};

export default ScrollbarTest;
