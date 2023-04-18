import { createContext, useReducer } from "react";

const ThemeContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "setTheme": {
      return {
        ...action.theme,
      };
    }

    case "reset": {
      return false;
    }

    default: {
      return new Error("no action");
    }
  }
};

const ThemeContextProvider = (props) => {
  const defaultContext = {
    theme: false,
  };
  const [stateTheme, dispatchTheme] = useReducer(reducer, defaultContext);
  const value = { stateTheme, dispatchTheme };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
