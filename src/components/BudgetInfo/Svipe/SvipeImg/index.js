import "./style.scss";
export const SvipeImg = (props) => {
  return (
    <div className={props.myclass}>
      <div className="sv-div"></div>
      <div>
        <b>{props.message}</b>
      </div>
    </div>
  );
};
