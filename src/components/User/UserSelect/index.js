import { useState } from "react";
import { HalfDiv, HalfFormDiv } from "../../../helpers/styles/styled";

import "./style.scss";

export const UserSelect = (props) => {
  const [display, changeDisplay] = useState(false);

  const selectedValue = (name) => {
    props.changeFormSelect(name);
    changeDisplay(false);
  };

  return (
    <HalfDiv className="half-label form-select-div">
      <span>
        <b>{props.description}</b>
      </span>

      <HalfFormDiv
        className="half-form-input peddingLeftNone"
        onClick={() => changeDisplay((value) => !value)}
      >
        <div className="half-form-div borderBottomNone">
          <div className={`select-img select-img${props.formSelect.val}`} />
          {props.formSelect.name}
          <div className={`select-imgArrow`} />
        </div>
      </HalfFormDiv>
      <div
        className="half-form-input-select"
        style={{ display: display ? "block" : "none" }}
      >
        {props.data.map((item) => (
          <div
            key={item.val}
            className="half-form-div"
            onClick={() => selectedValue({ val: item.val, name: item.name })}
          >
            <div className={`select-img select-img${item.val}`} />
            {item.name}
          </div>
        ))}
      </div>
    </HalfDiv>
  );
};
