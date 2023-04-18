import { useState } from "react";

import { IsUser } from "./IsUser";
import { NoUser } from "./NoUser";

import "./style.scss";

export const UserFormLogin = () => {
  const [haveUser, changehaveUser] = useState(true);
  const onChange = () => changehaveUser((value) => !value);
  return (
    <>
      {haveUser ? (
        <IsUser onChange={onChange} />
      ) : (
        <NoUser onChange={onChange} />
      )}
    </>
  );
};
