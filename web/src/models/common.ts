interface Request {}

interface Response {
  message: string;
  statusCode: number;
}

interface SuccessResponse<T = any> extends Response {
  data: T;
}

interface ErrorResponse extends Response {
  error: string;
};

const DEFAULT_ERROR_RESPONSE: ErrorResponse = {
  message: 'An error occurred',
  statusCode: 500,
  error: 'INTERNAL_SERVER_ERROR',
};

export type { SuccessResponse, ErrorResponse, Response, Request };
export { DEFAULT_ERROR_RESPONSE };
