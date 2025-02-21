import axios, { AxiosResponse } from 'axios';

enum Language {
  EN = 'en',
  ID = 'id',
}

interface TranslationRequest {
  text: string;
  from: Language;
  to: Language;
}

interface TranslationResponse {
  data: {
    text: string;
  };
}

async function translate(request: TranslationRequest): Promise<AxiosResponse<TranslationResponse>> {
  return await axios.post(import.meta.env.VITE_SERVER_BASE_URL + '/translate', request, {
    withCredentials: true,
  });
}

export { translate, Language };
export type { TranslationRequest, TranslationResponse };
