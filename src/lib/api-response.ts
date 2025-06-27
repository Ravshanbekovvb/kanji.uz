import { NextResponse } from 'next/server'

export type ApiResponse<T = null> = {
	success: boolean
	message: string
	data: T
}

export function ApiResponse<T>(body: ApiResponse<T>, init?: ResponseInit) {
	const res = {
		success: body.success,
		message: body.message,
		data: body.success ? body.data : null,
	}

	return NextResponse.json(res, init)
}
