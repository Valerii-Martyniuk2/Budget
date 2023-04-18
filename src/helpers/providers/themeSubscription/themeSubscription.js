import { createContext, useReducer } from "react";

const ThemeSubs = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "change": {
      return !state;
    }
    case "reset": {
      return true;
    }

    default: {
      return new Error("no action");
    }
  }
};

const ThemeSubsProvider = (props) => {
  const [stateThemeSubs, dispatchThemeSubs] = useReducer(reducer, true);
  const value = { stateThemeSubs, dispatchThemeSubs };

  return (
    <ThemeSubs.Provider value={value}>{props.children}</ThemeSubs.Provider>
  );
};

export { ThemeSubs, ThemeSubsProvider };
