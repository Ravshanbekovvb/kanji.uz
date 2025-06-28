import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

interface CreateUserInput {
	email: string
	name: string
	password: string
}

export function useCreateUser() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['users', 'create'],
		mutationFn: async (data: CreateUserInput) => {
			const res = await fetch(`/api/users/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
			if (!res.ok) throw new Error('Failed to create user')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Users'] })
		},
		onError: error => {
			console.error('User creation failed:', error)
		},
	})
}
