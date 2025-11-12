import { queryClient } from '@/lib/query-client'
import { CreateUserRequestType, CreateUserWithRepeatPasswordRequestType } from '@/types/types'
import { useMutation, useQuery } from '@tanstack/react-query'
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
	return useMutation({
		mutationKey: ['delete user'],
		mutationFn: async (id: string) => {
			const res = await fetch(`/api/users/delete/${id}`, { method: 'DELETE' })
			if (!res.ok) throw new Error('Failed to delete user')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Users'] })
			toast.success('User deleted succesfully')
		},
		onError: (e: any) => {
			toast.error(e.message)
		},
	})
}

export function useCreateUser() {
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
export function useEditUser(id: string) {
	return useMutation({
		mutationKey: ['users', 'edit'],
		mutationFn: async (data: CreateUserRequestType) => {
			const res = await fetch(`/api/users/update/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			const responseData = await res.json()

			if (!res.ok) {
				throw new Error(responseData?.message || 'Nomaʼlum xatolik')
			}

			return responseData
		},
		onSuccess: () => {
			// Invalidate the specific user query
			queryClient.invalidateQueries({ queryKey: ['users', 'user', id] })
			// Invalidate the users list query
			queryClient.invalidateQueries({ queryKey: ['Users'] })
		},
		onError: (error: Error) => {
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
