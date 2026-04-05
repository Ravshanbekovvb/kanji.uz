import { useQuery } from '@tanstack/react-query'

export type RankingUser = {
	id: string
	userName: string
	role: string | null
	lessonsCount: number
	wordsCount: number
	rank: number
}

type RankingData = {
	topUsers: RankingUser[]
	currentUser: RankingUser | null
	totalUsers: number
}

type RankingResponse = {
	success: boolean
	message: string
	data: RankingData
}

export function useRanking() {
	return useQuery({
		queryKey: ['ranking'],
		queryFn: async (): Promise<RankingData> => {
			const response = await fetch('/api/ranking', {
				method: 'GET',
				credentials: 'include',
			})

			const result = (await response.json()) as RankingResponse

			if (!response.ok || !result.success) {
				throw new Error(result.message || 'Failed to fetch ranking')
			}

			return result.data
		},
	})
}
