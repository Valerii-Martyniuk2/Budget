import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { UserForm } from "./UserForm";
import { UserFormLogin } from "./UserFormLogin";

import "./style.scss";

export const User = () => {
  const [isUser, changeUserStatus] = useState(false);
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      changeUserStatus(true);
    } else {
      changeUserStatus(false);
    }
  }, [subscription]);

  const changeSubscription = () => {
    setSubscription((val) => !val);
  };

  return (
    <>
      <div className="spacerMT" style={{ width: "90%" }} />
      <div className="centerInfo">
        <span className="centerInfoTitle">
          <FormattedMessage id="userform.settings" />
        </span>
      </div>

      {isUser ? (
        <UserForm setSubscription={changeSubscription} />
      ) : (
        <UserFormLogin />
      )}
    </>
  );
};
