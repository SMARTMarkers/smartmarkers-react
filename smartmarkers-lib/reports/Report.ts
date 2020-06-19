export enum ReportType {
  Observation,
  QuestionnaireResponse,
}

export interface Report {
  id: string;
  getTitle: () => string;
  getNote: () => string;
}
