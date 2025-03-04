interface Request {}

interface SuccessResponse<T = any> {
  data: T;
  message: string;
  statusCode: number;
}

type ErrorResponse =
  | {
      message: string;
      error?: string;
      statusCode: 400 | 401 | 402 | 500;
    }
  | {
      message: Array<{ field: string; message: string }>;
      error: string;
      statusCode: 422;
    };

export type { Request };
export type { SuccessResponse, ErrorResponse };
