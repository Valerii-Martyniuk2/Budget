export const SvipeNavPhone = (props) => {
  const width = (window.innerWidth / 100) * 95;
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
          props.position === -width
            ? { boxShadow: " 0 0 15px 6px #bf702b" }
            : { boxShadow: "none" }
        }
        onClick={() => props.svipeNavClick(-width)}
      ></div>
      <div
        className="svipeNav"
        style={
          props.position === -width * 2
            ? { boxShadow: " 0 0 15px 6px #bf702b" }
            : { boxShadow: "none" }
        }
        onClick={() => props.svipeNavClick(-width * 2)}
      ></div>
    </div>
  );
};
