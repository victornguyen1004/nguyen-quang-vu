import { CircleNotchIcon } from "../../assets/svg";

function LoadingSpinner({ loadingText }) {
  if (loadingText) {
    return (
      <div className="flex items-center gap-x-2">
        <CircleNotchIcon className="h-7 animate-spin fill-zinc-500" />
        {loadingText && <div className="text-zinc-500">{loadingText}</div>}
      </div>
    );
  }
  return <CircleNotchIcon className="h-4 animate-spin fill-zinc-500" />;
}

export default LoadingSpinner;
