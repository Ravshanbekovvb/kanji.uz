import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useSignupRequests(isEnabled: boolean) {
	const { isPending, error, data } = useQuery({
		queryKey: ['SignupRequests'],
		queryFn: () => fetch('/api/signup-requests').then(res => res.json()),
		select: data => data.data,
		enabled: isEnabled,
	})
	return { data, isPending, error }
}
export function useSignupRequestCounts() {
	const { isPending, error, data } = useQuery({
		queryKey: ['SignupRequestCounts'],
		queryFn: () => fetch('/api/signup-requests/counts').then(res => res.json()),
		select: data => data.data,
	})
	return { data, isPending, error }
}

export function useDeleteSignupRequest() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete SignupRequest'],
		mutationFn: async (id: string) => {
			const res = await fetch(`/api/signup-requests/${id}`, { method: 'DELETE' })

			if (!res.ok) throw new Error('Failed to delete signup request')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['SignupRequests'] })
		},
		onError: (e: any) => {
			toast.error(e.message)
		},
	})
}

export function useCreateSignupRequest() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['SignupRequest', 'create'],
		mutationFn: async (data: { note: string; name: string; email: string }) => {
			const res = await fetch(`/api/signup-requests`, {
				method: 'POST',
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
			queryClient.invalidateQueries({ queryKey: ['SignupRequests'] })
		},
		onError: (error: any) => {
			toast.error(error.message)
		},
	})
}
export function useUpdateStatusSignupRequest() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['SignupRequests', 'update'],
		mutationFn: async ({ id, status }: { status: 'APPROVED' | 'REJECTED'; id: string }) => {
			const res = await fetch(`/api/signup-requests/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status }),
			})
			const responseData = await res.json()

			if (!res.ok) {
				throw new Error(responseData?.message || 'Nomaʼlum xatolik')
			}

			return responseData
		},
		onSuccess: (_data, variables) => {
			// Invalidate the specific user query
			queryClient.invalidateQueries({ queryKey: ['SignupRequests', variables.id] })
			// Invalidate the users list query
			queryClient.invalidateQueries({ queryKey: ['SignupRequests'] })
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}
// export function useFindUserById(id: ParamValue) {
// 	const { isPending, error, data } = useQuery({
// 		queryKey: ['users', 'user', id],
// 		queryFn: async () => {
// 			const res = await fetch(`/api/users/find/${id}`, {
// 				method: 'GET',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 			})
// 			const responseData = await res.json()

// 			if (!res.ok) {
// 				throw new Error(responseData.message)
// 			}

// 			return responseData
// 		},
// 		select: data => data.data,
// 		enabled: !!id,
// 	})

// 	return { data, isPending, error }
// }
