import { Questionnaire as IQuestionnaire, DomainResource } from "../models";
import { Questionnaire } from "./Questionnaire";
import { Instrument } from "./Instrument";
import { Server } from "../models/internal";

export class InstrumentFactory {
  constructor(private server: Server) {}

  createInstrument(serviceRequestOptions: IQuestionnaire): Questionnaire;
  createInstrument(serviceRequestOptions: DomainResource): Instrument;

  public createInstrument(questionnaireOptions: DomainResource) {
    if (questionnaireOptions.resourceType === "Questionnaire") {
      return new Questionnaire(
        questionnaireOptions as IQuestionnaire,
        this.server
      );
    } else {
      throw new Error("Select Questionnaire");
    }
  }
}
