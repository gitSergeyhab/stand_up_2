export class ApiError extends Error {
    status: number;
    errors: string[];
    message: string;

    constructor (status: number, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'You are Unauthorized')
    }

    static ForbiddenError() {
        return new ApiError(403, 'access denied')
    }

    static BadRequest(message: string, errors: string[] = []) {
        return new ApiError(400, message, errors)
    }

    static NotFound(message: string, errors: string[] = []) {
        return new ApiError(404, message, errors)
    }
}