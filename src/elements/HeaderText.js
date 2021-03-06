import React from "react";
import styled from "styled-components";

const HeaderText = (props) => {
  const { bold, color, size, children, _onClick } = props;

  const styles = {bold: bold, color: color, size: size};
  return (
      <P {...styles} onClick={_onClick}>
          {children}
      </P>
  )
};

HeaderText.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  _onClick: () => {},
};

const P = styled.p`
  color: ${(props) => props.color};
  transition: ease all .1s;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "700" : "400")};
  @media only screen and (max-width: 768px) {
    font-size: ${(props) => (props.size? "20px" : "")};
  }
  @media only screen and (max-width: 500px) {
    font-size: ${(props) => (props.size? "18px" : "")};
  }
`;

export default HeaderText;