import {useMemo} from 'react'
import moment from "moment";

const usePeriod = (moment:moment.Moment,time:number,period:string) => {
    const test = useMemo(()=>{
        switch(period) {
            case 's':
                return  moment.subtract(time,"seconds")
            case 'm':
                return  moment.subtract(time,"minutes")
            case 'h':
                return  moment.subtract(time,"hours")
            case 'd':
                return  moment.subtract(time,"days")
            case 'w':
                return  moment.subtract(time,"weeks")
            case 'M':
                return  moment.subtract(time,"months")
            case 'y':
                return  moment.subtract(time,"years")
            case 's+':
                return  moment.add(time,"seconds")
            case 'm+':
                return  moment.add(time,"minutes")
            case 'h+':
                return  moment.add(time,"hours")
            case 'd+':
                return  moment.add(time,"days")
            case 'w+':
                return  moment.add(time,"weeks")
            case 'M+':
                return  moment.add(time,"months")
            case 'y+':
                return  moment.add(time,"years")
        }
    },[time,period])
    return test

}

export default usePeriod