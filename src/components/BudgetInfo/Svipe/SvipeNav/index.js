import "./style.scss";

export const SvipeNav = (props) => {
  return (
    <div className="svipeNav-container">
      <div
        className="svipeNav"
        style={
          props.position === 0
            ? { boxShadow: " 0 0 15px 6px #bf702b" }
            : { boxShadow: "none" }
        }
        onClick={() => props.svipeNavClick(0)}
      ></div>
      <div
        className="svipeNav"
        style={
          props.position === -450
            ? { boxShadow: " 0 0 15px 6px #bf702b" }
            : { boxShadow: "none" }
        }
        onClick={() => props.svipeNavClick(-450)}
      ></div>
      <div
        className="svipeNav"
        style={
          props.position === -900
            ? { boxShadow: " 0 0 15px 6px #bf702b" }
            : { boxShadow: "none" }
        }
        onClick={() => props.svipeNavClick(-900)}
      ></div>
    </div>
  );
};
