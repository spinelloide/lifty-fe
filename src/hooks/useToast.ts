import { toast } from 'react-toastify';

/**
 * Hook personalizzato per gestire i Toast con stili responsive
 */
export const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showInfo = (message: string) => {
    toast.info(message, {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showWarning = (message: string) => {
    toast.warning(message, {
      position: window.innerWidth < 768 ? 'bottom-center' : 'top-right',
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
  };
};
