import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styled from "styled-components";
import moment from "moment";
import SuperDataPicker from "./SuperDataPicker/SuperDataPicker";
export interface AppProps {

}

export interface valueInterface{
    moment?:moment.Moment,
    value:string
}


const App: FC<AppProps> = (props) => {
    moment.updateLocale('en',{week:{dow:1}})
    const onTimeChange = (start:string, end:string) =>{
        console.log(start,end)
    }



    return (
        <ContainerCenter>
                <SuperDataPicker  onTimeChange={onTimeChange}/>
        </ContainerCenter>
    );
};

export default App;


const ContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`
