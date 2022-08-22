export interface IAlertSeverity {
  bg: string;
  border: string;
  text: string;
}

export interface IAlert {
  id: number;
  title?: string;
  message?: string;
  severity: IAlertSeverity;
}