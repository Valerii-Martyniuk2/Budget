import { useEffect, useRef, useState, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { db } from "../../firebase/firebase";
import { SubsContext } from "../../helpers/providers/contextsubs";

import "./style.scss";

export const Outlays = (props) => {
  const userSubscription = useContext(SubsContext);

  const navigate = useNavigate();

  const [startHight, setStartHight] = useState(0);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.addEventListener("scroll", onScroll);
  }, []);

  const onScroll = (e) => {
    let number = Math.floor(e.target.scrollTop / 170);
    setStartHight(number < 0 ? 0 : number);
  };

  const deleteOutlay = (doc) => {
    db.collection("payment")
      .doc(doc)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    userSubscription.dispatch({
      type: "change",
    });
  };

  return (
    <div className="outlay-half-container">
      <h3>
        <b>
          <FormattedMessage id="outlays.list" />
        </b>
      </h3>
      <div className="outlay-half" ref={scrollRef}>
        <div style={{ height: `${170 * startHight}px`, width: "100%" }} />
        {props.transactions
          .slice(startHight, startHight + 5)
          .map((item, index) => (
            <div className="one-outlay" key={startHight + item.comment + index}>
              <p className="budger-special-p top-info-p">
                <FormattedMessage id="outlays.value" /> {item.value}
                <button
                  className="outlays-btn-delete"
                  onClick={() => deleteOutlay(item.id)}
                  type="button"
                >
                  <b>
                    <FormattedMessage id="outlays.delete" />
                  </b>
                </button>
              </p>
              <p className="top-info-p">
                <FormattedMessage id="outlays.type" />
                <span
                  alt="type"
                  className={`select-img select-img${item.type.val}`}
                />
                {item.type.name}
              </p>
              <p className="top-info-p">
                <FormattedMessage id="outlays.comment" />
                {item.comment.length > 50
                  ? item.comment.slice(0, 50)
                  : item.comment}
              </p>
            </div>
          ))}
        {props.transactions.length === 0 ? (
          <>
            <div className="one-outlay">
              <h2>
                <b>
                  <FormattedMessage id="outlays.nooutlays" />
                </b>
              </h2>
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fform%2Ftransaction-costs-1.png?alt=media&token=2968c722-f15a-434d-af85-4a0cf1720121"
                  alt="noOutlays"
                />
              </div>
            </div>
            <div
              className="one-outlay top-info-confirm-hover"
              onClick={props.setOpen}
            >
              <h2>
                <b>
                  <FormattedMessage id="outlays.newoutlays" />
                </b>
              </h2>
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fform%2FLovepik_com-450092747-money%20transaction%20flat%20illustration%20editable%20vector.png?alt=media&token=d2b11c0d-31bb-4cca-b0a1-4e80eebb372f"
                  alt="newOutlays"
                />
              </div>
            </div>
            <div
              className="one-outlay top-info-confirm-hover"
              onClick={() => navigate("/main/user")}
            >
              <h2>
                <b>
                  <FormattedMessage id="outlays.logoutlays" />
                </b>
              </h2>
              <div>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fform%2Flogin.png?alt=media&token=9c5f5826-1802-427d-bbec-0f99bac481c1"
                  alt="Login"
                />
              </div>
            </div>
          </>
        ) : null}
        <div
          style={{
            height: `${170 * (props.transactions.length - 5 - startHight)}px`,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};
