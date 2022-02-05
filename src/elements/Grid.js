import React from "react";
import styled from "styled-components";

const Gird = (props) => {
  const { is_flex, width, padding, margin, bg, children, center, _onClick} = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
  }
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  )
}

Gird.defaultProps = {
  children: null,
  width: "100%", //밖에 50%가 먹었음!
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {} //defaultProps는 어떤함수이다!
}

//..styles의 props
const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
 
  ${(props) => props.center ? `text-align: center;` : ""}
  
`;

export default Gird;