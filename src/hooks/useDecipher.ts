// @ts-ignore
import moment from "moment";
import {useEffect, useState} from "react";
import {TypeMoment} from "../Components/SuperDataPicker/SuperDataPicker";


const useDecipher = (encryptString:string) =>{
    const [currentMoment,setCurrentMoment] = useState<moment.Moment>()
    const [type,setType] = useState<TypeMoment>(TypeMoment.Relative)
    useEffect(()=>{
        if (encryptString==='now'){
            setCurrentMoment(moment())
            setType(TypeMoment.Now)
        }else {
            if (encryptString!=='now' && encryptString?.match(/now/)){
                const value = encryptString.match(/\d{1,1000}/)[0]
                const symbol = encryptString.match(/[+-]/)[0]
                const time = encryptString[encryptString.length-1]
                setType(TypeMoment.Relative)
                if (symbol==='-'){
                    // @ts-ignore
                    setCurrentMoment(moment().subtract(value,`${time}`))
                }
                if (symbol==='+'){
                    // @ts-ignore
                    setCurrentMoment(moment().add(value,`${time}`))
                }

            }else{
                setCurrentMoment(moment(encryptString))
                setType(TypeMoment.Absolute)
            }
        }
    },[encryptString])
    return {
        currentMoment,
        type
    }
}


export default useDecipher;