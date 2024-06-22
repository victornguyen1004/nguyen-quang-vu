import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import translations from "../../locales/en/en.json";

function CurrencyItem({
  data,
  isTextFirst,
  isTextOnly,
  isIconOnly,
  isLoading,
}) {
  return isLoading ? (
    <LoadingSpinner loadingText={translations.loading} />
  ) : (
    <div className={`flex items-center gap-x-1 md:gap-x-4`}>
      {!isTextOnly && (
        <div
          className="*:h-7 *:w-7"
          dangerouslySetInnerHTML={{
            __html: data?.svg,
          }}
        />
      )}
      {!isIconOnly && (
        <span className={`${isTextFirst ? "order-first" : ""}`}>
          {data?.currency}
        </span>
      )}
    </div>
  );
}

export default CurrencyItem;
