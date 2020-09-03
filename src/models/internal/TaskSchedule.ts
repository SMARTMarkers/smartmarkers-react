import { DaysOfWeek, IPeriod, ITiming } from '..'
import { Report } from '../../reports'

export enum TaskScheduleStatus {
    Due,
    Overdue,
    Upcoming,
    Completed,
    Unknown,
    Inactive,
}

export const WEEKDAY = new Array<DaysOfWeek>(7)
WEEKDAY[0] = DaysOfWeek.Sun
WEEKDAY[1] = DaysOfWeek.Mon
WEEKDAY[2] = DaysOfWeek.Tue
WEEKDAY[3] = DaysOfWeek.Wed
WEEKDAY[4] = DaysOfWeek.Thu
WEEKDAY[5] = DaysOfWeek.Fri
WEEKDAY[6] = DaysOfWeek.Sat

function addDays(date: Date, days: number) {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

function areDatesEqual(date: Date, date2: Date) {
    if (
        date.getMonth() == date2.getMonth() &&
        date.getDate() == date2.getDate() &&
        date.getFullYear() == date2.getFullYear()
    ) {
        return true
    }
    return false
}

export class TaskSchedule {
    public occurrenceDateTime?: Date
    public occurrencePeriod?: IPeriod
    public occurrenceTiming?: ITiming
    public reports?: Report[]
    public status: TaskScheduleStatus
    public occurrenceDate: Date | undefined

    constructor(
        occurrenceDateTime?: Date,
        occurrencePeriod?: IPeriod,
        occurrenceTiming?: ITiming,
        reports?: Report[]
    ) {
        this.occurrenceDateTime = occurrenceDateTime
        this.occurrencePeriod = occurrencePeriod
        this.occurrenceTiming = occurrenceTiming
        this.reports = reports
        this.status = this.getStatus()
        this.occurrenceDate = this.getOccurrenceDate()
    }

    private isTodayInPeriod(period: IPeriod) {
        const today = new Date()
        let inBounds = true
        if (period) {
            if (period.start) {
                const start = new Date(period.start)
                if (start > today) {
                    return false
                }
            }
            if (period.end) {
                const end = new Date(period.end)
                if (end < today) {
                    return false
                }
            }
        }
        return inBounds
    }

    private getOccurrenceDate() {
        if (this.occurrenceDateTime) {
            return new Date(this.occurrenceDateTime)
        } else if (this.occurrencePeriod) {
            const inBounds = this.isTodayInPeriod(this.occurrencePeriod)
            if (inBounds) {
                return new Date()
            } else {
                return undefined
            }
        } else if (this.occurrenceTiming) {
            if (this.occurrenceTiming.repeat) {
                let inBounds = true
                if (this.occurrenceTiming.repeat.boundsPeriod) {
                    inBounds = this.isTodayInPeriod(this.occurrenceTiming.repeat.boundsPeriod)
                }
                if (!inBounds) {
                    return undefined
                }
                if (this.occurrenceTiming.repeat.dayOfWeek) {
                    const today = new Date()
                    const todayDay = today.getDay()
                    const todayDayOfWeek = WEEKDAY[todayDay]

                    const indexes: number[] = []
                    for (let day of this.occurrenceTiming.repeat.dayOfWeek) {
                        if (day == todayDayOfWeek) {
                            return today
                        }
                        indexes.push(WEEKDAY.indexOf(day))
                    }

                    let next = todayDay
                    let count = 0
                    for (let i = 1; i < 7; i++) {
                        next += i
                        count += 1
                        if (next >= 7) next = 0
                        if (this.occurrenceTiming.repeat.dayOfWeek.indexOf(WEEKDAY[next]) > -1) {
                            return addDays(today, count)
                        }
                    }
                }
            }
        }
        return undefined
    }

    private getStatus() {
        if (this.occurrenceDateTime || this.occurrencePeriod || this.occurrenceTiming) {
            const today = new Date()
            if (this.occurrenceDateTime || this.occurrencePeriod) {
                const day = this.getOccurrenceDate()
                const r = this.reports
                if (this.occurrencePeriod) {
                    if (this.occurrencePeriod.start) {
                        const start = new Date(this.occurrencePeriod.start)
                        if (areDatesEqual(start, today)) {
                            return TaskScheduleStatus.Due
                        } else if (start > today) {
                            return TaskScheduleStatus.Upcoming
                        }
                    } else if (this.occurrencePeriod.end) {
                        const end = new Date(this.occurrencePeriod.end)
                        if (end <= today) {
                            return TaskScheduleStatus.Due
                        } else {
                            return TaskScheduleStatus.Overdue
                        }
                    } else {
                        return TaskScheduleStatus.Overdue
                    }
                } else if (r && r.length > 0) {
                    return TaskScheduleStatus.Completed
                } else if (day) {
                    if (day > today) {
                        return TaskScheduleStatus.Upcoming
                    } else if (areDatesEqual(day, today)) {
                        return TaskScheduleStatus.Due
                    } else {
                        return TaskScheduleStatus.Overdue
                    }
                } else {
                    return TaskScheduleStatus.Overdue
                }
            } else if (this.occurrenceTiming) {
                const day = this.getOccurrenceDate()

                if (day) {
                    if (areDatesEqual(day, today)) {
                        return TaskScheduleStatus.Due
                    }
                    return TaskScheduleStatus.Upcoming
                } else {
                    return TaskScheduleStatus.Inactive
                }
            }
        } else {
            const r = this.reports
            if (r && r.length > 0) {
                return TaskScheduleStatus.Completed
            }
            return TaskScheduleStatus.Due
        }
        return TaskScheduleStatus.Unknown
    }
}
