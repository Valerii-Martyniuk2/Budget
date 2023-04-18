import { useEffect } from "react";
import ReactDOM from "react-dom";

export const PortalAnimation = (props) => {
  const element = document.createElement("div");

  useEffect(() => {
    document.getElementById("animation").appendChild(element);

    return () => {
      document.getElementById("animation").removeChild(element);
    };
  });

  return ReactDOM.createPortal(props.children, element);
};
