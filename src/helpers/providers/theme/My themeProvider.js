import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

import App from "../../../components/App/App";
import { ThemeContext } from "./themeContext";
import { ThemeSubs } from "../themeSubscription/themeSubscription";

export const MyThemeProvider = () => {
  const contextTheme = useContext(ThemeContext);
  const themeSubscription = useContext(ThemeSubs);

  const [theme, changeTheme] = useState(contextTheme.stateTheme);

  useEffect(() => {
    changeTheme(contextTheme.stateTheme);
  }, [themeSubscription, changeTheme, contextTheme.stateTheme]);
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};
