import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import MonthSwitcher from "./MonthSwitcher/MonthSwitcher";
import TimeSwitcher from "./TimeSwitcher/TimeSwitcher";
import CustomInput from "../../CustomInput/CustomInput";
import {Context} from "../../../Context/Context";
import {TypeMoment} from "../../SuperDataPicker/SuperDataPicker";
import ChangeMonth from "./ChangeMonth/ChangeMonth";
import ChangeYear from "./ChangeYear/ChangeYear";

export interface AbsoluteTabProps {
    tittle?:string;
}

const AbsoluteTab: FC<AbsoluteTabProps> = (props) => {
    const { momentField,changeMoment } = useContext(Context)
    const [inputValue,setInputValue] = useState(momentField.moment.format('MMM DD, YYYY HH:mm:ss'))
    const [changeMonth,setChangeMonth] = useState(false)
    const [changeYear,setChangeYear] = useState(false)


    const showChangeMonth = (isShow:boolean) =>{
        setChangeMonth(isShow)
    }

    const showChangeYear = (isShow:boolean) =>{
        setChangeYear(isShow)
    }

    const changeInput = (e:ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    useEffect(()=>{
        if (moment(inputValue).isValid()){
            changeMoment(moment(inputValue),TypeMoment.Absolute)
        }
    },[inputValue])


    return (
        <div>
            <AbsoluteTabContainer>
                {changeMonth && <ChangeMonth closeChangeMonth={showChangeMonth}/>}
                {changeYear && <ChangeYear closeChangeYear={showChangeYear}/>}
                {!changeMonth && !changeYear &&
                    <>
                        <div>
                            <MonthSwitcher setChangeYear={showChangeYear} setChangeMonth={showChangeMonth}/>
                            <CalendarGrid/>
                        </div>
                        <TimeSwitcher/>
                    </>
                }
            </AbsoluteTabContainer>
            <InputContainer>
                <CustomInput width='100%' value={inputValue} onChange={changeInput}/>
            </InputContainer>
        </div>
    );
};

export default AbsoluteTab;

const AbsoluteTabContainer = styled.div`
  display: flex;
  height: 230px;
`
const InputContainer = styled.div`
margin-top: 25px;

`