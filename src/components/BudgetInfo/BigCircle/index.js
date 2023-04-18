import { useContext } from "react";

import { AppContext } from "../../../helpers/providers/context";

import "./style.scss";

export const BigCircle = (props) => {
  const contextDataUser = useContext(AppContext);

  return (
    <div className="svg-div">
      <svg className="svg-indicator">
        <circle className="svg-indicator-track" />
        <circle
          className="svg-indicator-indication"
          style={
            props.isStatistics
              ? { strokeDashoffset: `${0}` }
              : { strokeDashoffset: `${533.8 - props.procent}` }
          }
        />
      </svg>
      <div className="span-indicator-circle">
        <b
          style={
            props.isStatistics
              ? {
                  color: "white",
                }
              : {
                  color: props.limitAll - props.balance < 0 ? "red" : "white",
                }
          }
        >
          {props.isStatistics ? props.balance : props.limitAll - props.balance}
          {contextDataUser.state.currency.val === "ENG" ? " $" : " ₴"}
        </b>
      </div>
    </div>
  );
};
