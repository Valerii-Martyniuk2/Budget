import { useEffect, useState } from "react";
import { BigCircle } from "../BigCircle";

import "./style.scss";

export const AlotCircle = (props) => {
  const [outlays, setOutlays] = useState({
    Home: 0,
    Car: 0,
    Food: 0,
    Activities: 0,
  });

  useEffect(() => {
    let fn = () => {
      let home = 0;
      let car = 0;
      let food = 0;
      let activities = 0;
      props.transactions.forEach((transaction) => {
        if (transaction.type.val === "Home") {
          home = home + transaction.value;
        } else if (transaction.type.val === "Car") {
          car = car + transaction.value;
        } else if (transaction.type.val === "Food") {
          food = food + transaction.value;
        } else if (transaction.type.val === "Activities") {
          activities = activities + transaction.value;
        }
      });

      let difference = props.limitAll / home;
      let fraction = 0;
      if (difference < 1) {
        difference = 1;
        fraction = 251.2 / difference;
      } else {
        fraction = 251.2 / difference;
      }

      let difference2 = props.limitAll / car;
      let fraction2 = 0;
      if (difference2 < 1) {
        difference2 = 1;
        fraction2 = 251.2 / difference2;
      } else {
        fraction2 = 251.2 / difference2;
      }

      let difference3 = props.limitAll / food;
      let fraction3 = 0;
      if (difference3 < 1) {
        difference3 = 1;
        fraction3 = 251.2 / difference3;
      } else {
        fraction3 = 251.2 / difference3;
      }

      let difference4 = props.limitAll / activities;
      let fraction4 = 0;
      if (difference4 < 1) {
        difference4 = 1;
        fraction4 = 251.2 / difference4;
      } else {
        fraction4 = 251.2 / difference4;
      }

      setOutlays({
        Car: fraction2,
        Home: fraction,
        Food: fraction3,
        Activities: fraction4,
      });
    };

    fn();
  }, [props.transactions, props.limitAll]);

  return (
    <div className="alot-circle">
      <div className="svg-div svg-div2">
        <svg className="svg-indicator1">
          <circle className="svg-indicator-track1" />
          <circle
            className="svg-indicator-indication1"
            style={{
              stroke: "#4b2c76",
              strokeDashoffset: `${251.2 - outlays.Home}`,
            }}
          />
        </svg>
        <div className="span-indicator-circle">
          <div
            style={{ marginRight: "0px" }}
            className="select-img select-imgHome"
          ></div>
        </div>
      </div>

      <div className="svg-div svg-div2">
        <svg className="svg-indicator1">
          <circle className="svg-indicator-track1" />
          <circle
            className="svg-indicator-indication1"
            style={{
              stroke: "#f4a30e",
              strokeDashoffset: `${251.2 - outlays.Car}`,
            }}
          />
        </svg>
        <div className="span-indicator-circle">
          <div
            style={{ marginRight: "0px" }}
            className="select-img select-imgCar"
          ></div>
        </div>
      </div>
      {window.innerWidth <= 550 ? (
        <BigCircle
          balance={props.balance}
          procent={props.procent}
          limitAll={props.limitAll}
          isStatistics={props.isStatistics}
        />
      ) : null}
      <div className="svg-div svg-div2">
        <svg className="svg-indicator1">
          <circle className="svg-indicator-track1" />
          <circle
            className="svg-indicator-indication1"
            style={{
              stroke: "#67322c",
              strokeDashoffset: `${251.2 - outlays.Food}`,
            }}
          />
        </svg>
        <div className="span-indicator-circle">
          <div
            style={{ marginRight: "0px" }}
            className="select-img select-imgFood"
          ></div>
        </div>
      </div>

      <div className="svg-div svg-div2">
        <svg className="svg-indicator1">
          <circle className="svg-indicator-track1" />
          <circle
            className="svg-indicator-indication1"
            style={{
              stroke: "#0e670c",
              strokeDashoffset: `${251.2 - outlays.Activities}`,
            }}
          />
        </svg>
        <div className="span-indicator-circle">
          <div
            style={{ marginRight: "0px" }}
            className="select-img select-imgActivities"
          ></div>
        </div>
      </div>
    </div>
  );
};
