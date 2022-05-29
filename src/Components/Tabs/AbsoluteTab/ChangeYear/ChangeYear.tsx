import React, {FC, useContext} from 'react';
import styled from "styled-components";
import moment from "moment";
import {Context} from "../../../../Context/Context";
import {TypeMoment} from "../../../SuperDataPicker/SuperDataPicker";

export interface ChangeMonthProps {
    closeChangeYear:(isShow:boolean)=>void
}

const ChangeYear: FC<ChangeMonthProps> = (props) => {

    const {momentField,changeMoment} =useContext(Context)

    const yearsArray = [...Array(15)].map((_,index)=> momentField.moment.clone().subtract(7,'year').add(index,'year'))

    const changeYear = (year:moment.Moment) =>{
        changeMoment(momentField.moment.year(year.year()),TypeMoment.Absolute)
        props.closeChangeYear(false)
    }

    return (
        <ChangeYearContainer>
            {yearsArray.map((year)=>(
                <Year
                    onClick={()=>changeYear(year)}
                    currentMonth={momentField.moment.format('YYYY')===year.format('YYYY')}
                    key={year.toString()}
                >
                    {year.format('YYYY')}
                </Year>
            ))}
        </ChangeYearContainer>
    );
};

export default ChangeYear;



const ChangeYearContainer = styled.div`
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

const Year = styled.div<{currentMonth:boolean}>`
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