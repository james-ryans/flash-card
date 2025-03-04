export class ApiError<T = string> {
    message: T;
    statusCode: number;
    error?: string;

    constructor(message: T, statusCode: number, error?: string) {
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
    }
}

export class ValidationApiError extends ApiError<Array<{ field: string; message: string }>> {
    constructor(message: Array<{ field: string; message: string }>, error?: string) {
        super(message, 422, error);
    }
}