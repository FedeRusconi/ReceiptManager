import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpResponse } from '../models/HttpResponse';

type THttpConfig = {
  headers: {
    [key: string]: string
  }
}

export class HttpService {
  private static _instance: HttpService;
  
  // private readonly baseUrl = 'http://localhost:4000/api/';
  private readonly baseUrl = 'https://receipt-manager-csc301.herokuapp.com/api/';
  static readonly TOKEN_KEY = 'rm_session_id';

  private constructor() {}

  /**
   * Return current instance
   */
  static instance() {
    if(!HttpService._instance) {
      HttpService._instance = new HttpService();
    }
    return HttpService._instance;
  }

  /**
   * Define request configurations
   */
  private config(customConfig?: THttpConfig) {
    const httpHeaders: THttpConfig = {headers: customConfig ? customConfig.headers : {}};
    const token = localStorage.getItem(HttpService.TOKEN_KEY);
    if (token) httpHeaders.headers.Authorization = `Bearer ${token}`;
    return httpHeaders as AxiosRequestConfig
  }

  /**
   * Send a GET request
   * @param endpoint The endpoint to attach to the base
   */
  get(endpoint: string) {
    return axios.get(this.baseUrl + endpoint, this.config())
      .catch((error: AxiosError) => {
        // Convert axios to custom error (easier to handle and package agnostic)
        throw HttpResponse.fromAxiosError(error);
      });
  }

  /**
   * Send a POST request
   * @param endpoint The endpoint to attach to the base
   * @param body The payload of the request
   * @param config Any additional configuration - Optional
   */
  post(endpoint: string, body: any, config?: THttpConfig) {
    return axios.post(this.baseUrl + endpoint, body, this.config(config))
      .catch((error: AxiosError) => {
        // Convert axios to custom error (easier to handle and package agnostic)
        throw HttpResponse.fromAxiosError(error);
      });
  }

  /**
   * Send a PUT request
   * @param endpoint The endpoint to attach to the base
   * @param body The payload of the request
   */
  put(endpoint: string, body: any) {
    return axios.put(this.baseUrl + endpoint, body, this.config())
      .catch((error: AxiosError) => {
        // Convert axios to custom error (easier to handle and package agnostic)
        throw HttpResponse.fromAxiosError(error);
      });
  }

  /**
   * Send a PATCH request
   * @param endpoint The endpoint to attach to the base
   * @param body The payload of the request
   * @param config Any additional configuration - Optional
   */
  patch(endpoint: string, body: any, config?: THttpConfig) {
    return axios.patch(this.baseUrl + endpoint, body, this.config(config))
      .catch((error: AxiosError) => {
        // Convert axios to custom error (easier to handle and package agnostic)
        throw HttpResponse.fromAxiosError(error);
      });
  }

  /**
   * Send a DEELETE request
   * @param endpoint The endpoint to attach to the base
   */
  delete(endpoint: string) {
    return axios.delete(this.baseUrl + endpoint, this.config())
      .catch((error: AxiosError) => {
        // Convert axios to custom error (easier to handle and package agnostic)
        throw HttpResponse.fromAxiosError(error);
      });
  }
  
}