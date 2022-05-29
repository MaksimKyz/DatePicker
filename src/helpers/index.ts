export const Time = (e:string) => {
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
