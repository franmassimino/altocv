/**
 * Standard error classes for server-side error handling
 * Used across Server Actions and API routes
 */

/**
 * Base error class for application errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 401 Unauthorized - User not authenticated
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'You must be logged in to access this resource') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

/**
 * 403 Forbidden - User authenticated but lacks permission
 */
export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to access this resource') {
    super(message, 403, 'FORBIDDEN');
  }
}

/**
 * 404 Not Found - Resource does not exist
 */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

/**
 * 400 Bad Request - Invalid input data
 */
export class ValidationError extends AppError {
  constructor(
    message = 'Invalid input data',
    public readonly errors?: Record<string, string[]>
  ) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

/**
 * 409 Conflict - Resource conflict (duplicate, version mismatch)
 */
export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409, 'CONFLICT');
  }
}

/**
 * 429 Too Many Requests - Rate limit exceeded
 */
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

/**
 * 402 Payment Required - Insufficient credits or subscription required
 */
export class InsufficientCreditsError extends AppError {
  constructor(message = 'Insufficient credits to complete this action') {
    super(message, 402, 'INSUFFICIENT_CREDITS');
  }
}

/**
 * 500 Internal Server Error - Unexpected server error
 */
export class InternalServerError extends AppError {
  constructor(message = 'An unexpected error occurred') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}
