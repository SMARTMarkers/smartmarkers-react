import {
  Observation as IObservation,
  Identifier,
  Reference,
  ObservationStatus,
  CodeableConcept,
  Period,
  Timing,
  Quantity,
  Ratio,
  SampledData,
  Annotation,
  ObservationReferenceRange,
  ObservationComponent,
  Narrative,
  Resource,
  Extension,
  ResourceType,
  Meta,
} from "../models";
import { Server } from "../models/internal";
import { Report } from "./Report";

export class Observation implements IObservation, Report {
  id: string;
  resourceType: ResourceType = "Observation";
  code: CodeableConcept;
  identifier?: Identifier[] | undefined;
  basedOn?: Reference[] | undefined;
  partOf?: Reference[] | undefined;
  status: ObservationStatus;
  category?: CodeableConcept[] | undefined;

  subject?: Reference | undefined;
  focus?: Reference[] | undefined;
  encounter?: Reference | undefined;
  effectiveDateTime?: Date | undefined;
  effectivePeriod?: Period | undefined;
  effectiveTiming?: Timing | undefined;
  effectiveDate?: Date | undefined;
  issued?: Date | undefined;
  performer?: Reference[] | undefined;
  valueQuantity?: Quantity | undefined;
  valueCodeableConcept?: CodeableConcept | undefined;
  valueString?: string | undefined;
  valueBoolean?: boolean | undefined;
  valueInteger?: number | undefined;
  valueRange?: Range | undefined;
  valueRatio?: Ratio | undefined;
  valueSampledData?: SampledData | undefined;
  valueTime?: Date | undefined;
  valueDateTime?: Date | undefined;
  valuePeriod?: Period | undefined;
  dataAbsentReason?: CodeableConcept | undefined;
  interpretation?: CodeableConcept[] | undefined;
  note?: Annotation[] | undefined;
  bodySite?: CodeableConcept | undefined;
  method?: CodeableConcept | undefined;
  specimen?: Reference | undefined;
  device?: Reference | undefined;
  referenceRange?: ObservationReferenceRange[] | undefined;
  hasMember?: Reference[] | undefined;
  derivedFrom?: Reference[] | undefined;
  component?: ObservationComponent[] | undefined;
  text?: Narrative | undefined;
  contained?: Resource[] | undefined;
  extension?: Extension[] | undefined;
  modifierExtension?: Extension[] | undefined;
  meta?: Meta | undefined;
  implicitRules?: string | undefined;
  language?: string | undefined;

  constructor(item: IObservation, private server: Server) {
    this.id = item.id;
    this.status = item.status;
    this.code = item.code;
    Object.assign(this, item);
  }

  public getSummary() {
    return this.getTitle();
  }

  public getTitle() {
    if (this.code && this.code.text) {
      return this.code.text;
    }

    return this.id;
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
}
