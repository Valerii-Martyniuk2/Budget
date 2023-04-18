import { useEffect, useState } from "react";

import { ChooseInput } from "./ChooseInput";

import "./style.scss";

export const PreviewLanguage = () => {
  const [prevHeight, changePrevHeight] = useState(50);
  const [isUser, changeisUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      changeisUser(true);
    }
  }, []);

  const changeHeight = () => {
    if (prevHeight === 50) changePrevHeight(139);
    else {
      changePrevHeight(50);
    }
  };

  return (
    <div
      className={
        isUser
          ? "previewLanguage-container display-null"
          : "previewLanguage-container"
      }
      style={{ height: prevHeight }}
    >
      <span className="fly-language fly-language1">Language</span>
      <span className="fly-language fly-language2">Мова</span>
      <span className="fly-language fly-language3">Lingua</span>
      <span className="fly-language fly-language4">Język</span>
      <span className="fly-language fly-language5">Kalba</span>
      <span className="fly-language fly-language6">言語</span>
      <span className="fly-language fly-language7">Taal</span>
      <ChooseInput changeHeight={changeHeight} />
    </div>
  );
};
