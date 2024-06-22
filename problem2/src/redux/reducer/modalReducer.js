import {
  SET_CONVERTED_AMOUNT,
  SET_CONVERTED_CURRENCY,
  SET_IS_MODAL_OPEN,
} from "./../actionType/modalActionType";

const initialState = {
  isModalOpen: false,
  convertedAmount: 0,
  convertedCurrency: {},
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case SET_CONVERTED_AMOUNT:
      return {
        ...state,
        convertedAmount: action.payload,
      };
    case SET_CONVERTED_CURRENCY:
      return {
        ...state,
        convertedCurrency: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
