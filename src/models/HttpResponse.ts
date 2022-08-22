import { AxiosError } from 'axios';
import { IHttpResponse } from '../@types/IHttpResponse';

export class HttpResponse implements IHttpResponse {
  code: number;
  message: string;
  payload?: any;

  constructor(code: number, message: string, payload?: any) {
    this.code = code;
    this.message = message;
    this.payload = payload ?? null;
  }

  /**
   * Convert AxiosError to HttpResponse
   */
  static fromAxiosError(axiosError: AxiosError) {
    if(!axiosError.response) throw new Error('No response found');
    return new HttpResponse(
      axiosError.response.status,
      (axiosError.response.data as {message: string}).message
    )
  }

}