import firebase from "firebase/app";
import { db } from "../../../../firebase/firebase";
import { FormattedMessage } from "react-intl";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SubsContext } from "../../../../helpers/providers/contextsubs";
import { HalfFormInput, HalfLabel } from "../../../../helpers/styles/styled";

import "./style.scss";

export const IsUser = (props) => {
  const userSubscription = useContext(SubsContext);

  const [error, changeEroor] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");

  let navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "email") {
      changeEmail(e.target.value);
    } else {
      changePassword(e.target.value);
    }
  };

  const Login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        getUserInfo(user.uid);

        navigate("/main/budget");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        changeEroor(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };
  const getUserInfo = (uid) => {
    var docRef = db.collection("users").doc(`${uid}`);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          pushUser(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };
  const pushUser = async (userInfo) => {
    const user = userInfo.uid;
    await localStorage.setItem("user", user);
    userSubscription.dispatch({
      type: "change",
    });
  };

  return (
    <form className="user-form">
      <h3 className="user-log">
        <FormattedMessage id="userform.logintext" />
      </h3>
      <div className="form-div">
        <HalfLabel className="half-label">
          <span>
            <b>
              <FormattedMessage id="userform.email" />
            </b>
          </span>
          <HalfFormInput
            value={email}
            onChange={(e) => onChange(e)}
            type="text"
            name="email"
            className="half-form-input"
            placeholder="..."
          />
        </HalfLabel>
        <HalfLabel className="half-label">
          <span>
            <b>
              <FormattedMessage id="userform.password" />
            </b>
          </span>
          <HalfFormInput
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
            name=""
            className="half-form-input"
            placeholder="..."
          />
        </HalfLabel>
      </div>
      {password === "" || email === "" ? (
        <p className="myError">
          <FormattedMessage id="budgetform.warningword" />
        </p>
      ) : null}
      {error !== "" ? <p className="myError">{error}</p> : null}
      <button
        onClick={Login}
        type="button"
        className={
          password === "" || email === ""
            ? "user-form-btn btn-disabled"
            : "user-form-btn "
        }
        disabled={password === "" || email === ""}
      >
        <b>
          <FormattedMessage id="userform.btnlogin" />
        </b>
      </button>
      <p onClick={() => props.onChange()} className="no-account">
        <FormattedMessage id="userform.donthaveaccount" />
      </p>
    </form>
  );
};
