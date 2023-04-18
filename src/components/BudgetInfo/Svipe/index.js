import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { SvipeNav } from "./SvipeNav";

import "./style.scss";

export const Svipe = () => {
  const [leftStart, setLeftStart] = useState(0);
  const [left, setLeft] = useState(0);
  const [interval, changeInterval] = useState(null);
  const [mouseStart, changeMouseStart] = useState(0);
  const [canMove, changeCanMove] = useState(false);
  const [canNavigate, changecanNavigate] = useState(true);

  const svipeRef = useRef();

  let navigate = useNavigate();

  useEffect(() => {
    clearInterval(interval);
    changeInterval(
      setInterval(() => {
        setLeft((val) => {
          if (val <= -900) {
            return 0;
          } else if (val - 450 < -900) {
            return 0;
          } else {
            return val - 450;
          }
        });
      }, 10000)
    );
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const mouseDownCursorPosition = (e) => {
    setLeftStart(left);
    changeMouseStart(e.clientX);
    svipeRef.current.classList.add("none-duration");
    clearInterval(interval);
    changeCanMove(true);
    changecanNavigate(true);
  };
  const mouseUpCursorPosition = (name) => {
    if (canNavigate) {
      if (!name === "no") {
        navigate(`/main/${name}`);
      }
    }
    if (canMove) {
      svipeRef.current.classList.remove("none-duration");
      changeCanMove(false);
      if (left < leftStart) {
        if (left < -900) {
          setLeft(-900);
        } else {
          setLeft(leftStart - 450);
        }
      } else if (left > leftStart) {
        if (left > 0) {
          setLeft(0);
        } else {
          setLeft(leftStart + 450);
        }
      }

      changeInterval(
        setInterval(() => {
          setLeft((val) => {
            if (val <= -900) {
              return 0;
            } else if (val - 450 < -900) {
              return 0;
            } else {
              return val - 450;
            }
          });
        }, 10000)
      );
    }
  };
  const mouseMoveCursorPosition = (e) => {
    if (canMove) {
      changecanNavigate(false);
      if (e.clientX > mouseStart) {
        setLeft((val) => val + (e.clientX / e.clientX) * 2);
        changeMouseStart(e.clientX);
      } else if (e.clientX < mouseStart) {
        setLeft((val) => val - (e.clientX / e.clientX) * 2);
        changeMouseStart(e.clientX);
      }
    }
  };
  /////////SVIPE CLICK////////////
  const svipeNavClick = (val) => {
    setLeft(val);
  };

  return (
    <div className="main-svipe">
      <div className="svipe-container">
        <div className="svipe" style={{ left: left }} ref={svipeRef}>
          <div
            onMouseDown={mouseDownCursorPosition}
            onMouseUp={() => mouseUpCursorPosition("user")}
            onMouseMove={mouseMoveCursorPosition}
            onMouseOut={() => mouseUpCursorPosition("no")}
            className="svipe-item svipe-img1"
            name="user"
          >
            <div className="sv-div"></div>
            <div>
              <b>
                <FormattedMessage id="svipebudget.user" />
              </b>
            </div>
          </div>
          <div
            className="svipe-item svipe-img2"
            onMouseDown={mouseDownCursorPosition}
            onMouseUp={() => mouseUpCursorPosition("statistics")}
            onMouseMove={mouseMoveCursorPosition}
            onMouseOut={() => mouseUpCursorPosition("no")}
          >
            <div>
              <FormattedMessage id="svipebudget.statistics" />
            </div>
            <div className="sv-div"></div>
          </div>
          <div
            className="svipe-item svipe-img3"
            onMouseDown={mouseDownCursorPosition}
            onMouseUp={() => mouseUpCursorPosition("budget")}
            onMouseMove={mouseMoveCursorPosition}
            onMouseOut={() => mouseUpCursorPosition("no")}
          >
            <div>
              <FormattedMessage id="svipebudget.budget" />
            </div>
            <div className="sv-div"></div>
          </div>
        </div>
      </div>
      <SvipeNav position={left} svipeNavClick={svipeNavClick} />
    </div>
  );
};
