import React, {FC, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
import arrow from '../../../../assets/arrow.svg'
export interface MonthSwitcherProps {
    today:moment.Moment
    decrementMonth:()=>void
    incrementMonth:()=>void
}

const MonthSwitcher: FC<MonthSwitcherProps> = ({today,decrementMonth,incrementMonth}) => {
    return (
        <MonthSwitcherContainer>
            <SwitchMonth isLeft={true} onClick={decrementMonth}>
                <img src={arrow} alt=""/>
            </SwitchMonth>
            <CurrentMonth>
                {today.format('MMMM YYYY')}
            </CurrentMonth>
            <SwitchMonth isLeft={false} onClick={incrementMonth}>
                <img src={arrow} alt=""/>
            </SwitchMonth>
        </MonthSwitcherContainer>
    );
};

export default MonthSwitcher;


const MonthSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  width: 100%;
`
const SwitchMonth = styled.div<{isLeft:boolean}>`
  height: 100%;
  width: 30px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  img{
    transform: ${props => props.isLeft?'rotate(90deg)':'rotate(-90deg)'};
    width: 30px;
  }
`

const CurrentMonth = styled.div`
  font-size: 20px;
  font-weight: 500;
`