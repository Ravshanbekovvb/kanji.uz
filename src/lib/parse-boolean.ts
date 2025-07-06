export const parseBoolean = (value: string | boolean): Boolean => {
	if (typeof value === 'boolean') return value

	if (typeof value === 'string') {
		const lowerValue = value.toLowerCase()

		if (lowerValue === 'true') return true

		if (lowerValue === 'false') return false
	}

	throw new Error('Failed to parse string to boolean')
}
