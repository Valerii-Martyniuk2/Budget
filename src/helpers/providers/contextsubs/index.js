import { createContext, useReducer } from "react";

const SubsContext = createContext();

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

const SubsContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, true);
  const value = { state, dispatch };

  return (
    <SubsContext.Provider value={value}>{props.children}</SubsContext.Provider>
  );
};

export { SubsContext, SubsContextProvider };
