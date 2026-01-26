import { BadRequest, ConflictError, NotFoundError, UnauthorizedError } from '@/types/errors'
import { apiResponse } from './api-response'

export function apiResponseError(error: unknown) {
	if (
		error instanceof NotFoundError ||
		error instanceof ConflictError ||
		error instanceof BadRequest ||
		error instanceof UnauthorizedError
	)
		return apiResponse(
			{ success: false, message: error.message, data: null },
			{ status: error.status }
		)

	return apiResponse(
		{
			success: false,
			message: 'Something went wrong',
			data: null,
		},
		{ status: 500 }
	)
}
