import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useContext, useEffect } from "react";

import Layout from "../Layout";

import { db } from "../../firebase/firebase";
import { ErrorPage } from "../ErrorPage";
import { Budget } from "../Budget";
import { User } from "../User";
import { AppContext } from "../../helpers/providers/context";
import { LanguageContext } from "../../helpers/providers/languageContext/languageContext";
import { SubsContext } from "../../helpers/providers/contextsubs";
import { Statistics } from "../Statistics";
import { Preview } from "../Preview";

import "./style.scss";

function App() {
  const contextDataUser = useContext(AppContext);
  const contextLanguage = useContext(LanguageContext);
  const userSubscription = useContext(SubsContext);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setLanguage();
    }
    setUser();
    // eslint-disable-next-line
  }, [userSubscription]);

  const setUser = () => {
    if (localStorage.getItem("user")) {
      const myUser = localStorage.getItem("user");
      var docRef = db.collection("users").doc(`${myUser}`);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            contextDataUser.dispatch({
              type: "setUser",
              user: doc.data(),
            });
            let language = doc.data().language.val;
            localStorage.setItem("language", language);
            setLanguage();
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

      ///////
    } else {
      contextDataUser.dispatch({
        type: "reset",
      });
    }
  };

  const setLanguage = () => {
    if (localStorage.getItem("language")) {
      let language = localStorage.getItem("language");
      contextLanguage.dispatchLanguage({
        type: "setLanguage",
        language: { language },
      });
    }
  };

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <Preview />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/main",
      element: <Layout />,
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          path: "/main/budget",
          element: <Budget />,
        },
        {
          path: "/main/statistics",
          element: <Statistics />,
        },
        {
          path: "/main/user",
          element: <User />,
        },
      ],
    },
  ]);

  return <RouterProvider router={Router} fallbackElement={<>LOADING!</>} />;
}

export default App;
