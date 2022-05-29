import React from "react";
import {TypeMoment, valuesDatePicker} from "../Components/SuperDataPicker/SuperDataPicker";

interface FieldContext {
    momentField?:valuesDatePicker
    changeMoment?:(moment:moment.Moment,type:TypeMoment)=>void
}

export const Context = React.createContext<FieldContext>({})