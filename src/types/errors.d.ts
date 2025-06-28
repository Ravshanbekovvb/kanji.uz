import Error from 'next/error'

export class NotFoundError extends Error {
	status: number
	message: string

	constructor(message: string) {
		super(message)
		this.name = 'NotFoundError'
		this.status = 404
	}
}

export class ConflictError extends Error {
	status: number
	message: string

	constructor(message: string) {
		super(message)
		this.name = 'ConflictError'
		this.status = 409
	}
}
