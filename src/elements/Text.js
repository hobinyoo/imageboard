import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children } = props;

  const styles = {bold: bold, color: color, size: size};
  return (
      <P {...styles}>
          {children}
      </P>
  )
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
};

const P = styled.p`
  color: ${(props) => props.color};
  transition: ease all .1s;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "700" : "400")};
  @media only screen and (max-width: 500px) {
    font-size: ${(props) => (props.size? "12px": "24px")};
  }
`;

export default Text;