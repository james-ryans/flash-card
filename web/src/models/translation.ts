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

export { Language };
export type { TranslationRequest, TranslationResponse };
