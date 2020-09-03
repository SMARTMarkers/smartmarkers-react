import { IBackboneElement } from './BackboneElement'
import { ICodeableConcept } from './CodeableConcept'
import { IDuration } from './Duration'
import { IPeriod } from './Period'
import { IRange } from './Range'
export interface ITiming extends IBackboneElement {
    event?: Date[]
    code?: ICodeableConcept
    repeat?: {
        boundsDuration?: IDuration
        boundsRange?: IRange
        boundsPeriod?: IPeriod
        count?: number
        countMax?: number
        duration?: number
        durationMax?: number
        durationUnit?: UnitsOfTime
        frequency?: number
        frequencyMax?: number
        period?: number
        periodMax?: number
        periodUnit?: UnitsOfTime
        dayOfWeek?: DaysOfWeek[]
        timeOfDay?: Date
        when?: EventTiming[]
        offset?: number
    }
}
export enum EventTiming {
    HS = 'HS',
    WAKE = 'WAKE',
    C = 'C',
    CM = 'CM',
    CD = 'CD',
    CV = 'CV',
    AC = 'AC',
    ACM = 'ACM',
    ACD = 'ACD',
    ACV = 'ACV',
    PC = 'PC',
    PCM = 'PCM',
    PCD = 'PCD',
    PCV = 'PCV',
}
export enum UnitsOfTime {
    S = 's',
    Min = 'min',
    H = 'h',
    D = 'd',
    WK = 'wk',
    Mo = 'mo',
    A = 'a',
}
export enum DaysOfWeek {
    Mon = 'mon',
    Tue = 'tue',
    Wed = 'wed',
    Thu = 'thu',
    Fri = 'fri',
    Sat = 'sat',
    Sun = 'sun',
}
