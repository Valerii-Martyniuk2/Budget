import { useEffect } from "react";
import { useState } from "react";
import { Rocket, RocketFire } from "../animationStyled";

import "./style.scss";

export const RocketContainer = () => {
  const [firePosition, changeFirePosition] = useState(-22);
  const [goFire, changeGoFire] = useState("");
  const [goRocket, changeGoRocket] = useState("");

  useEffect(() => {
    let fireInterval = setInterval(() => {
      changeFirePosition((val) => {
        if (val === -22) return -63;
        if (val === -63) return -107;
        if (val === -107) return -152;
        if (val === -152) return -192;
        if (val === -192) return -233;
        if (val === -233) return -277;
        if (val === -277) return -22;
      });
    }, 120);

    setTimeout(() => {
      changeGoFire("goFire");
      changeGoRocket("goRocket");
    }, 3000);

    return () => {
      clearInterval(fireInterval);
    };
  }, []);

  return (
    <>
      <Rocket id="rocket" goRocket={goRocket} />
      <RocketFire position={firePosition} id="fire" goFire={goFire} />
    </>
  );
};
