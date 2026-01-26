export class NotFoundError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'NotFoundError'
		this.status = 404
		this.message = message
	}

	status: number
	message: string
}

export class ConflictError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'ConflictError'
		this.status = 409
		this.message = message
	}

	status: number
	message: string
}

export class UnauthorizedError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'UnauthorizedError'
		this.status = 401
		this.message = message
	}

	status: number
	message: string
}

export class BadRequest extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'UnauthorizedError'
		this.status = 401
		this.message = message
	}

	status: number
	message: string
}
