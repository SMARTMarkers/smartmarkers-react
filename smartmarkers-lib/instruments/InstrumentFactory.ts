import { Questionnaire as IQuestionnaire, DomainResource } from "../models";
import { Questionnaire } from "./Questionnaire";
import { Instrument } from "./Instrument";
import Client from "fhirclient/lib/Client";

export class InstrumentFactory {
  constructor(private fhirClient: Client, private serviceRequestId: string) {}

  createInstrument(serviceRequestOptions: IQuestionnaire): Questionnaire;
  createInstrument(serviceRequestOptions: DomainResource): Instrument<any>;

  public createInstrument(questionnaireOptions: DomainResource) {
    if (questionnaireOptions.resourceType === "Questionnaire") {
      return new Questionnaire(
        questionnaireOptions as IQuestionnaire,
        this.fhirClient,
        this.serviceRequestId
      );
    } else {
      throw new Error("Select Questionnaire");
    }
  }
}
