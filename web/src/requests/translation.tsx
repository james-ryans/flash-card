import axios, { AxiosResponse } from "axios";

interface TranslationRequest {
  text: string;
};

interface TranslationResponse {
  data: {
    text: string;
  };
};

async function translate(
  request: TranslationRequest,
): Promise<TranslationResponse> {
  return await axios.post(import.meta.env.VITE_SERVER_BASE_URL + "/translate", request).then((response: AxiosResponse<TranslationResponse>) => {
    return response.data;
  });
}

export { translate };
export type { TranslationRequest, TranslationResponse };
