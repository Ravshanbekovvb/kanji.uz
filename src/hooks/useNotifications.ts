import { Notification } from '@/lib'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface NotificationAllApiResponse {
	data: Notification[]
	message: string
	success: boolean
}

interface NotificationWithUser extends Notification {
	user?: {
		userName: string
		email: string
		id: string
	} | null
}

interface NotificationPrivateApiResponse {
	data: NotificationWithUser[]
	message: string
	success: boolean
}

export function useNotificationsAll() {
	const { isPending, error, data } = useQuery<NotificationAllApiResponse, Error, Notification[]>({
		queryKey: ['notifications', 'all'],
		queryFn: () => fetch('/api/notifications/find?public=true').then(res => res.json()),
		select: data => data.data,
	})
	return { data: data || [], isPending, error }
}
export function useNotificationsPrivate() {
	const { isPending, error, data } = useQuery<
		NotificationPrivateApiResponse,
		Error,
		NotificationWithUser[]
	>({
		queryKey: ['notifications', 'private'],
		queryFn: () => fetch('/api/notifications/find?private=true').then(res => res.json()),
		select: data => data.data,
	})
	return { data: data || [], isPending, error }
}
export function useCreateNotification() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['users', 'create'],
		mutationFn: async (data: {
			message: FormDataEntryValue
			userId: FormDataEntryValue | null
		}) => {
			const res = await fetch(`/api/notifications/create`, {
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
			toast.success('sended successfully!')
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
		},
		onError: (error: any) => {
			toast.error(error.message)
		},
	})
}

export function useDeleteNotification() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['delete Notification'],
		mutationFn: async (notificationId: string) => {
			const res = await fetch(`/api/notifications/delete/${notificationId}`, {
				method: 'DELETE',
			})

			if (!res.ok) throw new Error('Failed to delete notification')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
		},
		onError: (e: any) => {
			toast.error(e.message)
		},
	})
}

export function useEditNotification() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['notifications', 'edit'],
		mutationFn: async (data: {
			message: FormDataEntryValue
			userId: string | null
			notificationId: string
		}) => {
			const res = await fetch(`/api/notifications/update`, {
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
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
		},
		onError: (error: Error) => {
			toast.error(error.message)
		},
	})
}

export function useNotificationById(userId: string) {
	return useQuery<NotificationAllApiResponse, Error, Notification[]>({
		queryKey: ['notifications', userId],
		queryFn: () => fetch(`/api/notifications/find/${userId}`).then(res => res.json()),
		select: data => data.data,
	})
}
