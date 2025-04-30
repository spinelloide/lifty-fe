import { toast } from "react-toastify";

export async function sendToast(type: string, message: string): Promise<any> {
  if (type === "success") {
    return toast.success(message);
  } else if (type === "error") {
    return toast.error(message);
  }
}
