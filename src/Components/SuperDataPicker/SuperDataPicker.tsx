import React, {FC, useCallback, useEffect, useState} from 'react';
import CustomButton from "../CustomButton/CustomButton";
import refresh from "../../assets/refresh.svg";
import calendar from '../../assets/calendar.svg'
import styled from "styled-components";
import DropDownDate from "../DropDownDate/DropDownDate";
import DatePickerMenu from "../DatePickerMenu/DatePickerMenu";
import moment from "moment";
import {usePrevious} from "../../hooks/usePrevios";
import DatePopoverButton from "../DatePopoverButton/DatePopoverButton";
import QuickValue from "../QuickValue/QuickValue";
import {Context} from "../../Context/Context";
import useDecipher from "../../hooks/useDecipher";
import useDecipherRelative from "../../hooks/useDecipherToRelative";
import {Time} from "../../helpers";
import useEncrypt from "../../hooks/useEncrypt";


export enum TypeMoment {
    Relative = 'Relative',
    Absolute = 'Absolute',
    Now = 'Now'
}

export interface valuesDatePicker{
    moment:moment.Moment,
    type:TypeMoment,
}

export interface SuperDataPickerProps {
    showUpdateButton?:boolean
    onTimeChange:(start:moment.Moment,end:moment.Moment)=>void
    start?:string;
    end?:string
}

const SuperDataPicker: FC<SuperDataPickerProps> = ({showUpdateButton= true,onTimeChange,start='now-15h',end='now'}) => {
    const [startValue,setStartValue] = useState<valuesDatePicker>({moment:moment(),type:TypeMoment.Relative})
    const [endValue,setEndValue] = useState<valuesDatePicker>({moment:moment(),type:TypeMoment.Absolute})
    const [textForQuick,setTextForQuick] = useState('')
    const [isSent,setSent] = useState(true)


    const {currentMoment:startMoment,type:startType} = useDecipher(start)
    const {currentMoment:endMoment,type:endType} = useDecipher(end)

    const timeChange = () => {
        onTimeChange(startValue.moment,endValue.moment)
    }

    useEffect(()=>{
        setStartValue({moment:startMoment,type:startType})
        setEndValue({moment:endMoment,type:endType})
    },[startMoment,startType,endMoment,endType])

    useEffect(()=>{
        if (!showUpdateButton){
            timeChange()
        }
    },[startValue,endValue])

    const onButtonClick = () => {
        timeChange()
        setSent(true)
    }

    const changeStart =useCallback((moment:moment.Moment,type:TypeMoment) => {
        setStartValue({moment:moment,type:type})
    },[])

    const changeEnd = (moment:moment.Moment,type:TypeMoment) => {
        setEndValue({moment:moment,type:type})
    }

    const clickCommonlyUsed = (tittle:string,start:valuesDatePicker,end:valuesDatePicker) =>{
        setStartValue(start)
        setEndValue(end)
        setTextForQuick(tittle)
    }

    const deleteQuick = () =>{
        setTextForQuick('')
        setSent(false)
    }

    const isError = startValue?.moment?.isAfter(endValue?.moment)


    return (
            <DataPicker>
                <DropDownContainer>
                        <DatePickerMenu clickCommonlyUsed={clickCommonlyUsed} onPeriodChange={timeChange}/>
                    <PickerFields>

                        <QuickValue
                            startValue={startValue}
                            endValue={endValue}
                            textForQuick={textForQuick}
                            isSent={isSent}
                            deleteQuick={deleteQuick}
                            text={textForQuick}
                        />

                        <Value isUpdate={false} isError={isError}>
                            <Context.Provider value={{ momentField:startValue,changeMoment:changeStart}}>
                                <DatePopoverButton  position='left'/>
                            </Context.Provider>
                        </Value>

                        <Delimiter>→</Delimiter>

                        <Value isUpdate={false} isError={isError}>
                            <Context.Provider value={{momentField:endValue,changeMoment:changeEnd}}>
                                <DatePopoverButton/>
                            </Context.Provider>
                        </Value>

                    </PickerFields>
                </DropDownContainer>
                {showUpdateButton &&
                    <RefreshButton>
                        <CustomButton disabled={isError} onClick={onButtonClick}>
                            <div style={{display:'flex'}}>
                                <img src={refresh} alt=""/>
                                <span style={{fontSize:'16px',marginLeft:'5px'}}>Refresh</span>
                            </div>
                        </CustomButton>
                    </RefreshButton>
                }
            </DataPicker>

    );
};

export default SuperDataPicker;



const PickerFields = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`
const Value = styled.div<{isError:boolean,isUpdate:boolean}>`
  width: 100%;
  background: ${props => props.isError?'#f8e9e9':props.isUpdate?'#e6f2f1':''};
  color: ${props => props.isError?'#BD271E':props.isUpdate?'#01776d':'#343741'};
`

const DataPicker = styled.div`
  display: flex;
  height: 38px;
`
const DropDownContainer = styled.div`
  display: flex;
  width: 472px;
  background: #fbfcfe;
  border: 1px solid lightgray;
  -webkit-box-shadow: 0 4px 8px 0 rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0 4px 8px 0 rgba(34, 60, 80, 0.2);
  box-shadow: 0 4px 8px 0 rgba(34, 60, 80, 0.2);
`
const Delimiter = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6a717d;
  padding: 0 5px;
`
const RefreshButton = styled.div`
    margin-left: 10px;
`