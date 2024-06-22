import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import CurrencySwapForm from "./components/CurrencySwapForm/CurrencySwapForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="relative grid min-h-screen grid-cols-12 bg-background-default font-open-sans md:items-center">
      <ToastContainer />
      <ConfirmationModal />
      <CurrencySwapForm />
    </div>
  );
}

export default App;
