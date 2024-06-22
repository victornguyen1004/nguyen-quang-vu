import axios from "axios";
import CONSTANTS from "../../config/config";

// IMPORTANT: RENAME PARAMS TO BE EASIER TO UNDERSTAND AND READ
async function fetchCurrenciesData() {
  try {
    // Fetch currency data
    const pricesResponse = await axios.get(
      `${CONSTANTS.CURRENCY_API_URL}/prices.json`,
    );
    const prices = pricesResponse.data;

    // Group prices by each currency and get the latest price for each currency
    const latestPrices = Object.values(
      prices.reduce((acc, current) => {
        const existing = acc[current.currency];
        if (
          !existing ||
          new Date(current.date) > new Date(existing.date) ||
          (new Date(current.date).getTime() ===
            new Date(existing.date).getTime() &&
            current.price > existing.price)
        ) {
          acc[current.currency] = current;
        }
        return acc;
      }, {}),
    );

    // Fetch SVG icons from the GitHub API
    const iconsResponse = await axios.get(CONSTANTS.CURRENCY_ICON_API_URL);
    const icons = iconsResponse.data;

    // Filter SVG icons to include only icons of available currency
    const uniqueCurrencies = latestPrices.map((price) =>
      price.currency.toUpperCase(),
    );
    const svgFiles = icons.filter((icon) =>
      uniqueCurrencies.includes(icon.name.split(".")[0].toUpperCase()),
    );

    // Fetch SVG content for each file
    const svgPromises = svgFiles.map(async (file) => {
      const svgResponse = await axios.get(file.download_url);
      return {
        currency: file.name.split(".")[0].toUpperCase(),
        svg: svgResponse.data,
      };
    });

    const svgData = await Promise.all(svgPromises);

    // Combine currency data with its SVG data
    const combinedData = latestPrices.map((price) => {
      const svg = svgData.find(
        (svg) => svg.currency.toUpperCase() === price.currency.toUpperCase(),
      );

      return {
        currency: price.currency,
        price: price.price,
        svg: svg ? svg.svg : null,
      };
    });

    // Sort by alphabetical order
    combinedData.sort((a, b) => a.currency.localeCompare(b.currency));

    return combinedData;
  } catch (error) {
    console.error("Error fetching currency data:", error);
    return [];
  }
}

export { fetchCurrenciesData };
