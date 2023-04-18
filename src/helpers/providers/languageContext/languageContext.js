import { createContext, useReducer } from "react";

const LanguageContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "setLanguage": {
      return {
        ...action.language,
      };
    }
    case "reset": {
      return "ENG";
    }

    default: {
      return new Error("no action");
    }
  }
};

const LanguageContextProvider = (props) => {
  const defaultContext = {
    language: "ENG",
  };
  const [stateLanguage, dispatchLanguage] = useReducer(reducer, defaultContext);
  const value = { stateLanguage, dispatchLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageContextProvider };
