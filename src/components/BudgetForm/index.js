import { useState, useContext, useEffect } from "react";

import { db } from "../../firebase/firebase";
import { UserSelect } from "../User/UserSelect";
import { AppContext } from "../../helpers/providers/context";
import { FormattedMessage } from "react-intl";
import { HalfFormInput, HalfLabel } from "../../helpers/styles/styled";
import { budgetFormSelect } from "./hardCode";
import { budgetForm } from "./hardCode";

import "./style.scss";

const typeOutlay = { text1: "type of outlay", text2: "Вид витрати" };

export const BudgetForm = (props) => {
  const contextDataUser = useContext(AppContext);
  const [isUser, changeUser] = useState(false);
  const [language, changeLanguage] = useState("ENG");
  const [selectData, setSelectData] = useState(budgetFormSelect);
  const [form, setForm] = useState(budgetForm);
  const [formSelect, changeFormSelect] = useState({
    val: "Home",
    name: "Home",
  });

  useEffect(() => {
    if (localStorage.getItem("language")) {
      const newLanguage = localStorage.getItem("language");
      changeLanguage(newLanguage);
      if (newLanguage === "ENG") {
        setSelectData(budgetFormSelect);
        changeFormSelect({
          val: "Home",
          name: "Home",
        });
      } else {
        setSelectData([
          { val: "Home", name: "Дім" },
          { val: "Car", name: "Авто" },
          { val: "Food", name: "Їжа" },
          { val: "Activities", name: "Розваги" },
        ]);
        changeFormSelect({
          val: "Home",
          name: "Дім",
        });
      }
    }
    if (localStorage.getItem("user")) {
      changeUser(true);
    } else if (!localStorage.getItem("user")) {
      changeUser(false);
    }
  }, [contextDataUser]);

  const onSubmit = async () => {
    let newUserData = {
      ...form,
      value: +form.value,
      type: formSelect,
      uid: contextDataUser.state.uid,
    };
    await db
      .collection("payment")
      .add(newUserData)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    setForm({
      value: "",
      date: new Date().toISOString().slice(0, 10),
      dateAndMonth: new Date().toISOString().slice(0, 7),
      comment: "",
    });
    props.onClose();
    props.onChange();
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className="budget-form">
      <div className="modal-exit">
        <UserSelect
          description={language === "ENG" ? typeOutlay.text1 : typeOutlay.text2}
          data={selectData}
          formSelect={formSelect}
          changeFormSelect={changeFormSelect}
        />
        <div
          type="button"
          className="modal-exit-button"
          onClick={props.onClose}
        ></div>
      </div>
      <div className="form-div">
        <HalfLabel className="half-label">
          <span>
            <b>
              <FormattedMessage id="budgetform.date" />
            </b>
          </span>
          <HalfFormInput
            onChange={onChange}
            value={form.date}
            type="date"
            name="date"
            className="half-form-input"
          />
        </HalfLabel>
        <HalfLabel className="half-label">
          <span>
            <b>
              <FormattedMessage id="budgetform.outlay" />
            </b>
          </span>
          <HalfFormInput
            value={form.value}
            onChange={onChange}
            type="number"
            name="value"
            className="half-form-input"
          />
        </HalfLabel>
      </div>
      <HalfLabel className="text-area-div">
        <span>
          <b>
            <FormattedMessage id="budgetform.comment" />
          </b>
        </span>
        <textarea
          name="comment"
          className="form-textarea"
          value={form.comment}
          onChange={onChange}
        ></textarea>
      </HalfLabel>
      {form.value === "" || form.value <= 0 || form.comment === "" ? (
        <p className="myError">
          <FormattedMessage id="budgetform.warningword" />
        </p>
      ) : null}
      {!isUser ? (
        <p className="myError">
          <FormattedMessage id="budgetform.warninguser" />
        </p>
      ) : null}
      <button
        onClick={onSubmit}
        type="button"
        className={
          form.value === "" || form.value <= 0 || form.comment === "" || !isUser
            ? "form-btn-commit btn-disabled"
            : "form-btn-commit"
        }
        disabled={
          form.value === "" || form.value <= 0 || form.comment === "" || !isUser
        }
      >
        <b>
          <FormattedMessage id="budgetform.button" />
        </b>
      </button>
    </form>
  );
};
