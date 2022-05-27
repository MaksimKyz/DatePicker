import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import CustomInput from "../../CustomInput/CustomInput";
import styled from "styled-components";
import DropDownList from "../../DropDownList/DropDownList";
import moment from "moment";
import usePeriod from "../../../hooks/usePeriod";
import {valuesDatePicker} from "../../SuperDataPicker/SuperDataPicker";
import {arrRelative, decipherToRelative} from "../../../helpers";

export interface RelativeTabProps {
    tittle:string;
    currentMoment:string
    changeValue:(e:valuesDatePicker)=>void;
    relativeValues: { value:number,period:string };
    changeRelativeValues:(value:number,period:string )=>void
}

const RelativeTab: FC<RelativeTabProps> = ({relativeValues,...props}) => {
    const [timePeriod,setTimePeriod] = useState(relativeValues.value)
    const [period,setPeriod] = useState(relativeValues.period)
    const currentMoment = usePeriod(moment().clone(),timePeriod,period)

    useEffect(()=>{
        setTimePeriod(decipherToRelative(props.currentMoment).value||15)
        setPeriod(decipherToRelative(props.currentMoment).period||'m')
    },[])

    useEffect(()=>{
        props.changeValue({...currentMoment,text:currentMoment.moment.fromNow()})
    },[currentMoment])

    useEffect(()=>{
        props.changeRelativeValues(timePeriod,period)
    },[timePeriod,period])

    const changePeriod = (e:string)=>{
        setPeriod(e)
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)>0){
            setTimePeriod(Number(e.target.value))
        }
    }
    return (
        <div>
            <InputContainer>
                <CustomInput value={timePeriod} onChange={onChange}/>
                <DropDownList optionsArray={arrRelative} value={period} changePeriod={changePeriod}/>
            </InputContainer>
        </div>
    );
};

export default RelativeTab;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`