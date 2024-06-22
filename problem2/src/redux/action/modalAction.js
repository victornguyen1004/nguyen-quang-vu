import {
  SET_CONVERTED_AMOUNT,
  SET_CONVERTED_CURRENCY,
  SET_IS_MODAL_OPEN,
} from "../actionType/modalActionType";

export const setIsModalOpen = (isModalOpen) => ({
  type: SET_IS_MODAL_OPEN,
  payload: isModalOpen,
});

export const setConvertedAmount = (convertedAmount) => ({
  type: SET_CONVERTED_AMOUNT,
  payload: convertedAmount,
});

export const setConvertedCurrency = (convertedCurrency) => ({
  type: SET_CONVERTED_CURRENCY,
  payload: convertedCurrency,
});
