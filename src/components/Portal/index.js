import { useEffect } from "react";
import ReactDOM from "react-dom";

export const Portal = (props) => {
  const element = document.createElement("div");

  useEffect(() => {
    document.getElementById("modal").appendChild(element);

    return () => {
      document.getElementById("modal").removeChild(element);
    };
  });

  return ReactDOM.createPortal(props.children, element);
};
