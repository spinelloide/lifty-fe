import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = ''
}) => {
  // Previeni lo scroll del body quando il bottom sheet è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl shadow-2xl z-50 transform transition-transform duration-300 ease-out ${className}`}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-4 max-h-96 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
