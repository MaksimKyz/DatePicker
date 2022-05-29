import React, {FC, useContext, useEffect, useState} from 'react';
import DropDownDate from "../DropDownDate/DropDownDate";
import Tabs from "../Tabs/Tabs";
import RelativeTab from "../Tabs/RelativeTab/RelativeTab";
import AbsoluteTab from "../Tabs/AbsoluteTab/AbsoluteTab";
import {Context} from "../../Context/Context";
import useDecipher from "../../hooks/useDecipher";
import NowTab from "../Tabs/NowTab/NowTab";
import {TypeMoment} from "../SuperDataPicker/SuperDataPicker";

export interface DatePopoverButtonProps {
    position?:'left'|'right';
}

const DatePopoverButton: FC<DatePopoverButtonProps> = ({position}) => {
    const [activeTab,setActiveTab] = useState<number>()
    const {momentField,changeMoment} = useContext(Context)
    const [text,setText] = useState('')

    const changeActiveTab = (tab:number) =>{
        if (tab === 0){
            changeMoment(momentField.moment,TypeMoment.Relative)
        }
        if (tab === 1){
            changeMoment(momentField.moment,TypeMoment.Absolute)
        }
        if (tab === 2){
            changeMoment(momentField.moment,TypeMoment.Now)
        }
    }

    useEffect(()=>{
        if (momentField.type === TypeMoment.Relative){
            setText(momentField?.moment?.fromNow())
            setActiveTab(0)
        }
        if (momentField.type === TypeMoment.Absolute){
            setText(momentField?.moment?.clone().format('MMM DD, YYYY HH:mm:ss'))
            setActiveTab(1)
        }
        if (momentField.type === TypeMoment.Now){
            setText('Now')
            setActiveTab(2)
        }
    },[momentField])

    return (
        <DropDownDate value={text} position={position}>
            <Tabs activeTab={activeTab} changeActiveTab={changeActiveTab}>
                <RelativeTab tittle={'Relative'}/>
                <AbsoluteTab tittle={'Absolute'}/>
                <NowTab tittle={'Now'}/>
            </Tabs>
        </DropDownDate>
    );
};

export default React.memo(DatePopoverButton);