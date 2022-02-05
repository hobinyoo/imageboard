import React from "react";
import styled from "styled-components";

const ListGrid = (props) => {
  const { is_flex, width, padding, margin, bg, children, center} = props;

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
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  )
}

ListGrid.defaultProps = {
  children: null,
  width: "100%", 
  padding: false,
  margin: false,
  bg: false,
  center: false,
}


const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""}
 
  ${(props) => props.center ? `text-align: center;` : ""}
  @media only screen and (max-width: 768px) {
    width: ${(props) => (props.width? "80%" : "")};
    margin : ${(props) => (props.margin? "10px auto 0px auto" : "")};
  }
`;

export default ListGrid;