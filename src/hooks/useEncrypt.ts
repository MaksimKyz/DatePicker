// @ts-ignore
import moment from "moment";
import {useEffect, useState} from "react";

const useEncrypt = (e:moment.Moment) =>{
    const [encryptMoment,setEncryptMoment] = useState('')
    useEffect(()=>{
        const startMilliseconds = Math.abs(moment().diff(e))
        if (e?.isBefore(moment())){
            if (startMilliseconds>=1000*60*60*24*30*12){
                setEncryptMoment(`now-${moment().diff(e,'year')}y`)
                return;
            }
            if (startMilliseconds>=1000*60*60*24*e?.daysInMonth()){
                setEncryptMoment(`now-${moment().diff(e,'month')}M`)
                return;
            }
            if (startMilliseconds>=1000*60*60*24){
                setEncryptMoment(`now-${moment().diff(e,'day')}d`)
                return;
            }
            if (startMilliseconds>=1000*60*60){
                setEncryptMoment(`now-${moment().diff(e,'hour')}h`)
                return;
            }
            if (startMilliseconds>=1000*60){
                setEncryptMoment(`now-${moment().diff(e,'minute')}m`)
                return
            }
            if (startMilliseconds>0){
                setEncryptMoment(`now-${moment().diff(e,'seconds')}s`)
            }
        } else {
            if (startMilliseconds>=1000*60*60*24*30*12){
                setEncryptMoment(`now+${e.diff(moment(),'year')}y`)
            }
            if (startMilliseconds>=1000*60*60*24*e?.daysInMonth()){
                setEncryptMoment(`now+${e.diff(moment(),'month')}M`)
            }
            if (startMilliseconds>=1000*60*60*24){
                setEncryptMoment(`now+${e.diff(moment(),'day')}d`)
            }
            if (startMilliseconds>=1000*60*60){
                setEncryptMoment(`now+${e.diff(moment(),'hour')}h`)
            }
            if (startMilliseconds>=1000*60){
                setEncryptMoment(`now+${e.diff(moment(),'minute')}m`)
            }
            if (startMilliseconds>0){
                setEncryptMoment(`now+${moment().diff(e,'seconds')}s`)
            }
        }
    },[e])
    return encryptMoment
}


export default useEncrypt