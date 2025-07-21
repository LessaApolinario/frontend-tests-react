import { toast } from "react-toastify";

export function useNotification() {
  function notifySuccess(message: string) {
    toast(message, {
      position: "top-right",
      type: "success",
    });
  }

  function notifyError(message: string) {
    toast(message, {
      position: "top-right",
      type: "error",
    });
  }

  return { notifySuccess, notifyError };
}
