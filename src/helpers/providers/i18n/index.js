import { useContext } from "react";
import { IntlProvider } from "react-intl";

import flatten from "flat";

import { LanguageContext } from "../languageContext/languageContext";

import { messageData } from "./masages";
import { LOCALES } from "./masages";

const IntlAppProvider = ({ children }) => {
  const contextLanguage = useContext(LanguageContext);

  return (
    <IntlProvider
      messages={flatten(messageData[contextLanguage.stateLanguage.language])}
      locale={
        contextLanguage.stateLanguage.language === "UA"
          ? "uk-ua"
          : contextLanguage.stateLanguage.language
      }
      defaultLocale={LOCALES.ENG}
    >
      {children}
    </IntlProvider>
  );
};

export default IntlAppProvider;
