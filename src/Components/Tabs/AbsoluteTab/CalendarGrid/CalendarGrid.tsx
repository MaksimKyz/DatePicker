import React, {FC, useContext, useMemo} from 'react';
import styled from "styled-components";
import moment from "moment";
import {Context} from "../../../../Context/Context";
import {TypeMoment} from "../../../SuperDataPicker/SuperDataPicker";
export interface CalendarGridProps {
}

const CalendarGrid: FC<CalendarGridProps> = () => {

    const { momentField, changeMoment }=useContext(Context)

    const totalDays = 42
    const startDay = momentField.moment.clone().startOf('month').startOf('week')
    const daysArray = useMemo(()=>{
        return [...Array(totalDays)].map((_,index)=>startDay.clone().add(index+1,'day'))
    },[momentField])

    const changeDay = (day:moment.Moment) =>{
        changeMoment(day.clone()
                                .hours(momentField.moment.hours())
                                .minutes(momentField.moment.minutes())
                                .seconds(momentField.moment.seconds()),
            TypeMoment.Absolute
        )
    }


    return (
        <Grid>
            {daysArray.map((day)=>(
                <CalendarItem
                    key={day.toString()}
                    onClick={()=>changeDay(day)}
                    thisMonth={day.format('MMM')===momentField.moment.format('MMM')}
                    current={day.format('MMM DD YYYY')===momentField.moment.format('MMM DD YYYY')}
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

const CalendarItem = styled.div<{current:boolean,thisMonth:boolean}>`
  width: 32px;
  height: 32px;
  margin: 0 2px;
  display: flex;
  font-size: 10px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${props => props.current?'#006BB4':''};
  color: ${props=>props.current?'#fff':props.thisMonth?'#000':'#69707D'};
  cursor: pointer;
  transition:0.2s;
  :hover{
    text-decoration: underline;
    font-size: 12px;
    font-weight: bold;
  }
`