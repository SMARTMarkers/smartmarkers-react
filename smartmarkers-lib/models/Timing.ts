import { BackboneElement } from "./BackboneElement";
import { CodeableConcept } from "./CodeableConcept";
import { Duration } from "./Duration";
import { Period } from "./Period";
import { Range } from "./Range";
export interface Timing extends BackboneElement {
  event?: Date[];
  code?: CodeableConcept;
  repeat?: {
    boundsDuration?: Duration;
    boundsRange?: Range;
    boundsPeriod?: Period;
    count?: number;
    countMax?: number;
    duration?: number;
    durationMax?: number;
    durationUnit?: UnitsOfTime;
    frequency?: number;
    frequencyMax?: number;
    period?: number;
    periodMax?: number;
    periodUnit?: UnitsOfTime;
    dayOfWeek?: DaysOfWeek[];
    timeOfDay?: Date;
    when?: EventTiming[];
    offset?: number;
  };
}
export enum EventTiming {
  HS = "HS",
  WAKE = "WAKE",
  C = "C",
  CM = "CM",
  CD = "CD",
  CV = "CV",
  AC = "AC",
  ACM = "ACM",
  ACD = "ACD",
  ACV = "ACV",
  PC = "PC",
  PCM = "PCM",
  PCD = "PCD",
  PCV = "PCV",
}
export enum UnitsOfTime {
  S = "s",
  Min = "min",
  H = "h",
  D = "d",
  WK = "wk",
  Mo = "mo",
  A = "a",
}
export enum DaysOfWeek {
  Mon = "mon",
  Tue = "tue",
  Wed = "wed",
  Thu = "thu",
  Fri = "fri",
  Sat = "sat",
  Sun = "sun",
}
