import CurrencyItem from "../CurrencyItem/CurrencyItem";

function CurrencyList({ data, handleItemSelect, isVisible }) {
  return (
    isVisible && (
      <ul className="shadow-around scrollbar scrollbar-thumb-blue-500 scrollbar-thumb-rounded-full scrollbar-w-2 absolute left-0 top-full my-2 flex max-h-[240px] w-full flex-col divide-y divide-gray-100 overflow-y-scroll rounded-lg bg-white focus:border-2">
        {data.map((currency) => (
          <div
            key={currency.currency}
            className="flex items-center px-2 py-4 hover:bg-slate-50"
            onClick={() => handleItemSelect(currency)}
          >
            <CurrencyItem data={currency} />
          </div>
        ))}
      </ul>
    )
  );
}

export default CurrencyList;
