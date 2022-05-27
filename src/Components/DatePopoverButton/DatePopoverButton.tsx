import React, {FC, useState} from 'react';
import DropDownDate from "../DropDownDate/DropDownDate";
import Tabs from "../Tabs/Tabs";
import RelativeTab from "../Tabs/RelativeTab/RelativeTab";
import AbsoluteTab from "../Tabs/AbsoluteTab/AbsoluteTab";
import NowTab from "../Tabs/NowTab/NowTab";
import {valuesDatePicker} from "../SuperDataPicker/SuperDataPicker";
import {decipherToRelative} from "../../helpers";

export interface DatePopoverButtonProps {
    value:valuesDatePicker;
    changeValue:(e:valuesDatePicker)=>void;
    position?:'left'|'right';
    startTab?:number
}

const DatePopoverButton: FC<DatePopoverButtonProps> = ({value,changeValue,position,startTab=0}) => {
    const [activeTab,setActiveTab] = useState(startTab)
    const [relativeValues,setRelativeValues] = useState({value:1,period:'h'})
    const changeFromRelative = (value:number,period:string) =>{
        setRelativeValues({value:value,period: period})
    }


    const changeActiveTab = (e:number) =>{
        setActiveTab(e)
    }

    return (
        <DropDownDate value={value.text} position={position}>
            <Tabs activeTab={activeTab} changeActiveTab={changeActiveTab}>
                <RelativeTab
                    changeRelativeValues={changeFromRelative}
                    relativeValues={relativeValues}
                    changeValue={changeValue}
                    tittle={'Relative'}
                    currentMoment={value.tittle}
                />
                <AbsoluteTab
                    currentMoment={value.moment}
                    changeValue={changeValue}
                    tittle={'Absolute'}
                />
                <NowTab
                    changeValue={changeValue}
                    tittle={'Now'}
                />
            </Tabs>
        </DropDownDate>
    );
};

export default DatePopoverButton;