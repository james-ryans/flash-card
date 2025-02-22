import axios, { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../models/common';
import { TranslationRequest, TranslationResponse } from '../models/translation';

async function translate(request: TranslationRequest): Promise<string> {
  return await axios
    .post(import.meta.env.VITE_SERVER_BASE_URL + '/translate', request, {
      withCredentials: true,
    })
    .then((response: AxiosResponse<TranslationResponse>) => {
      return response.data.data.text;
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

export { translate };
