import moment from "moment";


export const countQuick = (start:string,end:string) => {
    if (end === 'now' && start.match(/now/)){
        const value = start.match(/\d{1,1000}/)?.[0]
        const time = start[start.length-1]
        return `Last ${value} ${test1(time)}`
    }
}


moment.updateLocale('en',{week:{dow:1}})

export const encrypt = (e:moment.Moment) =>{
    const startMilliseconds = Math.abs(moment().diff(e))
    if (e.isBefore(moment())){
        if (startMilliseconds>=1000*60*60*24*30*12){
            return `now-${moment().diff(e,'year')}y`
        }
        if (startMilliseconds>=1000*60*60*24*e.daysInMonth()){
            return `now-${moment().diff(e,'month')}M`
        }
        if (startMilliseconds>=1000*60*60*24){
            return `now-${moment().diff(e,'day')}d`
        }
        if (startMilliseconds>=1000*60*60){
            return `now-${moment().diff(e,'hour')}h`
        }
        if (startMilliseconds>=1000*60){
            return `now-${moment().diff(e,'minute')}m`
        }
        if (startMilliseconds>0){
            return `now`
        }
    } else {
        if (startMilliseconds>=1000*60*60*24*30*12){
            return `now+${e.diff(moment(),'year')}y`
        }
        if (startMilliseconds>=1000*60*60*24*e.daysInMonth()){
            return `now+${e.diff(moment(),'month')}M`
        }
        if (startMilliseconds>=1000*60*60*24){
            return `now+${e.diff(moment(),'day')}d`
        }
        if (startMilliseconds>=1000*60*60){
            return `now+${e.diff(moment(),'hour')}h`
        }
        if (startMilliseconds>=1000*60){
            return `now+${e.diff(moment(),'minute')}m`
        }
        if (startMilliseconds>0){
            return `now`
        }
    }
}


export const decipher = (e:string) =>{
    if (e==='now'){
        return moment()
    }
    if (e!=='now' && e.match(/now/)){
        const value = e.match(/\d{1,1000}/)[0]
        const symbol = e.match(/[+-]/)[0]
        const time = e[e.length-1]
        let currentMoment
        if (e.match(/now/)){
            if (symbol==='-'){
                // @ts-ignore
                currentMoment = moment().subtract(value,`${time}`)
            }
            if (symbol==='+'){
                // @ts-ignore
                currentMoment = moment().add(value,`${time}`)
            }
        }
        return currentMoment
    }
    return moment(e)
}


export const decipherToRelative = (e?:string) =>{
    if (!e.match(/,/)){
        const value = e.match(/\d{1,1000}/)?.[0]
        const time = e[e.length-1]
        return {value:Number(value),period:time}
    }else {return {value:null,period:null} }
}



const test1 = (e:string) => {
    switch (e){
        case 's':
            return  'seconds'
        case 'm':
            return  'minutes'
        case 'h':
            return  'hours'
        case 'd':
            return  'days'
        case 'w':
            return 'weeks'
        case 'M':
            return 'months'
        case 'y':
            return  'years'
    }
}


export const arrInterval = [
    {value:'s',tittle:'Seconds'},
    {value:'m',tittle:'Minutes'},
    {value:'h',tittle:'Hour'},
]

export const arrRelative = [
    {value:'s',tittle:'Seconds ago'},
    {value:'m',tittle:'Minutes ago'},
    {value:'h',tittle:'Hour ago'},
    {value:'d',tittle:'Days ago'},
    {value:'w',tittle:'Week ago'},
    {value:'M',tittle:'Months ago'},
    {value:'y',tittle:'Years ago'},
    {value:'s+',tittle:'Seconds from now'},
    {value:'m+',tittle:'Minutes from now'},
    {value:'d+',tittle:'Days from now'},
    {value:'w+',tittle:'Weeks from now'},
    {value:'M+',tittle:'Months from now'},
    {value:'y+',tittle:'Years from now'},
]
