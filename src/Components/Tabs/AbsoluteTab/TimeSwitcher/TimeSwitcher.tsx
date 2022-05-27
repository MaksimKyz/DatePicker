import React, {FC, useMemo, useRef, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
import {useScrollBar} from "../../../../hooks/useScrollBar";

export interface TimeSwitcherProps {
    changeTime:(e:string)=>void
}

const TimeSwitcher: FC<TimeSwitcherProps> = ({changeTime}) => {
    const [active,setActive] = useState(0)
    const timeRef = useRef(null)
    const totalDays = 48
    const timeArr = [...Array(totalDays)].map((_,index)=> moment().clone().startOf('day').add(30*index,'minute'))

    const clickOnTime = (time:moment.Moment,index:number) =>{
        changeTime(time.format('hh:mm:ss'))
        setActive(index)
    }

    useScrollBar(timeRef)
    return (
        <TimeContainer ref={timeRef}>
            {timeArr.map((time,index)=>(
                <TimeContent key={index}>
                    <Time
                        key={time.toString()}
                        onClick={()=>clickOnTime(time,index)}
                        current={index===active}
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
  background: ${props=>props.current?'#d2e4f2':'transparent'};
  padding: 4px 8px;
  margin-bottom: 6px;
  font-size: 12px;
  text-align: right;
  color: #69707D;
  white-space: nowrap;
  line-height: 12px;
  cursor:pointer;
  :hover{
    text-decoration: underline;
  }
`