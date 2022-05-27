import React, {FC, useState} from 'react';
import styled from "styled-components";

export interface DropDownListProps {
    changePeriod:(e:string)=>void;
    value:string;
    optionsArray:{value:string,tittle:string}[]
}

const DropDownList: FC<DropDownListProps> = (props) => {


    return (
        <CustomSelect value={props.value} onChange={(e)=>props.changePeriod(e.target.value)}>
            {props.optionsArray.map((option)=>(
                <option key={option.value} value={option.value}>{option.tittle}</option>
            ))}
        </CustomSelect>

    );
};

export default DropDownList;



const CustomSelect = styled.select`
  max-width: 100%;
  padding: 7.5px 32px 7.5px 0;
  background-color: #fbfcfd;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 2px;
`