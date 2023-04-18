import { useState, useEffect, useContext } from "react";

import { db } from "../../firebase/firebase";

import { Modal } from "../Modal";
import { BudgetForm } from "../BudgetForm";
import { Outlays } from "../Outlays";
import { BudgetInfo } from "../BudgetInfo";
import { AppContext } from "../../helpers/providers/context";
import { FormattedMessage } from "react-intl";
import { Animation } from "../PortalAnimation/Animation";

import "./style.scss";

export const Budget = () => {
  const contextDataUser = useContext(AppContext);

  const [openModal, setOpenModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [subscription, setSubscription] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [openAnimation, setOpenAnimation] = useState(false);

  useEffect(() => {
    setBalance(0);
    db.collection("payment")
      .where("dateAndMonth", "==", new Date().toISOString().slice(0, 7))
      .where("uid", "==", `${contextDataUser.state.uid}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let oneTransaction = doc.data();
          oneTransaction = {
            ...oneTransaction,
            id: doc.id,
          };
          setTransactions((data) => [oneTransaction, ...data]);
          setBalance((data) => data + oneTransaction.value);
        });
      });

    return () => {
      setTransactions([]);
    };
  }, [setTransactions, subscription, contextDataUser, setBalance]);

  const onChange = () => {
    setSubscription((subscr) => !subscr);
    setOpenAnimation(true);
    setTimeout(() => {
      setOpenAnimation(false);
    }, 12000);
  };

  return (
    <>
      <main>
        <Animation open={openAnimation} />
        <div className="spacerMT"></div>
        <div className="centerInfo">
          <span className="centerInfoTitle">
            <FormattedMessage id="menu.home" />
          </span>
        </div>
        <div
          className="but-add"
          onClick={() => setOpenModal((argument) => !argument)}
        />
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <BudgetForm
            onChange={onChange}
            onClose={() => setOpenModal(false)}
          ></BudgetForm>
        </Modal>

        <div className="outlays-budgetInfo">
          <BudgetInfo
            balance={balance}
            transactions={transactions}
            spent={<FormattedMessage id="budgetinfo.spent" />}
            limit={true}
            isStatistics={false}
          />
          <Outlays
            transactions={transactions}
            setOpen={() => setOpenModal((argument) => !argument)}
          />
        </div>
      </main>
    </>
  );
};
