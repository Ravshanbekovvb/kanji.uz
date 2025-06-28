import { type ApiResponseType } from '@/types/types'
import { NextResponse } from 'next/server'

export function apiResponse<T>(body: ApiResponseType<T>, init?: ResponseInit) {
	return NextResponse.json(body, init)
}
