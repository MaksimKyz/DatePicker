import {useMemo} from 'react'
import moment from "moment";

const usePeriod = (moment:moment.Moment,time:number,period:string) => {
    const test = useMemo(()=>{
        switch(period) {
            case 's':
                return  {moment:moment.subtract(time,"seconds"),tittle:`now-${time}s`}
            case 'm':
                return  {moment:moment.subtract(time,"minutes"),tittle:`now-${time}m`}
            case 'h':
                return  {moment:moment.subtract(time,"hours"),tittle:`now-${time}h`}
            case 'd':
                return  {moment:moment.subtract(time,"days"),tittle:`now-${time}d`}
            case 'w':
                return  {moment:moment.subtract(time,"weeks"),tittle:`now-${time}w`}
            case 'M':
                return  {moment:moment.subtract(time,"months"),tittle:`now-${time}M`}
            case 'y':
                return  {moment:moment.subtract(time,"years"),tittle:`now-${time}y`}
            case 's+':
                return  {moment:moment.add(time,"seconds"),tittle:`now+${time}s`}
            case 'm+':
                return  {moment:moment.add(time,"minutes"),tittle:`now+${time}m`}
            case 'h+':
                return  {moment:moment.add(time,"hours"),tittle:`now+${time}h`}
            case 'd+':
                return  {moment:moment.add(time,"days"),tittle:`now+${time}d`}
            case 'w+':
                return  {moment:moment.add(time,"weeks"),tittle:`now+${time}w`}
            case 'M+':
                return  {moment:moment.add(time,"months"),tittle:`now+${time}M`}
            case 'y+':
                return  {moment:moment.add(time,"years"),tittle:`now+${time}y`}
        }
    },[time,period])
    return test

}

export default usePeriod