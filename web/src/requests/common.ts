import axios, { AxiosError, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { ErrorResponse, Request, SuccessResponse } from '../models/common';
import { ApiError, ValidationApiError } from '../models/error';

function req<T = any>(promise: Promise<AxiosResponse<SuccessResponse>>): Promise<SuccessResponse<T>> {
  return promise
    .then((response: AxiosResponse<SuccessResponse>) => {
      return response.data;
    })
    .catch((axiosError: AxiosError<ErrorResponse>) => {
      if (!axiosError.response) {
        throw new ApiError('Network error. Please try again.', 500);
      }

      const { statusCode, message, error } = axiosError.response?.data;
      switch (statusCode) {
        case 422:
          throw new ValidationApiError(message, error);
        default:
          throw new ApiError(message, statusCode, error);
      }
    });
}

function getUri(api: string, params: object): string {
  return axios.getUri({
    withCredentials: true,
    url: import.meta.env.VITE_SERVER_BASE_URL + api,
    params: params,
  });
}

function get<T = any>(api: string, headers: RawAxiosRequestHeaders = {}): Promise<SuccessResponse<T>> {
  return req(axios.get(import.meta.env.VITE_SERVER_BASE_URL + api, { headers, withCredentials: true }));
}

function post<T = any>(
  api: string,
  request: Request,
  headers: RawAxiosRequestHeaders = {},
): Promise<SuccessResponse<T>> {
  return req(axios.post(import.meta.env.VITE_SERVER_BASE_URL + api, request, { headers, withCredentials: true }));
}

export { getUri, get, post };
