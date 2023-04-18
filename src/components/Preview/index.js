import { useState, useRef, useEffect } from "react";
import RINGS from "vanta/dist/vanta.rings.min";
import * as THREE from "three";
import { FormattedMessage } from "react-intl";

import { PreviewLanguage } from "./PreviewLanguage";
import { PreviewStart } from "./PreviewStart";

import "./style.scss";

export const Preview = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const [display, changeDisplay] = useState("none");

  const myRef = useRef(null);
  const back = useRef();

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        RINGS({
          el: myRef.current,
          THREE: THREE,
          scaleMobile: 1.0,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          gyroControls: false,
          mouseControls: false,
          touchControls: false,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const changeBackDisplay = () => {
    setTimeout(() => {
      back.current.classList.add("animeBack2");
    }, 1000);
    changeDisplay("block");
  };
  return (
    <div ref={myRef} className="MyPreview" id="MyPreview">
      <div className="preview-centerInfo">
        <span className="preview-centerInfoTitle">
          <FormattedMessage id="menu.home" />
        </span>
      </div>
      <PreviewLanguage />
      <div ref={back} className="animeBack" style={{ display: display }}></div>
      <PreviewStart changeBackDisplay={changeBackDisplay} />
    </div>
  );
};
