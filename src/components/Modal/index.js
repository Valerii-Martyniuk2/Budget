import { useRef } from "react";

import { ModalContent } from "../../helpers/styles/styled";
import { Portal } from "../Portal";

import "./style.scss";

export const Modal = (props) => {
  const backdrop = useRef(null);

  const onClick = (e) => {
    if (backdrop.current === e.target) {
      props.onClose();
    }
  };
  if (!props.open) {
    return null;
  }
  return (
    <Portal>
      <div ref={backdrop} className="backdrop" onClick={onClick}>
        <ModalContent className="modal-content">{props.children}</ModalContent>
      </div>
    </Portal>
  );
};
