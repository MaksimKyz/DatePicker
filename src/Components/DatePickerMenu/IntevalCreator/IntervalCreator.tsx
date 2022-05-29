import React, {ChangeEvent, FC, useState} from 'react';
import CustomInput from "../../CustomInput/CustomInput";
import DropDownList from "../../DropDownList/DropDownList";
import CustomCheckbox from "../../CustomCheckbox/CustomCheckbox";
import styled from "styled-components";
import useInterval from "../../../hooks/useInterval";
import {arrInterval} from "../../../helpers";

export interface IntervalCreatorProps {
    period:string
    valueInterval:number
    isActiveInterval:boolean
    changeInterval:(period:string,value:number,isActive:boolean)=>void
}

const IntervalCreator: FC<IntervalCreatorProps> = ({period,valueInterval,isActiveInterval,changeInterval}) => {

    const disableCheckbox = valueInterval===0 && !isActiveInterval

    const changeValueInterval = (e:ChangeEvent<HTMLInputElement>) => {
        changeInterval(period,Number(e.target.value),isActiveInterval)
    }
    const changePeriod = (e:string) => {
        changeInterval(e,valueInterval,isActiveInterval)
    }

    const changeIsActiveInterval = (isActive:boolean) => {
        changeInterval(period,valueInterval,isActive)
    }

    return (
        <IntervalContainer>
            <CustomInput value={valueInterval} onChange={(e)=>changeValueInterval(e)}/>
            <DropDownList optionsArray={arrInterval} value={period} changePeriod={changePeriod}/>
            <CustomCheckbox isDisabled={disableCheckbox} isActive={isActiveInterval} onChange={changeIsActiveInterval}/>
        </IntervalContainer>
    );
};

export default IntervalCreator;


const MenuContainer = styled.div`
  padding: 10px;
`

const IntervalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`