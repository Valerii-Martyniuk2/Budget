import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { db } from "../../../firebase/firebase";
import { AppContext } from "../../../helpers/providers/context";
import { SubsContext } from "../../../helpers/providers/contextsubs";
import { HalfFormInput, HalfLabel } from "../../../helpers/styles/styled";
import { Animation } from "../../PortalAnimation/Animation";
import { UserSelect } from "../UserSelect";
import { userSelectData } from "./hardCode";
import { userSelectDataCurrency } from "./hardCode";
import { userFormSelect } from "./hardCode";
import { userFormSelectCurrency } from "./hardCode";
import { userUserInfo } from "./hardCode";

import "./style.scss";

const selectData = userSelectData;
const selectDataCurrency = userSelectDataCurrency;

export const UserForm = (props) => {
  const navigate = useNavigate();
  const contextDataUser = useContext(AppContext);
  const userSubscription = useContext(SubsContext);

  const [formSelect, changeFormSelect] = useState(userFormSelect);
  const [formSelectCurrency, changeFormSelectCurrency] = useState(
    userFormSelectCurrency
  );
  const [userInfo, changeUserInfo] = useState(userUserInfo);
  const [openAnimation, setOpenAnimation] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      changeUserInfo(contextDataUser.state);
      changeFormSelect(contextDataUser.state.language);
      changeFormSelectCurrency(contextDataUser.state.currency);
    }
  }, [contextDataUser]);

  const onChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    changeUserInfo({ ...userInfo, [name]: value });
  };

  const saveUserInfo = (e) => {
    setOpenAnimation(true);
    setTimeout(() => {
      setOpenAnimation(false);
    }, 12000);
    let newUser = {
      name: userInfo.name,
      email: userInfo.email,
      language: formSelect,
      currency: formSelectCurrency,
      uid: userInfo.uid,
      limit: userInfo.limit,
    };
    db.collection("users")
      .doc(`${e}`)
      .set(newUser)
      .then(() => {
        console.log("Document successfully written!");
        localStorage.setItem("user", userInfo.uid);
        userSubscription.dispatch({
          type: "change",
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    props.setSubscription();
    userSubscription.dispatch({
      type: "change",
    });
  };

  return (
    <>
      <form className="user-form">
        <Animation open={openAnimation} />
        <h3 className="user-log">
          <b>
            <FormattedMessage id="userform.addchanges" />
          </b>
        </h3>
        <div className="form-div">
          <HalfLabel className="half-label">
            <span>
              <b>
                <FormattedMessage id="userform.name" />
              </b>
            </span>
            <HalfFormInput
              value={userInfo.name}
              onChange={(e) => onChange(e)}
              type="text"
              name="name"
              className="half-form-input"
              placeholder="Name here..."
            />
          </HalfLabel>
          <HalfLabel className="half-label">
            <span>
              <b>
                <FormattedMessage id="userform.email" />
              </b>
            </span>
            <HalfFormInput
              value={userInfo.email}
              onChange={(e) => onChange(e)}
              type="text"
              name="email"
              className="half-form-input"
              placeholder="Email here..."
            />
          </HalfLabel>
        </div>
        <div className="form-div">
          <UserSelect
            description={<FormattedMessage id="userform.language" />}
            data={selectData}
            formSelect={formSelect}
            changeFormSelect={changeFormSelect}
          />
          <UserSelect
            description={<FormattedMessage id="userform.currency" />}
            data={selectDataCurrency}
            formSelect={formSelectCurrency}
            changeFormSelect={changeFormSelectCurrency}
          />
        </div>
        <p>
          <FormattedMessage id="userform.warning" />
        </p>
        <div className="form-div">
          <button
            onClick={() => saveUserInfo(userInfo.uid)}
            type="button"
            className="user-form-btn half-label"
          >
            <b>
              <FormattedMessage id="userform.btnsave" />
            </b>
          </button>
          <button
            onClick={logOut}
            type="button"
            className="user-form-btn half-label"
          >
            <b>
              <FormattedMessage id="userform.btnout" />
            </b>
          </button>
        </div>
        <div className="form-div">
          <button
            onClick={() => {
              navigate("/");
            }}
            type="button"
            className="user-form-btn half-label"
          >
            <b>
              <FormattedMessage id="userform.btnstartpage" />
            </b>
          </button>
        </div>
      </form>
    </>
  );
};
