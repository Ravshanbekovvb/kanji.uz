import { queryClient } from '@/lib/query-client'
import { CreateReadingProgress, ReadingType } from '@/types/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ReadingProgress, ReadingSection } from '../../prisma/__generated__'
type ReadingSectionWithCount = ReadingSection & {
	_count: { readingTests: number }
}
type CreateReadingSectionWithReadingTest = {
	title: string
	jlptLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
	readingTests: {
		text: string
		difficulty: 'MEDIUM' | 'EASY' | 'HARD'
		mainQuestion: string
		authorId: string
		questions: {
			question: string
			options: string[]
			correctAnswer: number
		}[]
	}[]
}
interface ReadingSectionData {
	level: 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
	sectionCount: number
	readingCount: number
	readingSections: { _count: { readingTests: number } }[]
}

export function useReadingAllPrefetch() {
	return queryClient.prefetchQuery({
		queryKey: ['reading-all'],
		queryFn: async (): Promise<{ data: ReadingSectionWithCount[] }> => {
			const res = await fetch('/api/readings/all')
			const responseData = await res.json()
			if (!responseData.success) {
				throw new Error(responseData.message || 'Failed to fetch reading sections')
			}
			return responseData.data
		},
	})
}
export function useReadingAll() {
	return useQuery({
		queryKey: ['reading-all'],
		queryFn: async (): Promise<ReadingSectionData[]> => {
			const res = await fetch('/api/readings/all')
			const responseData = await res.json()
			if (!responseData.success) {
				throw new Error(responseData.message || 'Failed to fetch reading sections')
			}
			return responseData.data
		},
		// select: data => data.data,
	})
}

export function useReadingSections() {
	return useQuery({
		queryKey: ['readingSections'],
		queryFn: async (): Promise<{ data: ReadingSectionWithCount[] }> => {
			const res = await fetch('/api/readings/get-reading-sections')
			const responseData = await res.json()
			if (!responseData.success) {
				throw new Error(responseData.message || 'Failed to fetch reading sections')
			}
			return responseData
		},
		select: data => data.data,
	})
}
export function useReadingTests(id: string) {
	return useQuery({
		queryKey: ['readingTests', id],
		queryFn: async (): Promise<{ data: ReadingType }> => {
			const res = await fetch(`/api/readings/get-reading-sections/with-tests/${id}`)
			const responseData = await res.json()
			if (!responseData.success) {
				throw new Error(responseData.message || 'Failed to fetch reading tests')
			}

			return responseData
		},
		select: data => data.data,
		enabled: !!id,
	})
}

export function useDeleteReadingSection() {
	return useMutation({
		mutationKey: ['delete-reading-section'],
		mutationFn: async (id: string) => {
			const res = await fetch(`/api/readings/delete/${id}`, { method: 'DELETE' })
			const responseData = await res.json()

			if (!responseData.success) {
				throw new Error(responseData?.message || 'Failed to delete reading section')
			}
			return responseData
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['readingSections'] })
			queryClient.invalidateQueries({ queryKey: ['reading-sections-by-jlpt'] })
			toast.success('Reading section deleted successfully')
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}
export function useUpdateReadingSectionTitle(id: string) {
	return useMutation({
		mutationKey: ['update-reading-section-title', id],
		mutationFn: async (data: { title: string }) => {
			const res = await fetch(`/api/readings/update/${id}/title`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const responseData = await res.json()

			if (!responseData.success) {
				throw new Error(responseData?.message || 'Failed to update title')
			}

			return responseData
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['readingSections'] })
			queryClient.invalidateQueries({ queryKey: ['reading-sections-by-jlpt'] })
			toast.success('Title updated successfully')
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}

export function useUpdateReadingSection() {
	return useMutation({
		mutationKey: ['update-reading-section'],
		mutationFn: async (data: {
			id: string
			title?: string
			jlptLevel?: 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
		}) => {
			const { id, ...updateData } = data
			const res = await fetch(`/api/readings/update/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			})
			const responseData = await res.json()

			if (!responseData.success) {
				throw new Error(responseData?.message || 'Failed to update reading section')
			}

			return responseData
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['readingSections'] })
			queryClient.invalidateQueries({ queryKey: ['reading-sections-by-jlpt'] })
			queryClient.invalidateQueries({ queryKey: ['reading-all'] })
			toast.success('Reading section updated successfully')
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}

export function useUpdateReadingTest() {
	return useMutation({
		mutationKey: ['update-reading-test'],
		mutationFn: async (data: {
			testId: string
			text?: string
			mainQuestion?: string
			difficulty?: 'EASY' | 'MEDIUM' | 'HARD'
			questions?: {
				id?: string
				question: string
				options: string[]
				correctAnswer: number
			}[]
		}) => {
			const { testId, ...updateData } = data
			const res = await fetch(`/api/readings/update-test/${testId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			})
			const responseData = await res.json()

			if (!responseData.success) {
				throw new Error(responseData?.message || 'Failed to update reading test')
			}

			return responseData
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['readingTests'] })
			queryClient.invalidateQueries({ queryKey: ['reading-sections-by-jlpt'] })
			queryClient.invalidateQueries({ queryKey: ['readingSections'] })
			toast.success('Reading test updated successfully')
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}
export function useReadingSectionByJlptLevelPrefetch(JlptLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5') {
	return useQuery({
		queryKey: ['reading-sections-by-jlpt', JlptLevel],
		queryFn: async (): Promise<ReadingSectionWithCount[]> => {
			const res = await fetch(`/api/readings/get-reading-sections/${JlptLevel}`)
			const responseData = await res.json()
			if (!responseData.success) {
				throw new Error(responseData.message || 'Failed to fetch reading sections by JLPT level')
			}
			return responseData.data
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
		enabled: !!JlptLevel && ['N1', 'N2', 'N3', 'N4', 'N5'].includes(JlptLevel),
	})
}
export function useReadingSectionByJlptLevel(JlptLevel: string) {
	return useQuery({
		queryKey: ['reading-sections-by-jlpt', JlptLevel],
		queryFn: async (): Promise<ReadingSectionWithCount[]> => {
			const res = await fetch(`/api/readings/get-reading-sections/${JlptLevel}`)
			const responseData = await res.json()
			if (!responseData.success) {
				throw new Error(responseData.message || 'Failed to fetch reading sections by JLPT level')
			}
			return responseData.data
		},
		enabled: !!JlptLevel && ['N1', 'N2', 'N3', 'N4', 'N5'].includes(JlptLevel),
	})
}

export function useCreateReadingSectionWithReadingTests() {
	return useMutation({
		mutationKey: ['create-reading-section'],
		mutationFn: async (data: CreateReadingSectionWithReadingTest) => {
			const res = await fetch(`/api/readings/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const responseData = await res.json()

			if (!responseData.success) {
				throw new Error(responseData?.message || 'Failed to create reading section')
			}

			return responseData
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['readingSections'] })
			queryClient.invalidateQueries({ queryKey: ['reading-sections-by-jlpt'] })
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}
export function useReadingProgress(userId: string) {
	return useQuery({
		queryKey: ['reading-progress', userId],
		queryFn: async (): Promise<{ data: ReadingProgress[] }> => {
			const res = await fetch(`/api/readings/progress/${userId}`)
			const responseData = await res.json()
			console.log('responseData from hook', responseData)

			if (!responseData.success) {
				throw new Error(responseData.message || 'Failed to fetch reading progress!')
			}
			return responseData
		},
		select: data => data.data,
		enabled: !!userId,
	})
}
export function useCreateReadingPregress() {
	return useMutation({
		mutationKey: ['create-reading-progress'],
		mutationFn: async (data: CreateReadingProgress) => {
			const res = await fetch(`/api/readings/progress`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const responseData = await res.json()

			if (!responseData.success) {
				throw new Error(responseData?.message || 'Failed to create reading progress')
			}

			return responseData
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['reading-progress'] })
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}

export function useAddReadingToSection() {
	return useMutation({
		mutationKey: ['add-reading-to-section'],
		mutationFn: async ({
			sectionId,
			readingData,
		}: {
			sectionId: string
			readingData: {
				text: string
				difficulty: 'EASY' | 'MEDIUM' | 'HARD'
				mainQuestion: string
				authorId: string
				questions: {
					question: string
					options: string[]
					correctAnswer: number
				}[]
			}
		}) => {
			const res = await fetch(`/api/readings/add-reading/${sectionId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(readingData),
			})
			const responseData = await res.json()

			if (!responseData.success) {
				throw new Error(responseData?.message || 'Failed to add reading to section')
			}

			return responseData
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['readingSections'] })
			queryClient.invalidateQueries({ queryKey: ['reading-sections-by-jlpt'] })
			queryClient.invalidateQueries({ queryKey: ['readingTests'] })
			toast.success('Reading added to section successfully')
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}
