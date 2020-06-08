import {
  DomainResource,
  Observation as IObservation,
  QuestionnaireResponse as IQuestionnaireResponse,
} from "../models";
import { QuestionnaireResponse } from "./QuestionnaireResponse";
import { Observation } from "./Observation";
import Client from "fhirclient/lib/Client";

export class ReportFactory {
  constructor(private fhirClient: Client) {}

  createReport(reportOptions: IQuestionnaireResponse): QuestionnaireResponse;
  createReport(reportOptions: IObservation): Observation;

  public createReport(reportOptions: DomainResource) {
    if (reportOptions.resourceType === "QuestionnaireResponse") {
      return new QuestionnaireResponse(
        reportOptions as IQuestionnaireResponse,
        this.fhirClient
      );
    } else if (reportOptions.resourceType === "Observation") {
      return new Observation(reportOptions as IObservation, this.fhirClient);
    } else {
      throw new Error("Select either a QuestionnaireResponse or a Observation");
    }
  }
}
