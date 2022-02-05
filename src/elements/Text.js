import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, center} = props;

  const styles = { bold: bold, color: color, size: size, center: center };
  
  
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
  center: false,
};

const P = styled.p`
  ${(props) => props.center ? `text-align: center;` : ""}
  color: ${(props) => props.color};
  transition: ease all .1s;
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  @media only screen and (max-width: 500px) {
   
  }
`;


export default Text;