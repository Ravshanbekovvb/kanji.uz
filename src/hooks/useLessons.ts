import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ParamValue } from 'next/dist/server/request/params'
import { toast } from 'sonner'

export function useLessons() {
	const { isPending, error, data } = useQuery({
		queryKey: ['lessons'],
		queryFn: () => fetch('/api/lessons/find').then(res => res.json()),
	})
	return { data, isPending, error }
}

export function useDeleteLesson() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete Lesson'],
		mutationFn: async (LessonId: string) => {
			const res = await fetch(`/api/lessons/delete/${LessonId}`, { method: 'DELETE' })

			if (!res.ok) throw new Error('Failed to delete lesson')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['lessons'] })
		},
		onError: (e: any) => {
			toast.error(e.message)
		},
	})
}
export function useFindLessonById(LessonId: ParamValue) {
	const { isPending, error, data } = useQuery({
		queryKey: ['lessons', 'lesson', LessonId],
		queryFn: async () => {
			const res = await fetch(`/api/lessons/find/${LessonId}`, {
				method: 'GET',
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
		select: data => ({
			words: data.data.words,
			title: data.data.title[0],
		}),
	})

	return { data, isPending, error }
}
