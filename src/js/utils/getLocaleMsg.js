import { getByPropFromObj } from "./getByPropFromObj";
import { locales } from "../../locales";
export const getLocaleMsg = (key, lang = "en") => {
  const msg = getByPropFromObj(locales, key);
  if(msg.length && msg[0].hasOwnProperty(lang)) {
    return msg[0][lang];
  } else {
    console.debug(`Locale key "${key}" not found for lang "${lang}"`);
    return "";
  }
}
