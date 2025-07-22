import { useQuery } from '@tanstack/react-query'

interface UserLoginStats {
	id: string
	userName: string
	email: string
	loginCount: number
	role: string
	createdAt: string
}

interface LoginStatsResponse {
	success: boolean
	message: string
	data: UserLoginStats[]
}

async function fetchUserLoginStats(): Promise<UserLoginStats[]> {
	const response = await fetch('/api/users/login-stats')
	if (!response.ok) {
		throw new Error('Failed to fetch user login statistics')
	}
	const result: LoginStatsResponse = await response.json()
	return result.data
}

export function useUserLoginStats() {
	return useQuery({
		queryKey: ['userLoginStats'],
		queryFn: fetchUserLoginStats,
		refetchInterval: 30000, // Refetch every 30 seconds
	})
}

export type { UserLoginStats }
