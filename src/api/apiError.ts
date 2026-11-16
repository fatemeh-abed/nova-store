import axios from 'axios';

export type ApiErrorCode =
  | 'NETWORK'
  | 'TIMEOUT'
  | 'NOT_FOUND'
  | 'SERVER'
  | 'UNAUTHORIZED'
  | 'VALIDATION'
  | 'RATE_LIMIT'
  | 'CANCELED'
  | 'UNKNOWN';

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    public readonly status?: number,
  ) {
    super(code);

    this.name = 'ApiError';
  }
}

export function mapApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return new ApiError('UNKNOWN');
  }

  if (error.code === 'ERR_CANCELED') {
    return new ApiError('CANCELED');
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError('TIMEOUT');
  }

  if (!error.response) {
    return new ApiError('NETWORK');
  }

  const status = error.response.status;

  if (status === 404) {
    return new ApiError('NOT_FOUND', status);
  }

  if (status === 401 || status === 403) {
    return new ApiError('UNAUTHORIZED', status);
  }

  if (status === 400 || status === 422) {
    return new ApiError('VALIDATION', status);
  }

  if (status === 429) {
    return new ApiError('RATE_LIMIT', status);
  }

  if (status >= 500) {
    return new ApiError('SERVER', status);
  }

  return new ApiError('UNKNOWN', status);
}
