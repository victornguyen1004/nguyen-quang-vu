import { useState, useRef } from "react";
import CurrencyItem from "../CurrencyItem/CurrencyItem";
import CurrencyList from "../CurrencyList/CurrencyList";
import useCurrencyConversion from "../../hooks/useCurrencyConversion";
import useFetchCurrencies from "../../hooks/useFetchCurrencies";
import useClickOutside from "./../../hooks/useClickOutside";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getLocaleStringFull, getLocaleStringShort } from "../../utils/utils";
import {
  ArrowsRotateIcon,
  ChevronDownIcon,
  RightLeftIcon,
} from "../../assets/svg";
import translations from "../../locales/en/en.json";
import CONSTANTS from "./../../config/config";
import { useDispatch } from "react-redux";
import {
  setConvertedAmount,
  setConvertedCurrency,
  setIsModalOpen,
} from "../../redux/action/modalAction";

function CurrencySwapForm() {
  const [isOriginalListVisible, setIsOriginalListVisible] = useState(false);
  const [isTargetListVisible, setIsTargetListVisible] = useState(false);
  const originalListRef = useRef(null);
  const targetListRef = useRef(null);

  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(setConvertedAmount(convertedAmount));
    dispatch(setIsModalOpen(true));
    dispatch(setConvertedCurrency(selectedTargetCurrency));
  };

  // Close the original and target currency lists when clicking outside of them
  useClickOutside(originalListRef, () => setIsOriginalListVisible(false));
  useClickOutside(targetListRef, () => setIsTargetListVisible(false));

  // Fetch currencies data
  const {
    currenciesData,
    isFetching,
    selectedOriginalCurrency,
    selectedTargetCurrency,
    setSelectedOriginalCurrency,
    setSelectedTargetCurrency,
  } = useFetchCurrencies();

  const { conversionRate, amount, setAmount, convertedAmount } =
    useCurrencyConversion(selectedOriginalCurrency, selectedTargetCurrency);

  const toggleOriginalListVisibility = () => {
    setIsOriginalListVisible(!isOriginalListVisible);
  };

  const toggleTargetListVisibility = () => {
    setIsTargetListVisible(!isTargetListVisible);
  };

  const handleOriginalCurrencySelect = (currency) => {
    setSelectedOriginalCurrency(currency);
    setIsOriginalListVisible(false);
  };

  const handleTargetCurrencySelect = (currency) => {
    setSelectedTargetCurrency(currency);
    setIsTargetListVisible(false);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const swapCurrency = () => {
    setSelectedOriginalCurrency(selectedTargetCurrency);
    setSelectedTargetCurrency(selectedOriginalCurrency);
  };

  return (
    <div className="col-span-12 m-2 flex flex-col md:col-span-10 md:col-start-2">
      {/* Title */}
      <div className="mb-2 w-fit bg-gradient-to-r from-accent-pink via-accent-purple to-accent-blue bg-clip-text text-3xl font-black text-transparent sm:text-5xl">
        {translations.title}
      </div>
      <div className="mb-4 flex items-center gap-x-4 text-white md:mb-8">
        <div className="text-base font-light md:text-lg">
          {translations.subtitle_1}
        </div>
        <div className="text-sm font-semibold md:text-xl">
          {translations.subtitle_2}
        </div>
      </div>

      {/* Body */}
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-12 gap-x-2 gap-y-4 rounded-lg bg-white p-2 shadow-around-max shadow-accent-purple md:gap-x-4 md:gap-y-8 md:p-8"
      >
        {/* Amount Input */}
        <div className="col-span-12 md:col-span-3">
          <label
            htmlFor="amount"
            className="mb-2 block font-bold text-zinc-500"
          >
            {translations.amount}
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            min={CONSTANTS.MINIMUM_AMOUNT_INPUT_VALUE}
            value={amount}
            onKeyDown={(event) =>
              CONSTANTS.INVALID_INPUT_CHARACTERS.includes(event.key) &&
              event.preventDefault()
            }
            onChange={handleAmountChange}
            className="block w-full rounded-lg border-2 p-[9px] shadow-around duration-200 [appearance:textfield] focus:border-accent-blue focus:shadow-around-lg focus:shadow-accent-blue-low-opacity focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder={translations.placeholder_enter}
          />
        </div>

        {/* Original Currencies List */}
        <div className="col-span-5 md:col-span-4">
          <div className="mb-2 font-bold text-zinc-500">
            {translations.from}
          </div>
          <div
            className={`relative w-full cursor-pointer rounded-lg border-2 p-2 shadow-around duration-200 ${
              isOriginalListVisible
                ? "border-accent-blue shadow-accent-blue-low-opacity"
                : ""
            }`}
            onClick={toggleOriginalListVisibility}
            ref={originalListRef}
          >
            <CurrencyItem
              data={selectedOriginalCurrency}
              isLoading={isFetching}
            />
            <ChevronDownIcon className="absolute right-4 top-1/2 h-4 -translate-y-1/2 animate-pulse" />
            <CurrencyList
              data={currenciesData}
              handleItemSelect={handleOriginalCurrencySelect}
              isVisible={isOriginalListVisible}
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="col-span-2 flex flex-col items-center justify-end md:col-span-1">
          <div
            onClick={swapCurrency}
            className="group -translate-y-1 cursor-pointer rounded-lg bg-accent-blue p-3 transition-transform hover:bg-opacity-80"
          >
            <ArrowsRotateIcon className="h-4 transform fill-white duration-200 group-hover:rotate-180" />
          </div>
        </div>

        {/* Target Currencies List */}
        <div className="col-span-5 md:col-span-4">
          <div className="mb-2 font-bold text-zinc-500">{translations.to}</div>
          <div
            className={`relative w-full cursor-pointer rounded-lg border-2 p-2 shadow-around duration-200 ${
              isTargetListVisible
                ? "border-accent-blue shadow-accent-blue-low-opacity"
                : ""
            }`}
            onClick={toggleTargetListVisibility}
            ref={targetListRef}
          >
            <CurrencyItem
              data={selectedTargetCurrency}
              isLoading={isFetching}
            />
            <ChevronDownIcon className="absolute right-4 top-1/2 h-4 -translate-y-1/2 animate-pulse" />
            {isTargetListVisible && (
              <CurrencyList
                data={currenciesData}
                handleItemSelect={handleTargetCurrencySelect}
                isVisible={isTargetListVisible}
              />
            )}
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="col-span-12 whitespace-nowrap font-bold text-zinc-500 md:col-span-3">
          {translations.conversion_rate}
        </div>
        <div className="col-span-5 flex items-center justify-end gap-x-4 md:col-span-4">
          {isFetching ? (
            <LoadingSpinner />
          ) : (
            <>
              {CONSTANTS.DEFAULT_CONVERSION_VALUE}
              <CurrencyItem data={selectedOriginalCurrency} isTextOnly={true} />
            </>
          )}
        </div>
        <div className="col-span-2 text-center md:col-span-1">=</div>
        <div className="col-span-5 flex items-center gap-x-4 md:col-span-4">
          {isFetching ? (
            <LoadingSpinner />
          ) : (
            <>
              {getLocaleStringShort(conversionRate)}
              <CurrencyItem data={selectedTargetCurrency} isTextOnly={true} />
            </>
          )}
        </div>

        {/* Result */}
        <div className="col-span-12 whitespace-nowrap font-bold text-zinc-500 md:col-span-3">
          {translations.your_result}
        </div>
        <div className="col-span-5 flex flex-col items-center justify-between gap-x-4 text-end font-bold md:col-span-4 md:flex-row md:justify-end">
          {isFetching ? (
            <LoadingSpinner />
          ) : amount ? (
            <div className="break-all">{amount}</div>
          ) : (
            CONSTANTS.DEFAULT_ORIGINAL_AMOUNT
          )}
          <CurrencyItem
            data={selectedOriginalCurrency}
            isTextOnly={true}
            className="self-end"
          />
        </div>
        <div className="col-span-2 flex items-center justify-center text-center md:col-span-1">
          =
        </div>
        <div className="col-span-5 flex flex-col items-center gap-x-4 self-end text-end font-bold md:col-span-4 md:flex-row">
          {isFetching ? (
            <LoadingSpinner />
          ) : (
            <>
              {convertedAmount ? (
                <div className="break-all">
                  {getLocaleStringFull(convertedAmount)}
                </div>
              ) : (
                CONSTANTS.DEFAULT_RESULT_AMOUNT
              )}
              <CurrencyItem
                data={selectedTargetCurrency}
                isTextOnly={true}
                className="text-end"
              />
            </>
          )}
        </div>

        {/* Swap Button */}
        <button
          type="submit"
          disabled={!(amount > 0)}
          className="col-span-12 cursor-pointer rounded-lg bg-accent-blue py-4 text-center font-bold text-white shadow-around duration-200 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {amount > 0 ? (
            <div className="flex items-center justify-center gap-x-2">
              {translations.swap}
              <RightLeftIcon className="h-4 fill-white" />
            </div>
          ) : (
            translations.please_enter
          )}
        </button>
      </form>
    </div>
  );
}

export default CurrencySwapForm;
