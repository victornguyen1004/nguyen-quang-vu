import { toast, Bounce } from "react-toastify";

const toastMessages = {
  exchange_success: "Exchanged successfully",
};

export const showSuccessToast = () => {
  toast.success(toastMessages.exchange_success, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
