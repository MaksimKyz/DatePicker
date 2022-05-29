import React, {FC} from 'react';
import styled from "styled-components";
import moment from "moment";
import {TypeMoment, valuesDatePicker} from "../../SuperDataPicker/SuperDataPicker";

export interface CommonlyUsedProps {
    clickCommonlyUsed:(tittle:string,start:valuesDatePicker,end:valuesDatePicker)=>void
}

const CommonlyUsed: FC<CommonlyUsedProps> = ({clickCommonlyUsed}) => {
    moment.updateLocale('en',{week:{dow:1}})


    const arrCommonlyUsed = [
        {
            tittle:'Today',
            start:{moment:moment().startOf('day'),type:TypeMoment.Relative},
            end:{moment:moment().endOf('day'),type:TypeMoment.Relative}
        },
        {
            tittle:'Yesterday',
            start:{moment:moment().subtract(1,'day').startOf('day'),type: TypeMoment.Relative},
            end:{moment:moment().subtract(1,'day').endOf('day'),type: TypeMoment.Relative}
        },
        {
            tittle:'This week',
            start:{moment:moment().startOf('week'),type: TypeMoment.Relative},
            end:{moment:moment().endOf('week'),type: TypeMoment.Relative}
        },
        {
            tittle:'Week to day',
            start:{moment:moment().startOf('week'),type: TypeMoment.Relative},
            end:{moment:moment(),type: TypeMoment.Now}
        },
        {
            tittle:'This month',
            start:{moment:moment().startOf('month'),type: TypeMoment.Relative},
            end:{moment:moment().endOf('month'),type: TypeMoment.Relative}
        },
        {
            tittle:'Month to day',
            start:{moment:moment().startOf('month'),type: TypeMoment.Relative},
            end:{moment:moment(),type: TypeMoment.Now}
        },
        {
            tittle:'This year',
            start:{moment:moment().startOf('year'),type: TypeMoment.Relative},
            end:{moment:moment().endOf('year'),type: TypeMoment.Relative}
        },
        {
            tittle:'Year to day',
            start:{moment:moment().startOf('year'),type: TypeMoment.Relative},
            end:{moment:moment(),type: TypeMoment.Now}
        }
    ]

    const onCLick = (tittle:string,start:valuesDatePicker,end:valuesDatePicker) =>{
        clickCommonlyUsed(tittle,start,end)
    }
    return (
        <CommonlyUsedContainer>
            {arrCommonlyUsed.map((item)=>(
                <CommonlyUsedItem key={item.tittle}>
                    <span onClick={()=>onCLick(item.tittle,item.start,item.end)}>{item.tittle}</span>
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