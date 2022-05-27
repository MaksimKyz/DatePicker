import React, {FC, useMemo, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
export interface CalendarGridProps {
    today:moment.Moment;
    changeToday:(e:string)=>void
}

const CalendarGrid: FC<CalendarGridProps> = ({today,changeToday}) => {
    const [active,setActive] = useState(Number(today.format('D')))
    const totalDays = 42
    const startDay = today.clone().startOf('month').startOf('week').hours(today.hour()).minutes(today.minutes())
    const daysArray = useMemo(()=>{
        return [...Array(totalDays)].map((_,index)=>startDay.clone().add(index,'day'))
    },[today])

    const changeDay = (day:moment.Moment,index:number) =>{
        changeToday(day.format('MMM D, YYYY'))
        setActive(index)
    }

    return (
        <Grid>
            {daysArray.map((day,index)=>(
                <CalendarItem
                    key={day.toString()}
                    onClick={()=>changeDay(day,index)}
                    current={index===active}
                >
                    {day.format('DD')}
                </CalendarItem>
            ))}
        </Grid>
    );
};

export default CalendarGrid;


const Grid = styled.div`
  width: 284px;
  display: grid;
  grid-template-columns: repeat(7,38.5px);
`

const CalendarItem = styled.div<{current:boolean}>`
    width: 32px;
    height: 32px;
    margin: 0 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.current?'blue':''};
    color: ${props=>props.current?'#fff':'#000'};
    cursor: pointer;
    :hover{
      text-decoration: underline;
      font-size: 18px;
      font-weight: bold;
    }
`