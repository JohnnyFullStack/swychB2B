import * as moment from 'moment';

export function reportDays() {
    const day: any[] = Array.from(Array(31).keys())
    var daySelection = day.map((d, i) => {
        if (d == 0) {
            return ({
                key: moment.default().subtract(i, "days").format("YYYYMMDD"),
                text: `today`
            })
        }
        else if(d == 1){
            return ({
                key: moment.default().subtract(i, "days").format("YYYYMMDD"),
                text: `${d} day`
            })
        }
        else {
            return ({
                key: moment.default().subtract(i, "days").format("YYYYMMDD"),
                text: `${d} days`
            })
        }

    })

    return daySelection
}

export function reportWeeks() {
    const week: any[] = Array.from(Array(30).keys())
    var weekSelection = week.map((d, i) => {
        if(d == 0){
            return({
                key: moment.default().subtract(i + 1, "weeks").format("YYYYMMDD"),
                text: `${d + 1} week`
            })
        }
        return ({
            key: moment.default().subtract(i + 1, "weeks").format("YYYYMMDD"),
            text: `${d + 1} weeks`
        })
    })
    return weekSelection
}