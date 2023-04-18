import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { SvipeNavPhone } from "./SvipeNavPhone";

import "./style.scss";

export const SvipePhone = () => {
  const [windowWidth, setwindowWidth] = useState(
    (window.innerWidth / 100) * 95
  );
  const [leftStart, setLeftStart] = useState(0);
  const [left, setLeft] = useState(0);
  const [interval, changeInterval] = useState(null);
  const [mouseStart, changeMouseStart] = useState(0);
  const [canMove, changeCanMove] = useState(false);
  const [canNavigate, changecanNavigate] = useState(true);

  const svipeRef = useRef();

  let navigate = useNavigate();

  useEffect(() => {
    setwindowWidth((window.innerWidth / 100) * 95);
    clearInterval(interval);
    changeInterval(
      setInterval(() => {
        setLeft((val) => {
          if (val === -windowWidth * 2) setLeft(0);
          return val - windowWidth;
        });
      }, 10000)
    );
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const mouseDownCursorPosition = (e) => {
    setLeftStart(left);
    changeMouseStart(e.touches[0].pageX);
    svipeRef.current.classList.add("none-duration");
    clearInterval(interval);
    changeCanMove(true);
    changecanNavigate(true);
  };

  const mouseUpCursorPosition = (name) => {
    if (canNavigate) {
      navigate(`/main/${name}`);
    }
    if (canMove) {
      svipeRef.current.classList.remove("none-duration");

      changeCanMove(false);
      if (left < leftStart) {
        if (left < -windowWidth * 2) {
          setLeft(-windowWidth * 2);
        } else {
          setLeft(leftStart - windowWidth);
        }
      } else if (left > leftStart) {
        if (left > 0) {
          setLeft(0);
        } else {
          setLeft(leftStart + windowWidth);
        }
      }

      changeInterval(
        setInterval(() => {
          setLeft((val) => {
            if (val === -windowWidth * 2) setLeft(0);
            return val - windowWidth;
          });
        }, 10000)
      );
    }
  };

  const mouseMoveCursorPosition = (e) => {
    if (canMove) {
      changecanNavigate(false);
      if (e.touches[0].pageX > mouseStart) {
        setLeft((val) => val + (e.touches[0].pageX / e.touches[0].pageX) * 2);
        changeMouseStart(e.touches[0].pageX);
      } else if (e.touches[0].pageX < mouseStart) {
        setLeft((val) => val - (e.touches[0].pageX / e.touches[0].pageX) * 2);
        changeMouseStart(e.touches[0].pageX);
      }
    }
  };
  /////////SVIPE CLICK////////////
  const svipeNavClick = (val) => {
    setLeft(val);
  };

  return (
    <div className="main-svipePhone">
      <div className="svipePhone-container">
        <div className="svipePhone" style={{ left: left }} ref={svipeRef}>
          <div
            onTouchStart={mouseDownCursorPosition}
            onTouchMove={mouseMoveCursorPosition}
            onTouchEnd={() => mouseUpCursorPosition("user")}
            onTouchCancel={() => mouseUpCursorPosition("user")}
            className="svipePhone-item svipe-img1"
            name="user"
          >
            <div className="svPhone-div"></div>
            <div>
              <b>
                <FormattedMessage id="svipebudget.user" />
              </b>
            </div>
          </div>
          <div
            className="svipePhone-item svipe-img2"
            onTouchStart={mouseDownCursorPosition}
            onTouchMove={mouseMoveCursorPosition}
            onTouchEnd={() => mouseUpCursorPosition("statistics")}
            onTouchCancel={() => mouseUpCursorPosition("statistics")}
          >
            <div>
              <FormattedMessage id="svipebudget.statistics" />
            </div>
            <div className="svPhone-div"></div>
          </div>
          <div
            className="svipePhone-item svipe-img3"
            onTouchStart={mouseDownCursorPosition}
            onTouchMove={mouseMoveCursorPosition}
            onTouchEnd={() => mouseUpCursorPosition("budget")}
            onTouchCancel={() => mouseUpCursorPosition("/")}
          >
            <div>
              <FormattedMessage id="svipebudget.budget" />
            </div>
            <div className="svPhone-div"></div>
          </div>
        </div>
      </div>
      <SvipeNavPhone position={left} svipeNavClick={svipeNavClick} />
    </div>
  );
};
