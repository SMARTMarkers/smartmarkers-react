import {
  Identifier,
  CodeableConcept,
  Narrative,
  Resource,
  ServiceRequest as IServiceRequest,
  Extension,
  Meta,
  Questionnaire as IQuestionnaire,
  ResourceType,
  RequestStatus,
  RequestIntent,
  Reference,
  RequestPriority,
  Quantity,
  Ratio,
  Period,
  Timing,
  Annotation,
  DaysOfWeek,
} from "../models";
import Client from "fhirclient/lib/Client";
import { InstrumentFactory } from "../instruments/InstrumentFactory";
import { Questionnaire } from "../instruments/Questionnaire";
import { QuestionnaireResponse } from "../reports";

const WEEKDAY = new Array<DaysOfWeek>(7);
WEEKDAY[0] = DaysOfWeek.Sun;
WEEKDAY[1] = DaysOfWeek.Mon;
WEEKDAY[2] = DaysOfWeek.Tue;
WEEKDAY[3] = DaysOfWeek.Wed;
WEEKDAY[4] = DaysOfWeek.Thu;
WEEKDAY[5] = DaysOfWeek.Fri;
WEEKDAY[6] = DaysOfWeek.Sat;

export enum Status {
  Due,
  Overdue,
  Upcoming,
  Completed,
  Unknown,
  Inactive,
}

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function areDatesEqual(date: Date, date2: Date) {
  if (
    date.getMonth() == date2.getMonth() &&
    date.getDate() == date2.getDate() &&
    date.getFullYear() == date2.getFullYear()
  ) {
    return true;
  }
  return false;
}

export class ServiceRequest implements IServiceRequest {
  id: string;
  resourceType: ResourceType = "ServiceRequest";
  identifier?: Identifier[] | undefined;
  category?: CodeableConcept[] | undefined;
  code?: CodeableConcept | undefined;
  text?: Narrative | undefined;
  contained?: Resource[] | undefined;
  extension?: Extension[] | undefined;
  modifierExtension?: Extension[] | undefined;
  meta?: Meta | undefined;
  implicitRules?: string | undefined;
  language?: string | undefined;
  instrument?: Questionnaire;
  reports?: QuestionnaireResponse[];
  status: RequestStatus;
  intent: RequestIntent;
  subject: Reference;
  requester?: Reference;
  instantiatesCanonical?: string[] | undefined;
  instantiatesUri?: string[] | undefined;
  basedOn?: Reference[] | undefined;
  replaces?: Reference[] | undefined;
  requisition?: Identifier | undefined;
  priority?: RequestPriority | undefined;
  doNotPerform?: boolean | undefined;
  orderDetail?: CodeableConcept[] | undefined;
  quantityQuantity?: Quantity | undefined;
  quantityRatio?: Ratio | undefined;
  quantityRange?: Range | undefined;
  encounte?: Reference;
  occurrenceDateTime?: Date | undefined;
  occurrencePeriod?: Period | undefined;
  occurrenceTiming?: Timing | undefined;
  asNeededBoolean?: boolean | undefined;
  asNeededCodeableConcept?: CodeableConcept | undefined;
  authoredOn?: Date | undefined;
  performerType?: CodeableConcept | undefined;
  performer?: Reference[] | undefined;
  locationCode?: CodeableConcept[] | undefined;
  locationReference?: Reference[] | undefined;
  reasonCode?: CodeableConcept[] | undefined;
  reasonReference?: Reference[] | undefined;
  insurance?: Reference[] | undefined;
  supportingInfo?: Reference[] | undefined;
  specimen?: Reference[] | undefined;
  bodySite?: CodeableConcept[] | undefined;
  note?: Annotation[] | undefined;
  patientInstruction?: String | undefined;
  relevantHistory?: Reference[] | undefined;

  constructor(item: IServiceRequest, private fhirClient: Client) {
    this.id = item.id;
    this.status = item.status;
    this.intent = item.intent ? item.intent : RequestIntent.Option;
    this.subject = item.subject;
    Object.assign(this, item);
  }

  private isTodayInPeriod(period: Period) {
    const today = new Date();
    let inBounds = true;
    if (period) {
      if (period.start) {
        const start = new Date(period.start);
        if (start > today) {
          return false;
        }
      }
      if (period.end) {
        const end = new Date(period.end);
        if (end < today) {
          return false;
        }
      }
    }
    return inBounds;
  }

  public getOccurrenceDate() {
    if (this.occurrenceDateTime) {
      return new Date(this.occurrenceDateTime);
    } else if (this.occurrencePeriod) {
      const inBounds = this.isTodayInPeriod(this.occurrencePeriod);
      if (inBounds) {
        return new Date();
      } else {
        return undefined;
      }
    } else if (this.occurrenceTiming) {
      if (this.occurrenceTiming.repeat) {
        let inBounds = true;
        if (this.occurrenceTiming.repeat.boundsPeriod) {
          inBounds = this.isTodayInPeriod(
            this.occurrenceTiming.repeat.boundsPeriod
          );
        }
        if (!inBounds) {
          return undefined;
        }
        if (this.occurrenceTiming.repeat.dayOfWeek) {
          const today = new Date();
          const todayDay = today.getDay();
          const todayDayOfWeek = WEEKDAY[todayDay];

          const indexes: number[] = [];
          for (let day of this.occurrenceTiming.repeat.dayOfWeek) {
            if (day == todayDayOfWeek) {
              return today;
            }
            indexes.push(WEEKDAY.indexOf(day));
          }

          let next = todayDay;
          let count = 0;
          for (let i = 1; i < 7; i++) {
            next += i;
            count += 1;
            if (next >= 7) next = 0;
            if (
              this.occurrenceTiming.repeat.dayOfWeek.indexOf(WEEKDAY[next]) > -1
            ) {
              return addDays(today, count);
            }
          }
        }
      }
    }
    return undefined;
  }

  public getTitle() {
    if (this.code && this.code.text) return this.code.text;
    if (
      this.code &&
      this.code.coding &&
      this.code.coding[0] &&
      this.code.coding[0].display
    )
      return this.code.coding[0].display;
    if (this.category && this.category[0] && this.category[0].text)
      return this.category[0].text;

    return `REQ ${this.id}`;
  }

  public getNote() {
    if (
      this.modifierExtension &&
      this.modifierExtension.length > 0 &&
      this.modifierExtension[0] &&
      this.modifierExtension[0].valueReference &&
      this.modifierExtension[0].valueReference.reference
    ) {
      return this.modifierExtension[0].valueReference.reference;
    }
    if (
      this.extension &&
      this.extension.length > 0 &&
      this.extension[0] &&
      this.extension[0].valueReference &&
      this.extension[0].valueReference.reference
    ) {
      return this.extension[0].valueReference.reference;
    }

    return this.resourceType;
  }

  private getExtensionReference() {
    if (
      this.modifierExtension &&
      this.modifierExtension.length > 0 &&
      this.modifierExtension[0] &&
      this.modifierExtension[0].valueReference &&
      this.modifierExtension[0].valueReference.reference
    ) {
      return this.modifierExtension[0].valueReference.reference;
    }
    if (
      this.extension &&
      this.extension.length > 0 &&
      this.extension[0] &&
      this.extension[0].valueReference &&
      this.extension[0].valueReference.reference
    ) {
      return this.extension[0].valueReference.reference;
    }
    return undefined;
  }

  async getInstrument() {
    if (this.instrument) {
      return this.instrument;
    }
    const reference = this.getExtensionReference();
    if (reference) {
      const response = await this.fhirClient
        .request<IQuestionnaire>(reference)
        .catch((err) => {
          console.error(err);
          return undefined;
        });
      console.log({ insturmentResponse: response });
      if (response) {
        const instrumentFactory = new InstrumentFactory(
          this.fhirClient,
          this.id
        );
        this.instrument = instrumentFactory.createInstrument(response);
      } else {
        this.instrument = undefined;
      }

      return this.instrument;
    }
    return undefined;
  }

  async getReports() {
    if (this.reports) {
      return this.reports;
    }
    const instrument = await this.getInstrument();
    if (instrument) {
      this.reports = await instrument.getReports();
    }

    return this.reports;
  }

  setReports(reports: QuestionnaireResponse[] | undefined) {
    this.reports = reports;
  }

  getReportsCount() {
    const r = this.reports;

    if (r) {
      return r.length;
    }
    return 0;
  }

  getStatus() {
    if (
      this.occurrenceDateTime ||
      this.occurrencePeriod ||
      this.occurrenceTiming
    ) {
      const today = new Date();
      if (this.occurrenceDateTime || this.occurrencePeriod) {
        const day = this.getOccurrenceDate();
        const r = this.reports;
        if (this.occurrencePeriod) {
          if (this.occurrencePeriod.start) {
            const start = new Date(this.occurrencePeriod.start);
            if (areDatesEqual(start, today)) {
              return Status.Due;
            } else if (start > today) {
              return Status.Upcoming;
            }
          } else if (this.occurrencePeriod.end) {
            const end = new Date(this.occurrencePeriod.end);
            if (end <= today) {
              return Status.Due;
            } else {
              return Status.Overdue;
            }
          } else {
            return Status.Overdue;
          }
        } else if (r && r.length > 0) {
          return Status.Completed;
        } else if (day) {
          if (day > today) {
            return Status.Upcoming;
          } else if (areDatesEqual(day, today)) {
            return Status.Due;
          } else {
            return Status.Overdue;
          }
        } else {
          return Status.Overdue;
        }
      } else if (this.occurrenceTiming) {
        const day = this.getOccurrenceDate();

        if (day) {
          if (areDatesEqual(day, today)) {
            return Status.Due;
          }
          return Status.Upcoming;
        } else {
          return Status.Inactive;
        }
      }
    } else {
      const r = this.reports;
      if (r && r.length > 0) {
        return Status.Completed;
      }
      return Status.Due;
    }
    return Status.Unknown;
  }
}
