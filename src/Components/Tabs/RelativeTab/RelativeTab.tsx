import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import CustomInput from "../../CustomInput/CustomInput";
import styled from "styled-components";
import DropDownList from "../../DropDownList/DropDownList";
import {arrRelative} from "../../../helpers";
import {Context} from "../../../Context/Context";
import useDecipherToRelative from "../../../hooks/useDecipherToRelative";
import {TypeMoment} from "../../SuperDataPicker/SuperDataPicker";

export interface RelativeTabProps {
    tittle:string;
}

const RelativeTab: FC<RelativeTabProps> = ({...props}) => {
    const { changeMoment,momentField } = useContext(Context)

    const {currentMoment,time,changeTime,timeName,changeTimeName} = useDecipherToRelative(momentField.moment)

    useEffect(()=>{
        changeMoment(currentMoment,TypeMoment.Relative)
    },[currentMoment])

    const changePeriod = (e:string)=>{
        changeTimeName(e)
    }

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)>0){
            changeTime(Number(e.target.value))
        }
    }

    return (
        <div>
            <InputContainer>
                <CustomInput value={time} onChange={onChange}/>
                <DropDownList optionsArray={arrRelative} value={timeName} changePeriod={changePeriod}/>
            </InputContainer>
        </div>
    );
};

export default RelativeTab;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`