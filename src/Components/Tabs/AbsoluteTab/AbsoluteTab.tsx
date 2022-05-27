import React, {ChangeEvent, FC, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
import CalendarGrid from "./CalendarGrid/CalendarGrid";
import MonthSwitcher from "./MonthSwitcher/MonthSwitcher";
import TimeSwitcher from "./TimeSwitcher/TimeSwitcher";
import CustomInput from "../../CustomInput/CustomInput";
import {valuesDatePicker} from "../../SuperDataPicker/SuperDataPicker";

export interface AbsoluteTabProps {
    tittle?:string;
    changeValue:(e:valuesDatePicker)=>void;
    currentMoment:moment.Moment
}

const AbsoluteTab: FC<AbsoluteTabProps> = ({currentMoment,...props}) => {
    moment.updateLocale('en',{week:{dow:1}})
    const [today,setToday] = useState<moment.Moment>(currentMoment)
    const [currentDayAndTime,setCurrentDayAndTime] = useState([currentMoment.format('MMM D, YYYY'),currentMoment.format('HH:mm:ss')])
    const [input,setInput] = useState(today.format('MMM D, YYYY HH:mm:ss'))
    const joinedDateAndTime = currentDayAndTime.join(' ')

    useEffect(()=>{
        props.changeValue({tittle:joinedDateAndTime,moment:moment(joinedDateAndTime),text:joinedDateAndTime})
        setInput(joinedDateAndTime)
    },[currentDayAndTime])



    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInput(value)
        props.changeValue({tittle:value,moment:moment(value),text:value})
    }

    const decrementMonth = () => {
        setToday(prevState => prevState.clone().subtract(1,'month'))
    }
    const incrementMonth = () => {
        setToday(prevState => prevState.clone().add(1,'month'))
    }

    const changeDate = (date:string) =>{
        setCurrentDayAndTime([date,currentDayAndTime[1]])
    }

    const changeTime = (time:string) =>{
        setCurrentDayAndTime([currentDayAndTime[0],time])
    }

    return (
        <div>
            <AbsoluteTabContainer>
                <div>
                    <MonthSwitcher
                        today={today}
                        decrementMonth={decrementMonth}
                        incrementMonth={incrementMonth}
                    />
                    <CalendarGrid
                        today={today}
                        changeToday={changeDate}
                    />
                </div>
                <TimeSwitcher changeTime={changeTime} />
            </AbsoluteTabContainer>
            <InputContainer>
                <CustomInput width='100%' value={input} onChange={onChange}/>
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