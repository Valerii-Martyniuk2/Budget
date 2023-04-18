import { createContext, useReducer } from "react";
import { defaultContext } from "./defaultContext";

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser": {
      return {
        ...action.user,
      };
    }
    case "reset": {
      return defaultContext;
    }

    default: {
      return new Error("no action");
    }
  }
};

const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultContext);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
