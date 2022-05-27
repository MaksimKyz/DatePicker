import React, {ChangeEvent, FC} from 'react';
import styled from "styled-components";
import arrow from '../../assets/arrow.svg'



export interface CustomInputProps {
    value:string|number;
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void;
    width?:string
}

const CustomInput: FC<CustomInputProps> = (props) => {
    return (
        <InputContainer>
            <Input width={props.width} type={typeof props.value} value={props.value} onChange={(e)=>props.onChange(e)}/>
        </InputContainer>
    );
};

export default CustomInput;

const InputContainer = styled.div`
  position: relative;
  max-width: 100%;
`

const Input = styled.input<{width:string}>`
  width: ${props => props.width ||''};
  padding: 8px;
  background-color: #fbfcfd;
  outline: none;
  border:1px solid lightgrey;
  :focus{
    border-bottom: 1px solid blue;
  }
`