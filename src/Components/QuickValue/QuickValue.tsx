import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";
import {Time} from "../../helpers";
import {TypeMoment, valuesDatePicker} from "../SuperDataPicker/SuperDataPicker";
import useDecipherRelative from "../../hooks/useDecipherToRelative";

export interface QuickValueProps {
    text:string
    deleteQuick:()=>void;
    startValue:valuesDatePicker
    endValue:valuesDatePicker
    isSent:boolean
    textForQuick:string
}

const QuickValue: FC<QuickValueProps> = ({deleteQuick,startValue,endValue,textForQuick,isSent}) => {
    const {time:timeStart,timeName:timeNameStart} = useDecipherRelative(startValue.moment)
    const {time:timeEnd,timeName:timeNameEnd} = useDecipherRelative(endValue.moment)
    const [text,setText] = useState(textForQuick)

    useEffect(()=>{
        if (endValue.type===TypeMoment.Now && startValue.type === TypeMoment.Relative && isSent){
            setText(`Last ${timeStart} ${Time(timeNameStart)}`)
        }
        if (startValue.type===TypeMoment.Now && endValue.type === TypeMoment.Relative && isSent){
            setText(`Next ${timeEnd} ${Time(timeNameEnd)}`)
        }
    },[isSent,timeStart,timeNameStart,timeEnd,timeNameEnd])

    const deleteHandler = () =>{
        deleteQuick()
        setText('')
    }
    return (
            <>
                {!!text &&
                    <QuickContainer onClick={deleteHandler}>
                        {text}
                        <Show>Show dates</Show>
                    </QuickContainer>
                }
            </>
    );
};

export default QuickValue;

const Show = styled.div`
  color: #006BB4;
`

const QuickContainer = styled.div`
  cursor: pointer;
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  &:hover{
    ${Show}{
      text-decoration: underline;
    }
  }
`