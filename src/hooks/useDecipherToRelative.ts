import {useCallback, useEffect, useState} from 'react'
import moment from "moment";
import useEncrypt from "./useEncrypt";
import usePeriod from "./usePeriod";

const useDecipherRelative = (Moment:moment.Moment) => {
    const encryptMoment:string = useEncrypt(Moment)
    const [time,setTime] = useState<number>(0)
    const [timeName,setTimeName] = useState<string>('')
    const currentMoment = usePeriod(moment(),time,timeName)

    const changeTime = useCallback((number:number) => {
      setTime(number)
    },[])

    const changeTimeName = useCallback((timeName:string) =>{
        setTimeName(timeName)
    },[])

    useEffect(()=>{
        if (encryptMoment){
            const value = encryptMoment.match(/\d{1,1000}/)?.[0]
            const time = encryptMoment[encryptMoment.length-1]
            setTime(Number(value))
            setTimeName(time)
        }
    },[encryptMoment])

    return{
        currentMoment,time,changeTime,timeName,changeTimeName
    }

}

export default useDecipherRelative