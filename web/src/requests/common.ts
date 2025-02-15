type Response = {
  message: string;
  statusCode: number;
};

type ErrorResponse = Response & {
  error: string;
};

const DEFAULT_ERROR_RESPONSE: ErrorResponse = {
  message: 'An error occurred',
  statusCode: 500,
  error: 'INTERNAL_SERVER_ERROR',
}

export type { ErrorResponse, Response };
export { DEFAULT_ERROR_RESPONSE };
