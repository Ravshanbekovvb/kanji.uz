import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDeleteWord() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['deleteWord'],
		mutationFn: async (wordId: string) => {
			const res = await fetch(`/api/word/delete/${wordId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const responseData = await res.json()

			if (!res.ok) {
				throw new Error(responseData.message)
			}

			return responseData
		},
		onSuccess: () => {
			// Invalidate related queries to refetch updated data
			queryClient.invalidateQueries({ queryKey: ['lessons'] })
			toast.success('Word deleted successfully')
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to delete word')
		},
	})
}

export function useUpdateWord() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['updateWord'],
		mutationFn: async ({
			wordId,
			data,
		}: {
			wordId: string
			data: {
				kanji?: string
				translation?: string
				transcription?: string
				example?: string
				jlptLevel?: string
			}
		}) => {
			const res = await fetch(`/api/word/update/${wordId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			const responseData = await res.json()

			if (!res.ok) {
				throw new Error(responseData.message)
			}

			return responseData
		},
		onSuccess: () => {
			// Invalidate related queries to refetch updated data
			queryClient.invalidateQueries({ queryKey: ['lessons'] })
			toast.success('Word updated successfully')
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to update word')
		},
	})
}
