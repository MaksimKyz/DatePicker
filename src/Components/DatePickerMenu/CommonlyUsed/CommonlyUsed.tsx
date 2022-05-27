import React, {FC} from 'react';
import styled from "styled-components";
import moment from "moment";
import {valuesDatePicker} from "../../SuperDataPicker/SuperDataPicker";
import {encrypt} from "../../../helpers";

export interface CommonlyUsedProps {
    clickCommonlyUsed:(start:valuesDatePicker,end:valuesDatePicker)=>void
}

const CommonlyUsed: FC<CommonlyUsedProps> = (props) => {
    moment.updateLocale('en',{week:{dow:1}})

    const isNow = (e:moment.Moment) =>{
        if (0 < moment().diff(e) && moment().diff(e)<1000*60){
            return 'Now'
        }else return e.add(1,'day').fromNow()
    }

    const arrCommonlyUsed = [
        {start:moment().startOf('day'),end:moment().endOf('day'),tittle:'Today'},
        {start:moment().subtract(1,'day').startOf('day'),end:moment().subtract(1,'day').endOf('day'),tittle:'Yesterday'},
        {start:moment().startOf('week'),end:moment().endOf('week'),tittle:'This week'},
        {start:moment().startOf('week'),end:moment(),tittle:'Week to day'},
        {start:moment().startOf('month'),end:moment().endOf('month'),tittle:'This month'},
        {start:moment().startOf('month'),end:moment(),tittle:'Month to day'},
        {start:moment().startOf('year'),end:moment().endOf('year'),tittle:'This year'},
        {start:moment().startOf('year'),end:moment(),tittle:'Year to day'},
    ]

    const onCLick = (start:moment.Moment,end:moment.Moment) =>{
        props.clickCommonlyUsed(
            {tittle:encrypt(start),moment:start,text:isNow(start)},
            {tittle:encrypt(end),moment:end,text:isNow(end)}
        )
    }
    return (
        <CommonlyUsedContainer>
            {arrCommonlyUsed.map((item)=>(
                <CommonlyUsedItem key={item.tittle}>
                    <span onClick={()=>onCLick(item.start,item.end)}>{item.tittle}</span>
                </CommonlyUsedItem>
            ))}
        </CommonlyUsedContainer>
    );
};

export default CommonlyUsed;

const CommonlyUsedContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const CommonlyUsedItem = styled.div`
  margin: 4px;
  color: #006BB4;
  span{
    cursor:pointer;
    :hover{
      color: #004d81;
      text-decoration: underline;
    } 
  }
`