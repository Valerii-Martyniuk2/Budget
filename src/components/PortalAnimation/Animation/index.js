import { useRef } from "react";
import { PortalAnimation } from "..";
import { Chest } from "./Chest";

import { Fog } from "./Fog";
import { RocketContainer } from "./RocketContainer";

import "./style.scss";

export const Animation = (props) => {
  const backdrop = useRef(null);

  if (!props.open) {
    return null;
  }
  return (
    <PortalAnimation>
      <div ref={backdrop} className="animation-backdrop">
        <div className="outlays-modal-content">
          <Chest />
          <RocketContainer />
          <Fog />
        </div>
      </div>
    </PortalAnimation>
  );
};
