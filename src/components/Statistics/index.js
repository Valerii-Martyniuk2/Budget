import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { db } from "../../firebase/firebase";

import { Outlays } from "../Outlays";
import { BudgetInfo } from "../BudgetInfo";
import { AppContext } from "../../helpers/providers/context";

import "./style.scss";

export const Statistics = () => {
  const contextDataUser = useContext(AppContext);

  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setBalance(0);
    db.collection("payment")
      .where("uid", "==", `${contextDataUser.state.uid}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let oneTransaction = doc.data();
          let date = oneTransaction.dateAndMonth;
          if (date.slice(0, 4) === new Date().toISOString().slice(0, 4)) {
            oneTransaction = {
              ...oneTransaction,
              id: doc.id,
            };
          }
          setTransactions((data) => [oneTransaction, ...data]);
          setBalance((data) => data + oneTransaction.value);
        });
      });

    return setTransactions([]);
  }, [setTransactions, contextDataUser, setBalance]);

  return (
    <>
      <main>
        <div className="spacerMT"></div>
        <div className="centerInfo">
          <span className="centerInfoTitle">
            <FormattedMessage id="menu.statistics" />
          </span>
        </div>

        <div className="outlays-budgetInfo">
          <BudgetInfo
            balance={balance}
            transactions={transactions}
            spent={<FormattedMessage id="budgetinfo.spentyear" />}
            limit={false}
            isStatistics={true}
          />
          <Outlays
            transactions={transactions}
            setOpen={() => navigate("/main/budget")}
          />
        </div>
      </main>
    </>
  );
};
