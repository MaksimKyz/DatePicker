import React, {FC, useContext} from 'react';
import styled from "styled-components";
import moment from "moment";
import {Context} from "../../../../Context/Context";
import {TypeMoment} from "../../../SuperDataPicker/SuperDataPicker";

export interface ChangeMonthProps {
    closeChangeMonth:(isShow:boolean)=>void
}

const ChangeMonth: FC<ChangeMonthProps> = (props) => {

    const {momentField,changeMoment} =useContext(Context)

    const monthsArray = [...Array(12)].map((_,index)=> moment().startOf('year').add(index,'month'))

    const changeMonth = (month:moment.Moment) =>{
        changeMoment(momentField.moment.month(month.month()),TypeMoment.Absolute)
        props.closeChangeMonth(false)
    }

    return (
        <ChangeMonthContainer>
            {monthsArray.map((month)=>(
                <Month
                    onClick={()=>changeMonth(month)}
                    currentMonth={momentField.moment.format('MMM')===month.format('MMM')}
                    key={month.toString()}
                >
                    {month.format('MMM')}
                </Month>
            ))}
        </ChangeMonthContainer>
    );
};

export default ChangeMonth;



const ChangeMonthContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
`

const Month = styled.div<{currentMonth:boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height:30px;
  border-radius: 4px;
  font-size: 12px;
  padding: 8px;
  font-weight: ${props => props.currentMonth?'bolder':''};;
  color:${props => props.currentMonth?'#fff':'#343741'};
  background:${props => props.currentMonth?'#006BB4':''};
  :hover{
    background: ${props => props.currentMonth?'#006BB4':'#F5F7FA'}
    
  }
`