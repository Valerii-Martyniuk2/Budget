import styled from "styled-components";

import "./helpstyle.scss";

export const HalfDiv = styled.div`
  span {
    background-color: ${(props) =>
      props.theme.theme ? "rgb(174, 136, 143)" : "rgb(32, 36, 40)"};
  }
`;
export const HalfFormDiv = styled.div`
  background-color: ${(props) =>
    props.theme.theme ? "rgb(174, 136, 143)" : "rgb(32, 36, 40)"};
`;

export const HalfLabel = styled.label`
  span {
    background-color: ${(props) =>
      props.theme.theme ? "rgb(174, 136, 143)" : "rgb(32, 36, 40)"};
  }
`;
export const HalfFormInput = styled.input`
  background-color: ${(props) =>
    props.theme.theme ? "rgb(174, 136, 143)" : "rgb(32, 36, 40)"};
`;

export const ModalContent = styled.div`
  background-color: ${(props) =>
    props.theme.theme ? "rgb(174, 136, 143)" : "rgb(32, 36, 40)"};
`;
export const HeaderNav = styled.nav`
  background: ${(props) =>
    props.theme.theme
      ? "linear-gradient(90deg, rgba(235,138,2,1) 0%, rgba(2,146,235,1) 100%)"
      : "linear-gradient( 90deg,rgba(22, 22, 34, 1) 0%,rgba(8, 6, 41, 1) 18%, rgba(0, 34, 14, 1) 77%)"};
`;
