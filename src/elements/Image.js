import styled from 'styled-components';
import React from "react";

const Image = (props) => {
    const {shape, src, size, margin, padding, width, marginLeft} = props;

    const styles = {
        src: src,
        size: size,
        margin: margin,
        padding: padding,
        width: width,
        marginLeft: marginLeft,
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter {...styles}>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            <ImageDefault {...styles}></ImageDefault>
        </React.Fragment>
    )
}

Image.defaultProps = {
  shape: "circle",
  src: "",
  size: 36,
  margin: false,
  padding: false,
  width: false,
  marginLeft: false,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
 
 
`;

const AspectOutter = styled.div`
    ${(props) => (props.width ? `width: ${props.width};` : "")}
    max-height: 100%
    display: flex;
    
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
    ${(props) => (props.marginLeft ? `margin-left: ${props.marginLeft};` : "")}
    @media only screen and (max-width: 500px) {
        min-width: 70%;
      }
`;

const AspectInner = styled.div`
    padding-top: 75%;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    display: block;
`;
//이미지는 block을 해줘야함!

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin: 4px;

`;

export default Image;