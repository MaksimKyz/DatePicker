import React, {ChangeEvent, FC, useState} from 'react';
import CustomInput from "../../CustomInput/CustomInput";
import DropDownList from "../../DropDownList/DropDownList";
import CustomCheckbox from "../../CustomCheckbox/CustomCheckbox";
import styled from "styled-components";
import useInterval from "../../../hooks/useInterval";
import {arrInterval} from "../../../helpers";

export interface IntervalCreaterProps {
    onPeriodChange:Function
}

const IntervalCreator: FC<IntervalCreaterProps> = (props) => {


    const [valueInterval,setValueInterval] = useState<number>(0)
    const [period,setPeriod] = useState('s')
    const [isActiveInterval,setActiveInterval] = useState(false)


    const countInterval = (interval:number,isActiveInterval:boolean) =>{
        if (!isActiveInterval){
            return 0
        }
        if (period === 's')
            return interval*1000
        if (period === 'm')
            return interval*60*1000
        if (period === 'h')
            return interval*60*60*1000
    }

    useInterval(()=>props.onPeriodChange(),countInterval(valueInterval,isActiveInterval))

    const changeValueInterval = (e:ChangeEvent<HTMLInputElement>) =>{
        setValueInterval(Number(e.target.value))
    }
    const changePeriod = (e:string)=>{
        setPeriod(e)
    }
    const changeIsActiveInterval = (e:boolean) =>{
        setActiveInterval(e)
    }
    const disableCheckbox = valueInterval===0 && !isActiveInterval


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