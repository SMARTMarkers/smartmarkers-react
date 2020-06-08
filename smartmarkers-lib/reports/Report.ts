export enum ReportType {
  Observation,
  QuestionnaireResponse,
}

export interface Report {
  getTitle: () => string;
  getNote: () => string;
}
