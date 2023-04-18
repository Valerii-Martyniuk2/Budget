import { useRef, useState, useEffect, memo, useContext } from "react";
import { FormattedMessage } from "react-intl";

import { BigCircle } from "./BigCircle";
import { AlotCircle } from "./AlotCircle";
import { AppContext } from "../../helpers/providers/context";
import { SubsContext } from "../../helpers/providers/contextsubs";
import { updateFirebase } from "../../firebase/fireFunctions";
import { Svipe } from "./Svipe";
import { SvipePhone } from "./Svipe/SvipePhone";

import "./style.scss";

export const BudgetInfo = memo((props) => {
  const limitValue = useRef(null);

  const contextDataUser = useContext(AppContext);
  const userSubscription = useContext(SubsContext);

  const [limit, setLimit] = useState("");
  const [procent, setProcent] = useState(0);
  const [divHeight, setdivHeight] = useState(56);
  const [limitAll, setLimitAll] = useState(contextDataUser.state.limit);

  useEffect(() => {
    setLimitAll(contextDataUser.state.limit);
  }, [userSubscription, contextDataUser.state.limit]);

  useEffect(() => {
    let difference = limitAll / props.balance;
    if (difference < 1) {
      difference = 1;
      setProcent(533.8 / difference);
    } else {
      setProcent(533.8 / difference);
    }
  }, [limitAll, props.balance]);

  const changeHight = () => {
    if (divHeight === 56) {
      setdivHeight(100);
    } else {
      setdivHeight(56);
    }
  };
  const refreshUserLimit = async () => {
    if (localStorage.getItem("user")) {
      await updateFirebase("limit", limit, contextDataUser.state.uid);
      userSubscription.dispatch({
        type: "change",
      });
      changeHight();
    } else {
      console.log("no user");
    }
  };
  return (
    <div className="BudgetInfo-half">
      <div className="top-info-badget">
        <div className="top-info-confirm">
          <p className="top-info-p" style={{ width: "100%" }}>
            <b>
              {props.spent}
              {props.balance}
              {contextDataUser.state.currency.val === "ENG" ? " $" : " ₴"}
            </b>
          </p>
        </div>

        {props.limit ? (
          <div
            className="top-info-confirm top-info-confirm-hover"
            style={{ height: `${divHeight}px` }}
          >
            <div onClick={changeHight}>
              <p className="top-info-p">
                <b>
                  <FormattedMessage id="budgetinfo.limit" />
                  {limitAll}
                  {contextDataUser.state.currency.val === "ENG" ? " $" : " ₴"}
                </b>
              </p>
              <span
                style={{ display: "block" }}
                className="select-imgArrow"
              ></span>
            </div>
            <input
              className="limit-input"
              ref={limitValue}
              value={limit}
              onInput={() => setLimit(limitValue.current.value)}
              type="number"
              placeholder="..."
            />
            <button
              disabled={limit === ""}
              className={limit === "" ? "limit-btn btn-disabled" : "limit-btn"}
              type="butoon"
              onClick={refreshUserLimit}
            >
              <b>
                <FormattedMessage id="budgetinfo.confirm" />
              </b>
            </button>
          </div>
        ) : null}
      </div>
      <div className="couple-circle">
        {window.innerWidth > 550 ? (
          <BigCircle
            balance={props.balance}
            procent={procent}
            limitAll={limitAll}
            isStatistics={props.isStatistics}
          />
        ) : null}
        <AlotCircle
          isStatistics={props.isStatistics}
          transactions={props.transactions}
          balance={props.balance}
          limitAll={limitAll}
          procent={procent}
        />
      </div>
      {window.innerWidth > 550 ? <Svipe /> : <SvipePhone />}
    </div>
  );
});
