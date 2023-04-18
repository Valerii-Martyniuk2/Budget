import { NavLink, Outlet, useLocation, useNavigation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useEffect } from "react";
import { useContext } from "react";

import { ThemeContext } from "../../helpers/providers/theme/themeContext";
import { HeaderNav } from "../../helpers/styles/styled";
import { ThemeSubs } from "../../helpers/providers/themeSubscription/themeSubscription";

import "./style.scss";
import "./menu-hover.scss";

const Layout = () => {
  const { state } = useNavigation();
  const location = useLocation();

  const themeSubscription = useContext(ThemeSubs);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      document.getElementById("body").classList.add("pink-theme");
      localStorage.setItem("theme", true);
      themeSubscription.dispatchThemeSubs({
        type: "change",
      });
      themeContext.dispatchTheme({
        type: "setTheme",
        theme: { theme: true },
      });
    }
    // eslint-disable-next-line
  }, []);

  const addPinkTheme = () => {
    if (document.getElementById("body").classList.contains("pink-theme")) {
      document.getElementById("body").classList.remove("pink-theme");
      localStorage.removeItem("theme");
      themeSubscription.dispatchThemeSubs({
        type: "change",
      });
      themeContext.dispatchTheme({
        type: "setTheme",
        theme: { theme: false },
      });
    } else {
      document.getElementById("body").classList.add("pink-theme");
      localStorage.setItem("theme", true);
      themeSubscription.dispatchThemeSubs({
        type: "change",
      });
      themeContext.dispatchTheme({
        type: "setTheme",
        theme: { theme: true },
      });
    }
  };

  return (
    <>
      <header id="header">
        <HeaderNav className="header-nav">
          <NavLink className="navigate-point " to="/main/budget">
            <div className="home-icon home-icon1"></div>
            <span>
              <b>
                <FormattedMessage id="menu.home" />
              </b>
            </span>
          </NavLink>

          <NavLink className="navigate-point" to="/main/statistics">
            <div className="home-icon home-icon2"></div>
            <span>
              <b>
                <FormattedMessage id="menu.statistics" />
              </b>
            </span>
          </NavLink>

          <NavLink className="navigate-point" to="/main/user">
            <div className="home-icon home-icon3"></div>
            <span>
              <b>
                <FormattedMessage id="menu.cabinet" />
              </b>
            </span>
          </NavLink>

          <div className="navigate-point" onClick={addPinkTheme}>
            <div className="home-icon home-icon4"></div>
            <span>
              <b>
                <FormattedMessage id="menu.theme" />
              </b>
            </span>
          </div>
        </HeaderNav>

        <Outlet></Outlet>

        <h1> {state === "loading" ? "i am loading" : null}</h1>
      </header>
    </>
  );
};

export default Layout;
