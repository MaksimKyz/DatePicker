import React, {FC, useState} from 'react';
import styled from "styled-components";

export interface CustomCheckboxProps {
    isActive:boolean;
    onChange:(e:boolean)=>void;
    isDisabled?:boolean;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({isDisabled,isActive,onChange}) => {

    const change = () =>{
        if (!isDisabled){
            onChange(!isActive)
        }
    }

    return (
        <CheckBoxContainer
            isDisabled={isDisabled}
            isActive={isActive}
            onClick={change}
        >
            <CheckBoxThumb isActive={isActive}/>
        </CheckBoxContainer>
    );
};

export default CustomCheckbox;


const CheckBoxContainer = styled.div<{isActive:boolean,isDisabled:boolean}>`
  margin: 2px 0 ;
  width: 44px;
  height: 20px;
  background: ${props => props.isActive?'#1ba8f6':'#ebecef'};
  border-radius: 20px;
  cursor: ${props => props.isDisabled?'not-allowed':'pointer'};
  position: relative;
  display: flex;
  justify-content: center;
`
const CheckBoxThumb = styled.div<{isActive:boolean}>`
  box-shadow: 0 2px 2px -1px rgb(0 0 0 / 30%);
  padding: 10px;
  border: 1px solid #66676d;
  background: #fff;
  border-radius: 20px;
  position: absolute;
  display: inline-block;
  top: -1px;
  left: ${props => props.isActive?'24px':'0'};
  transition: 0.2s;
`