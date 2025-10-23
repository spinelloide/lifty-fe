import { toast } from "react-toastify";

export async function sendToast(type: string, message: string): Promise<any> {
  const isMobile = window.innerWidth < 768;
  
  const toastOptions = {
    position: isMobile ? 'bottom-center' as const : 'top-right' as const,
    autoClose: type === 'error' ? 4000 : 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  if (type === "success") {
    return toast.success(message, toastOptions);
  } else if (type === "error") {
    return toast.error(message, toastOptions);
  } else if (type === "info") {
    return toast.info(message, toastOptions);
  } else if (type === "warning") {
    return toast.warning(message, toastOptions);
  }
}
