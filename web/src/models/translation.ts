import { Request, SuccessResponse } from './common';

enum Language {
  EN = 'en',
  ID = 'id',
}

interface TranslationRequest extends Request {
  text: string;
  from: Language;
  to: Language;
}

interface Translation {
  text: string;
}
interface TranslationResponse extends SuccessResponse<Translation> {}

export { Language };
export type { TranslationRequest, TranslationResponse };
