import firebase from "firebase/app";
import { useContext, useState } from "react";
import { db } from "../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { UserSelect } from "../../UserSelect";
import { SubsContext } from "../../../../helpers/providers/contextsubs";
import { HalfFormInput, HalfLabel } from "../../../../helpers/styles/styled";
import { noUserSelectData, noUserSelectDataCurrency } from "./hardCode";
import { noUserFormSelect, noUserFormSelectCurrency } from "./hardCode";

import "./style.scss";

const selectData = noUserSelectData;
const selectDataCurrency = noUserSelectDataCurrency;

export const NoUser = (props) => {
  const userSubscription = useContext(SubsContext);
  const [formSelect, changeFormSelect] = useState(noUserFormSelect);
  const [formSelectCurrency, changeFormSelectCurrency] = useState(
    noUserFormSelectCurrency
  );

  const [email, changeEmail] = useState("");
  const [name, changeName] = useState("");
  const [password, changePassword] = useState("");
  const [secondPassword, changeSecondPassword] = useState("");
  const [errorMessage, changeErrorMessage] = useState({});

  let navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "email") {
      changeEmail(e.target.value);
    } else if (e.target.name === "secondPassword") {
      changeSecondPassword(e.target.value);
    } else if (e.target.name === "name") {
      changeName(e.target.value);
    } else {
      changePassword(e.target.value);
    }
  };

  const myValidation = (e) => {
    const RegExpPassword = /^\w{6,}$/;
    const RegExpEmail = /\w+@\w+\.\w+/;
    if (e.target.name === "email") {
      if (!RegExpEmail.test(e.target.value)) {
        changeErrorMessage({
          ...errorMessage,
          email: <FormattedMessage id="budgetform.warningemailreg" />,
        });
      }
      if (RegExpEmail.test(e.target.value)) {
        changeErrorMessage({
          ...errorMessage,
          email: "",
        });
      }
    } else if (e.target.name === "password") {
      if (!RegExpPassword.test(e.target.value)) {
        changeErrorMessage({
          ...errorMessage,
          password: <FormattedMessage id="budgetform.warningpasswordreg" />,
        });
      }
      if (RegExpPassword.test(e.target.value)) {
        changeErrorMessage({
          ...errorMessage,
          password: "",
        });
      }
    }
  };

  const changeAll = (e) => {
    onChange(e);
    myValidation(e);
  };

  const newUser = (e) => {
    let newUser = {
      name: name,
      email: email,
      language: formSelect,
      currency: formSelectCurrency,
      uid: e,
      limit: 1000,
    };
    db.collection("users")
      .doc(`${e}`)
      .set(newUser)
      .then(() => {
        console.log("Document successfully written!");
        localStorage.setItem("user", newUser.uid);
        navigate("/main/budget");
        userSubscription.dispatch({
          type: "change",
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const createUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        newUser(user.uid);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage1 = error.message;
        console.log(errorMessage, errorCode);
        changeErrorMessage({
          ...errorMessage,
          authError: errorMessage1,
        });
        // ..
      });
  };

  return (
    <>
      <form className="user-form">
        <h3 className="user-log">Please create account</h3>
        <div className="form-div">
          <HalfLabel className="half-label">
            <span>
              <b>
                <FormattedMessage id="userform.name" />
              </b>
            </span>
            <HalfFormInput
              value={name}
              onChange={(e) => changeAll(e)}
              type="text"
              name="name"
              className="half-form-input"
              placeholder="..."
            />
          </HalfLabel>
          <HalfLabel className="half-label">
            <span>
              <b>
                <FormattedMessage id="userform.email" />
              </b>
            </span>
            <HalfFormInput
              onChange={(e) => changeAll(e)}
              value={email}
              type="text"
              name="email"
              className="half-form-input"
              placeholder="..."
            />
          </HalfLabel>
        </div>
        <div className="form-div">
          <HalfLabel className="half-label">
            <span>
              <b>
                <FormattedMessage id="userform.password" />
              </b>
            </span>
            <HalfFormInput
              onChange={(e) => changeAll(e)}
              value={password}
              type="password"
              name="password"
              className="half-form-input"
              placeholder="..."
            />
          </HalfLabel>
          <HalfLabel className="half-label">
            <span>
              <b>
                <FormattedMessage id="userform.secondpassword" />
              </b>
            </span>
            <HalfFormInput
              onChange={(e) => changeAll(e)}
              value={secondPassword}
              type="password"
              name="secondPassword"
              className="half-form-input"
              placeholder="..."
            />
          </HalfLabel>
        </div>
        <div className="form-div">
          <UserSelect
            description={<FormattedMessage id="userform.currency" />}
            data={selectDataCurrency}
            formSelect={formSelectCurrency}
            changeFormSelect={changeFormSelectCurrency}
          />
          <UserSelect
            description={<FormattedMessage id="userform.language" />}
            data={selectData}
            formSelect={formSelect}
            changeFormSelect={changeFormSelect}
          />
        </div>
        {secondPassword === "" ||
        password === "" ||
        name === "" ||
        email === "" ? (
          <p className="myError">
            <FormattedMessage id="budgetform.warningword" />
          </p>
        ) : null}
        {password !== secondPassword ? (
          <p className="myError">
            <FormattedMessage id="budgetform.warningpassword" />
          </p>
        ) : null}
        {Object.values(errorMessage).map((item, index) => (
          <p key={index} className="myError">
            {item}
          </p>
        ))}
        <button
          onClick={createUser}
          type="button"
          className={
            secondPassword === "" ||
            password === "" ||
            name === "" ||
            email === "" ||
            password !== secondPassword
              ? "user-form-btn btn-disabled"
              : "user-form-btn"
          }
          disabled={
            secondPassword === "" ||
            password === "" ||
            name === "" ||
            email === "" ||
            password !== secondPassword
          }
        >
          <b>
            <FormattedMessage id="userform.register" />
          </b>
        </button>
        <p onClick={() => props.onChange()} className="no-account">
          <FormattedMessage id="userform.haveaccount" />
        </p>
      </form>
    </>
  );
};
