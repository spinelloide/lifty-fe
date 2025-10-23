import { useState, useEffect } from 'react';

/**
 * Hook personalizzato per rilevare se l'utente è su un dispositivo mobile
 * Controlla se la larghezza dello schermo è inferiore a 768px
 * @returns {boolean} true se è mobile, false se è desktop
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Funzione per controllare se è mobile basata sulla larghezza
    const checkIsMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      setIsMobile(isMobileWidth);
    };

    // Controlla immediatamente
    checkIsMobile();

    // Aggiunge listener per il resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};
