import CONSTANTS from "../config/config";

function getLocaleStringShort(value) {
  return value.toLocaleString(undefined, CONSTANTS.SHORT_LOCALE_FORMAT_OPTIONS);
}

function getLocaleStringFull(value) {
  return value.toLocaleString(undefined, CONSTANTS.FULL_LOCALE_FORMAT_OPTIONS);
}

export { getLocaleStringFull, getLocaleStringShort };
