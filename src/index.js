import React from "react";
import ReactDOM from "react-dom/client";

import { AppContextProvider } from "./helpers/providers/context";
import { SubsContextProvider } from "./helpers/providers/contextsubs";
import { ThemeContextProvider } from "./helpers/providers/theme/themeContext";
import IntlAppProvider from "./helpers/providers/i18n";

import { LanguageContextProvider } from "./helpers/providers/languageContext/languageContext";

import { MyThemeProvider } from "./helpers/providers/theme/My themeProvider";
import { ThemeSubsProvider } from "./helpers/providers/themeSubscription/themeSubscription";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SubsContextProvider>
    <AppContextProvider>
      <LanguageContextProvider>
        <ThemeContextProvider>
          <IntlAppProvider>
            <ThemeSubsProvider>
              <MyThemeProvider />
            </ThemeSubsProvider>
          </IntlAppProvider>
        </ThemeContextProvider>
      </LanguageContextProvider>
    </AppContextProvider>
  </SubsContextProvider>
);
