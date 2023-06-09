export interface SFError {
  response?: SFResponse
}

interface SFResponse {
  headers: Object;
  statusCode: number;
  body: string;
}