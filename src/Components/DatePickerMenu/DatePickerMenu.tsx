import React, {FC, useState} from 'react';
import styled from "styled-components";
import IntervalCreator from "./IntevalCreator/IntervalCreator";
import CommonlyUsed from "./CommonlyUsed/CommonlyUsed";
import {valuesDatePicker} from "../SuperDataPicker/SuperDataPicker";
import calendar from "../../assets/calendar.svg";
import DropDownDate from "../DropDownDate/DropDownDate";
import useInterval from "../../hooks/useInterval";

export interface DatePickerMenuProps {
    onPeriodChange:()=>void
    clickCommonlyUsed:(tittle:string,start:valuesDatePicker,end:valuesDatePicker)=>void
}

const DatePickerMenu: FC<DatePickerMenuProps> = (props) => {
    const [period,setPeriod] = useState('s')
    const [valueInterval,setValueInterval] = useState(0)
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

    const changeInterval = (period:string,value:number,isActive:boolean) =>{
        setPeriod(period)
        setValueInterval(value)
        setActiveInterval(isActive)
    }


    return (
        <DropDownDate width='50px' value={<img src={calendar}/>} position='left'>
            <MenuContainer>
                Commonly used
                <CommonlyUsed clickCommonlyUsed={props.clickCommonlyUsed}/>
                Refresh every
                <IntervalCreator
                    changeInterval={changeInterval}
                    period={period}
                    valueInterval={valueInterval}
                    isActiveInterval={isActiveInterval}
                />
            </MenuContainer>
        </DropDownDate>
    );
};

export default DatePickerMenu;

const MenuContainer = styled.div`
  padding: 10px;
`
