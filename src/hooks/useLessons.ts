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
export function useFindLessonsByUserId(userId: string | undefined) {
	const { isPending, error, data } = useQuery({
		queryKey: ['lessons', 'user', userId],
		queryFn: async () => {
			if (!userId) throw new Error('User ID is required')

			const res = await fetch(`/api/lessons/find/user/${userId}`, {
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
		enabled: !!userId, // Only run query if userId is available
		select: data => ({
			lessons: data.data.lesson || [],
			user: data.data,
		}),
	})

	return { data, isPending, error }
}

export function useUpdateLessonTitle() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['updateLessonTitle'],
		mutationFn: async ({ lessonId, title }: { lessonId: string; title: string }) => {
			const res = await fetch(`/api/lessons/update/${lessonId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title }),
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
			toast.success('Lesson title updated successfully')
		},
		onError: (error: any) => {
			toast.error(error.message || 'Failed to update lesson title')
		},
	})
}
