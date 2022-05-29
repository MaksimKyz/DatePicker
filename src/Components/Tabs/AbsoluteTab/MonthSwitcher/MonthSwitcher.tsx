import React, {FC, useContext, useState} from 'react';
import styled from "styled-components";
import arrow from '../../../../assets/arrow.svg'
import {Context} from "../../../../Context/Context";
import {TypeMoment} from "../../../SuperDataPicker/SuperDataPicker";
import ChangeMonth from "../ChangeMonth/ChangeMonth";
export interface MonthSwitcherProps {
    setChangeMonth:(isShow:boolean)=>void
    setChangeYear:(isShow:boolean)=>void
}


const MonthSwitcher: FC<MonthSwitcherProps> = (props) => {
    const { momentField,changeMoment } = useContext(Context)
    const incrementMonth = () =>{
        changeMoment(momentField.moment.clone().add(1,'month'),TypeMoment.Absolute)
    }
    const decrementMonth = () => {
      changeMoment(momentField.moment.clone().subtract(1,'month'),TypeMoment.Absolute)
    }
    return (
        <>
            <MonthSwitcherContainer>
                <SwitchMonth isLeft={true} onClick={decrementMonth}>
                    <img src={arrow} alt=""/>
                </SwitchMonth>
                <MonthAndYear>
                    <CurrentMonth onClick={()=>props.setChangeMonth(true)}>
                        {momentField.moment.format('MMMM')}
                    </CurrentMonth>
                    <CurrentYear onClick={()=>props.setChangeYear(true)}>
                        {momentField.moment.format('YYYY')}
                    </CurrentYear>
                </MonthAndYear>
                <SwitchMonth isLeft={false} onClick={incrementMonth}>
                    <img src={arrow} alt=""/>
                </SwitchMonth>
            </MonthSwitcherContainer>
        </>
    );
};

export default MonthSwitcher;


const MonthSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  width: 93%;
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
  cursor: pointer;
  :hover{
    color: #006BB4;
  }
`

const CurrentYear = styled.div`
  font-size: 20px;
  color: #69707D;
  cursor: pointer;
  font-weight: 300;
  margin-left: 10px;
  :hover{
    color: #006BB4;
  }
`

const MonthAndYear = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`