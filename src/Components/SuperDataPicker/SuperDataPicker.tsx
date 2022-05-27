import React, {FC, useEffect, useState} from 'react';
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
import {decipher} from "../../helpers";


export interface valuesDatePicker{
    tittle:string;
    moment:moment.Moment,
    text:string,
}

export interface SuperDataPickerProps {
    showUpdateButton?:boolean
    onTimeChange:(start:moment.Moment,end:moment.Moment)=>void
    start?:string;
    end?:string
}

const SuperDataPicker: FC<SuperDataPickerProps> = ({showUpdateButton= true,onTimeChange,start='now-15m',end='now'}) => {
    const [startValue,setStartValue] = useState<valuesDatePicker>({tittle:'',moment:moment(),text:''})
    const [endValue,setEndValue] = useState<valuesDatePicker>({tittle:'',moment:moment(),text:''})
    const [isSent,setSent] = useState(true)
    const [isUpdate,setUpdate] = useState(false)
    const prevStart = usePrevious(startValue);
    const prevEnd = usePrevious(endValue);

    useEffect(()=>{
        const propsStartMoment = decipher(start)
        const propsEndMoment = decipher(end)
        setStartValue({tittle:start,moment:propsStartMoment,text:propsStartMoment.fromNow()})
        setEndValue({tittle:end,moment:propsEndMoment,text:propsEndMoment.fromNow()})
    },[])

    useEffect(()=>{
        if (!showUpdateButton){
            timeChange()
        }
        setUpdate((!!startValue.text && prevStart.text!==startValue.text)||(!!endValue.text && prevEnd.text!==endValue.text) )
    },[startValue,endValue])

    const timeChange = () => {
        onTimeChange(decipher(startValue.tittle),decipher(endValue.tittle))
    }

    const onButtonClick = () => {
        timeChange()
        setUpdate(false)
        setSent(true)
    }

    const changeStart = (e:valuesDatePicker) => {
        setStartValue(e)
    }

    const changeEnd = (e:valuesDatePicker) => {
        setEndValue(e)
    }

    const clickCommonlyUsed = (start:valuesDatePicker,end:valuesDatePicker) =>{
        setStartValue(start)
        setEndValue(end)
        setSent(true)
    }

    const errorValue = startValue.moment.isAfter(endValue.moment)
    const disableRefreshButton = !startValue.text || !endValue.text || errorValue

    return (
            <DataPicker>
                <DropDownContainer>
                    <DropDownDate
                        width={'50px'}
                        value={<ImageCont><img src={calendar}/></ImageCont>}
                        position='left'
                    >
                        <DatePickerMenu clickCommonlyUsed={clickCommonlyUsed} onPeriodChange={timeChange}/>
                    </DropDownDate>
                    <PickerFields>

                        <QuickValue
                            changeQuick={()=>setSent(false)}
                            isSent={isSent}
                            pickerValues={{start:startValue.tittle,end:endValue.tittle}}
                        />
                        <Value isUpdate={isUpdate} isError={errorValue}>
                            <DatePopoverButton
                                position='left'
                                value={startValue}
                                changeValue={changeStart}
                            />
                        </Value>
                        <Delimiter>→</Delimiter>
                        <Value isUpdate={isUpdate} isError={errorValue}>
                            <DatePopoverButton
                                value={endValue}
                                startTab={2}
                                changeValue={changeEnd}
                            />
                        </Value>
                    </PickerFields>
                </DropDownContainer>
                {showUpdateButton &&
                    <RefreshButton>
                        <CustomButton disabled={disableRefreshButton} onClick={onButtonClick}>
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
const ImageCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`