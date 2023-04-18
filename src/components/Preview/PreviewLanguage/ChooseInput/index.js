import { useContext, useState } from "react";

import { SubsContext } from "../../../../helpers/providers/contextsubs";

import "./style.scss";

export const ChooseInput = (props) => {
  const subscription = useContext(SubsContext);

  const [back, changeBack] = useState("transparent");
  const [language, changeLanguage] = useState("");

  const myLanguage = (name) => {
    changeBack("red");
    changeLanguage(name);
    props.changeHeight();
    localStorage.setItem("language", name === "English" ? "ENG" : "UA");
    subscription.dispatch({ type: "change" });
  };

  return (
    <div>
      <div
        style={{ backgroundColor: back }}
        className="previewLanguage-btn"
        onClick={props.changeHeight}
      >
        <b>{language}</b>
      </div>
      <div className="previewLanguage-dataset">
        <div
          className="previewLanguage-data"
          onClick={() => myLanguage("Українська")}
        >
          <b>Українська</b>
        </div>
        <div
          className="previewLanguage-data"
          onClick={() => myLanguage("English")}
        >
          <b>English</b>
        </div>
      </div>
    </div>
  );
};
