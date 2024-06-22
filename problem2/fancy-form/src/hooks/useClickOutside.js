import { useEffect } from "react";

// This custom hook helps close the currency lists when clicking outside of them
function useClickOutside(ref, callbackFunction) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackFunction();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callbackFunction]);
}

export default useClickOutside;
