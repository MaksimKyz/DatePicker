import React, {FC, useContext, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
import {useScrollBar} from "../../../../hooks/useScrollBar";
import {Context} from "../../../../Context/Context";
import {TypeMoment} from "../../../SuperDataPicker/SuperDataPicker";

export interface TimeSwitcherProps {
}

const TimeSwitcher: FC<TimeSwitcherProps> = () => {
    const { momentField,changeMoment } = useContext(Context)
    const timeRef = useRef(null)
    useScrollBar(timeRef)
    const totalDays = 48
    const timeArr = [...Array(totalDays)].map((_,index)=> moment().clone().startOf('day').add(30*index,'minute'))


    const changeTime = (time:moment.Moment) =>{
        changeMoment(momentField.moment.clone()
                                .hours(time.hour())
                                .minute(time.minute())
                                .seconds(time.seconds()),
            TypeMoment.Absolute
        )
    }

    return (
        <TimeContainer ref={timeRef}>
            {timeArr.map((time,index)=>(
                <TimeContent key={index}>
                    <Time
                        key={time.toString()}
                        onClick={()=>changeTime(time)}
                        current={time.format('hh:mm:ss')===momentField.moment.format('hh:mm:ss')}
                    >
                        {time.format('HH:mm')}
                    </Time>
                </TimeContent>
            ))}
        </TimeContainer>
    );
};

export default React.memo(TimeSwitcher);

const TimeContainer = styled.div`
  width: 116px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`

const TimeContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Time = styled.div<{current:boolean}>`
  background: ${props=>props.current?'#006BB4':'transparent'};
  padding: 4px 8px;
  margin-bottom: 6px;
  font-size: 12px;
  text-align: right;
  color: ${props=>props.current?'#fff':'#69707D'};;
  white-space: nowrap;
  line-height: 12px;
  cursor:pointer;
  :hover{
    text-decoration: underline;
  }
`