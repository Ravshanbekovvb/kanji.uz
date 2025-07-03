import { CreateUserRequestType, CreateUserWithRepeatPasswordRequestType } from '@/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ParamValue } from 'next/dist/server/request/params'
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
			console.log(res)

			if (!res.ok) throw new Error('Failed to delete user')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Users'] })
		},
		onError: (e: any) => {
			toast.error(e.message)
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
export function useFindUserById(id: ParamValue) {
	const { isPending, error, data } = useQuery({
		queryKey: ['users', 'user', id],
		queryFn: async () => {
			const res = await fetch(`/api/users/find/${id}`, {
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
		select: data => data.data,
		enabled: !!id,
	})

	return { data, isPending, error }
}
