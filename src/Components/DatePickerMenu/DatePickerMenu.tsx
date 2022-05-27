import React, {FC} from 'react';
import styled from "styled-components";
import IntervalCreator from "./IntevalCreator/IntervalCreator";
import CommonlyUsed from "./CommonlyUsed/CommonlyUsed";
import {valuesDatePicker} from "../SuperDataPicker/SuperDataPicker";

export interface DatePickerMenuProps {
    onPeriodChange:Function
    clickCommonlyUsed:(start:valuesDatePicker,end:valuesDatePicker)=>void
}

const DatePickerMenu: FC<DatePickerMenuProps> = (props) => {


    return (
        <MenuContainer>
            Commonly used
            <CommonlyUsed clickCommonlyUsed={props.clickCommonlyUsed}/>
            Refresh every
            <IntervalCreator onPeriodChange={props.onPeriodChange}/>
        </MenuContainer>
    );
};

export default DatePickerMenu;

const MenuContainer = styled.div`
  padding: 10px;
`
