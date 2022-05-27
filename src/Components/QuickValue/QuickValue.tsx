import React, {FC} from 'react';
import styled from "styled-components";
import {countQuick} from "../../helpers";

export interface QuickValueProps {
    pickerValues:{start:string,end:string}
    isSent:boolean;
    changeQuick:(e:boolean)=>void;
}

const QuickValue: FC<QuickValueProps> = ({pickerValues,isSent,changeQuick}) => {
    const clickOnQuick = () =>{
        changeQuick(!isSent)
    }
    return (
            <>
                {!!countQuick(pickerValues.start,pickerValues.end) && isSent &&
                    <QuickContainer onClick={clickOnQuick}>
                        {countQuick(pickerValues.start,pickerValues.end)}
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