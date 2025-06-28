import { CreateUserRequest } from '@/types/types'

export async function POST(request: Request) {
	const { email, password, role }: CreateUserRequest = await request.json()

	try {
	} catch (error) {}
}
