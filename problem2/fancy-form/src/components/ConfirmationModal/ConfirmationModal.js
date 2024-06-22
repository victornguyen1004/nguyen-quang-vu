import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "./../../redux/action/modalAction";
import { RightLeftIcon, XIcon } from "../../assets/svg";
import translations from "../../locales/en/en.json";
import CurrencyItem from "./../CurrencyItem/CurrencyItem";
import { getLocaleStringFull } from "../../utils/utils";
import { showSuccessToast } from "./../../config/toasts";

function ConfirmationModal() {
  const { isModalOpen, convertedAmount, convertedCurrency } = useSelector(
    (state) => state.modal,
  );
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => handleModalCancel());

  const handleModalCancel = () => {
    dispatch(setIsModalOpen(false));
  };

  const handleModalOK = () => {
    dispatch(setIsModalOpen(false));
    showSuccessToast();
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-80">
        <div
          ref={modalRef}
          className="flex flex-col items-center gap-4 rounded-xl bg-white p-6"
        >
          {/* Close button */}
          <div onClick={handleModalCancel} className="cursor-pointer self-end">
            <XIcon className="h-5 w-5 fill-zinc-400 duration-100 hover:fill-zinc-500" />
          </div>

          {/* Swap icon */}
          <RightLeftIcon className="h-16 w-16 fill-success" />
          <div className="text-xl font-bold">
            {translations.modal_confirmation_msg}
          </div>
          <div className="flex w-full items-center gap-x-6 rounded-lg border-2 p-3 text-lg shadow-inner">
            <div className="max-w-64 break-words">
              {getLocaleStringFull(convertedAmount)}
            </div>
            <CurrencyItem
              data={convertedCurrency}
              isTextFirst={true}
              className=""
            />
          </div>
          <div className="flex w-full justify-between gap-x-12 font-semibold">
            <button
              onClick={() => handleModalCancel()}
              className="w-full rounded-lg border border-zinc-400 bg-zinc-200 px-4 py-2 text-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleModalOK()}
              className="w-full rounded-lg border bg-success px-4 py-2 text-lg text-white shadow-around hover:bg-opacity-80"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmationModal;
