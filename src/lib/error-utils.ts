import axios, { AxiosError } from "axios";

/**
 * Safely extracts error message from unknown error types
 */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const errorData = axiosError.response?.data as any;
    if (errorData?.error?.error_data) {
      const errorDetails = errorData.error.error_data;
      if (typeof errorDetails === 'object') {
        if (errorDetails.details) {
          return typeof errorDetails.details === 'string'
            ? errorDetails.details
            : JSON.stringify(errorDetails.details);
        }
        if (errorDetails.messaging_product) {
          return `Messaging product error: ${JSON.stringify(errorDetails.messaging_product)}`;
        }
        if (errorDetails.template) {
          return `Template error: ${JSON.stringify(errorDetails.template)}`;
        }
        return `API Error Details: ${JSON.stringify(errorDetails)}`;
      }
      return String(errorDetails);
    }

    if (errorData?.error?.message) {
      return errorData.error.message;
    }

    if (errorData?.message) {
      return errorData.message;
    }
    return axiosError.message || 'Network error occurred';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
}


export function createError(originalError: unknown): Error {
  const error = getErrorMessage(originalError);
  return new Error(error);
}


export function validateRequiredString(value: unknown, fieldName: string): asserts value is string {
  if (!value || typeof value !== 'string' || !value.trim()) {
    throw new Error(`${fieldName} is required and must be a non-empty string`);
  }
}

export function validateRequired<T>(value: T | null | undefined, fieldName: string): asserts value is T {
  if (!value) {
    throw new Error(`${fieldName} is required`);
  }
}