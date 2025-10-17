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
		queryKey: ['SignupRequests'],
		queryFn: () => fetch('/api/signup-requests/counts').then(res => res.json()),
		select: data => data.data,
	})
	return { data, isPending, error }
}

// export function useDeleteUser() {
// 	const queryClient = useQueryClient()

// 	return useMutation({
// 		mutationKey: ['delete user'],
// 		mutationFn: async (email: string) => {
// 			const res = await fetch(`/api/users/delete/${email}`, { method: 'DELETE' })

// 			if (!res.ok) throw new Error('Failed to delete user')
// 			return res.json()
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ['Users'] })
// 		},
// 		onError: (e: any) => {
// 			toast.error(e.message)
// 		},
// 	})
// }

// export function useCreateUser() {
// 	const queryClient = useQueryClient()

// 	return useMutation({
// 		mutationKey: ['users', 'create'],
// 		mutationFn: async (data: CreateUserWithRepeatPasswordRequestType) => {
// 			const res = await fetch(`/api/auth/register`, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(data),
// 			})
// 			const responseData = await res.json()

// 			if (!res.ok) {
// 				throw new Error(responseData.message)
// 			}

// 			return responseData
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ['Users'] })
// 		},
// 		onError: (error: any) => {
// 			toast.error(error.message)
// 		},
// 	})
// }
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
