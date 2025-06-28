import { CreateUserRequestType, CreateUserWithRepeatPasswordRequestType } from '@/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useUsers(isEnabled: boolean) {
	const { isPending, error, data } = useQuery({
		queryKey: ['Users'],
		queryFn: () => fetch('/api/users/find').then(res => res.json()),
		select: data => data.data,
		enabled: isEnabled,
	})
	return { data, isPending, error }
}

export function useDeleteUser() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete user'],
		mutationFn: async (email: string) => {
			const res = await fetch(`/api/users/delete/${email}`, { method: 'DELETE' })
			if (!res.ok) throw new Error('Failed to delete user')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Users'] })
		},
	})
}

export function useCreateUser() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['users', 'create'],
		mutationFn: async (data: CreateUserWithRepeatPasswordRequestType) => {
			const res = await fetch(`/api/auth/register`, {
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
			queryClient.invalidateQueries({ queryKey: ['Users'] })
		},
		onError: (error: any) => {
			toast.error(error.message)
		},
	})
}
export function useEditUser(email: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['users', 'edit'],
		mutationFn: async (data: CreateUserRequestType) => {
			const res = await fetch(`/api/users/update/${email}`, {
				method: 'PATCH',
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
			queryClient.invalidateQueries({ queryKey: ['Users'] })
		},
		onError: (error: any) => {
			toast.error(error.message)
		},
	})
}
