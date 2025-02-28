import { TranslationRequest, TranslationResponse } from '../models/translation';
import { post } from './common';

async function translate(request: TranslationRequest): Promise<string> {
  return await post('/translate', request).then((response: TranslationResponse) => {
    return response.data.text;
  });
}

export { translate };
