import { useCallback, useEffect, useState } from "react";
import CONSTANTS from "../config/config";

function useCurrencyConversion(
  selectedOriginalCurrency,
  selectedTargetCurrency,
) {
  const [conversionRate, setConversionRate] = useState(
    CONSTANTS.DEFAULT_CONVERSION_VALUE,
  );
  const [amount, setAmount] = useState(CONSTANTS.DEFAULT_ORIGINAL_AMOUNT);
  const [convertedAmount, setConvertedAmount] = useState(
    CONSTANTS.DEFAULT_RESULT_AMOUNT,
  );

  const calculateConversionRate = useCallback(() => {
    if (selectedOriginalCurrency && selectedTargetCurrency) {
      const fromRate = selectedOriginalCurrency.price || 1;
      const toRate = selectedTargetCurrency.price || 1;
      const rate = fromRate / toRate;
      setConversionRate(rate);
    }
  }, [selectedOriginalCurrency, selectedTargetCurrency]);

  useEffect(() => {
    calculateConversionRate();
  }, [calculateConversionRate]);

  const calculateResult = useCallback(() => {
    if (!amount || !selectedOriginalCurrency || !selectedTargetCurrency) {
      setConvertedAmount(CONSTANTS.DEFAULT_RESULT_AMOUNT);
      return;
    }

    const originalRate = selectedOriginalCurrency.price || 1;
    const targetRate = selectedTargetCurrency.price || 1;
    const conversionResult = (amount * originalRate) / targetRate;
    setConvertedAmount(conversionResult);
  }, [amount, selectedOriginalCurrency, selectedTargetCurrency]);

  useEffect(() => {
    calculateResult();
  }, [calculateResult]);

  return {
    conversionRate,
    setConversionRate,
    amount,
    setAmount,
    convertedAmount,
    setConvertedAmount,
  };
}

export default useCurrencyConversion;
