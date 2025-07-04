import { parseBoolean } from './parse-boolean'

export const getSearchParams = (url: URL) => {
	const { searchParams } = url

	const privateValue = searchParams.get('private') || false
	const publicValue = searchParams.get('public') || false

	const isPrivate = parseBoolean(privateValue)
	const isPublic = parseBoolean(publicValue)

	return { isPrivate, isPublic }
}
