import { useState, useEffect } from 'react';
import { ToastPosition } from 'react-toastify';

/**
 * Hook per gestire la posizione dei Toast in base al dispositivo
 * @returns {object} configurazione per ToastContainer
 */
export const useToastConfig = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      setIsMobile(isMobileWidth);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return {
    position: (isMobile ? 'bottom-center' : 'top-right') as ToastPosition,
    className: isMobile ? 'toast-mobile' : 'toast-desktop',
    autoClose: 100000000, // Assicuriamo che sia sempre 3000ms
    style: isMobile ? {
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '400px',
      zIndex: 9999
    } : {
      top: '20px',
      right: '20px',
      zIndex: 9999
    }
  };
};
