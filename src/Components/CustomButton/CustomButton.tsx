import React, {FC} from 'react';
import styled from "styled-components";

export interface CustomButtonProps {
    children:string|React.ReactElement,
    onClick?:()=>void,
    disabled?:boolean
}

const CustomButton: FC<CustomButtonProps> = (props) => {

    return (
        <Button disabled={props.disabled} onClick={props.onClick}>
            {props.children}
        </Button>
    );
};

export default CustomButton;

const Button = styled.button<{width?:string,disabled:boolean}>`
  background-color: #006BB4;
  border: solid 1px transparent;
  border-radius: 4px;
  height: 100%;
  width:${props=>props.width || '100%'} ;
  padding: 8px 12px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 2px 2px -1px rgb(54 97 126 / 30%);
  color: #FFF;
  transition:0.2s;
  :hover{
    transform: ${props => props.disabled?'':'translateY(-3px)'};
    background-color: ${props =>props.disabled?'':'#005c9b'};
  }
  :disabled{
    background: lightgray;
    color: black;
  }
`