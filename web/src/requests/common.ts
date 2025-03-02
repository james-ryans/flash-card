import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { ErrorResponse, Request, SuccessResponse } from '../models/common';

function req<T = any>(promise: Promise<AxiosResponse<SuccessResponse>>): Promise<SuccessResponse<T>> {
  return promise
    .then((response: AxiosResponse<SuccessResponse>) => {
      return response.data;
    })
    .catch((error: AxiosError<ErrorResponse>) => {
      return Promise.reject(
        new Error(
          (Array.isArray(error.response?.data.message)
            ? error.response?.data.message[0]
            : error.response?.data.message) || error.message,
        ),
      );
    });
}

function get<T = any>(api: string, headers: RawAxiosRequestHeaders = {}): Promise<SuccessResponse<T>> {
  return req(axios.get(import.meta.env.VITE_SERVER_BASE_URL + api, { headers, withCredentials: true }));
}

function getWithoutCredentials<T = any>(api: string, headers: RawAxiosRequestHeaders = {}): Promise<SuccessResponse<T>> {
  return req(axios.get(import.meta.env.VITE_SERVER_BASE_URL + api, { headers }));
}

function post<T = any>(api: string, request: Request, headers: RawAxiosRequestHeaders = {}): Promise<SuccessResponse<T>> {
  return req(axios.post(import.meta.env.VITE_SERVER_BASE_URL + api, request, { headers, withCredentials: true }));
}

export { get, getWithoutCredentials, post };
