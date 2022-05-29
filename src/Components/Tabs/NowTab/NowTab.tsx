import React, {FC, useContext, useEffect} from 'react';
import styled from "styled-components";
import moment from "moment";
import {Context} from "../../../Context/Context";
import CustomButton from "../../CustomButton/CustomButton";
import {TypeMoment} from "../../SuperDataPicker/SuperDataPicker";

export interface NowTabProps {
    tittle?:string
}

const NowTab: FC<NowTabProps> = (props) => {
    const { changeMoment } = useContext(Context)


    useEffect(()=>{
        changeMoment(moment(),TypeMoment.Now)
    },[])


    return (
        <div>
            <Description>
                Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.
            </Description>
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