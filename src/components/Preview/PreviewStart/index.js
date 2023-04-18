import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import "./style.scss";

export const PreviewStart = (props) => {
  const [maat, changeMatt] = useState("40px");
  const [text, changeText] = useState(<FormattedMessage id="preview.start" />);

  const container = useRef();
  const img1 = useRef();
  const img3 = useRef();

  const navigate = useNavigate();

  const start = () => {
    props.changeBackDisplay();
    changeText("");
    container.current.classList.add("noBackColor");
    container.current.classList.add("goCenter");
    setTimeout(() => {
      img1.current.classList.add("img1Anime");
      img3.current.classList.add("img3Anime");
    }, 1000);
    setTimeout(() => {
      changeMatt("100px");
    }, 2500);
    setTimeout(() => {
      img1.current.classList.add("RotateBack1");
      img3.current.classList.add("RotateBack3");
    }, 3500);
    setTimeout(() => {
      if (localStorage.getItem("user")) {
        navigate("/main/budget");
      } else {
        navigate("/main/user");
      }
    }, 5000);
  };
  return (
    <div ref={container} className="previewStart-container" onClick={start}>
      <b>{text}</b>
      <div
        ref={img1}
        className="previewStart-img  previewStart-img1"
        style={{ width: maat, height: maat, backgroundSize: maat }}
      ></div>
      <div
        className="previewStart-img  previewStart-img2"
        style={{ width: maat, height: maat, backgroundSize: maat }}
      ></div>
      <div
        ref={img3}
        className="previewStart-img  previewStart-img3 "
        style={{ width: maat, height: maat, backgroundSize: maat }}
      ></div>
    </div>
  );
};
//
