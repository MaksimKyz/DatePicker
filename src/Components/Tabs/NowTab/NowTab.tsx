import React, {FC} from 'react';
import CustomButton from "../../CustomButton/CustomButton";
import styled from "styled-components";
import {valuesDatePicker} from "../../SuperDataPicker/SuperDataPicker";
import moment from "moment";

export interface NowTabProps {
    tittle?:string
    changeValue:(e:valuesDatePicker)=>void
}

const NowTab: FC<NowTabProps> = (props) => {
    return (
        <div>
            <Description>
                Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.
            </Description>
            <CustomButton onClick={()=>props.changeValue({tittle:'now',moment:moment(),text:'Now'})}>
                <ButtonContent>
                    Set end date and time to now
                </ButtonContent>
            </CustomButton>
        </div>
    );
};

export default NowTab;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
`

const Description = styled.p`
  color: #6a717d;
  margin-top: 0;
`