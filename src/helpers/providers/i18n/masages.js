import { ENG } from "./translate/eng";
import { UA } from "./translate/ua";
export const LOCALES = {
  UA: "UA",
  ENG: "ENG",
};
export const messageData = {
  [LOCALES.ENG]: { ...ENG },
  [LOCALES.UA]: { ...UA },
};
