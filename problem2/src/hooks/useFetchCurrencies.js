import { useEffect, useState } from "react";
import { fetchCurrenciesData } from "../services/currencyService/currencyService";

function useFetchCurrencies() {
  const [currenciesData, setCurrenciesData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedOriginalCurrency, setSelectedOriginalCurrency] =
    useState(null);
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await fetchCurrenciesData();
        setCurrenciesData(data);
        if (data.length > 0) {
          setSelectedOriginalCurrency(data[0]);
          if (data.length > 1) {
            setSelectedTargetCurrency(
              data.find((currency) => currency.currency === "USD"),
            );
          }
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return {
    currenciesData,
    isFetching,
    selectedOriginalCurrency,
    selectedTargetCurrency,
    setSelectedOriginalCurrency,
    setSelectedTargetCurrency,
  };
}

export default useFetchCurrencies;
