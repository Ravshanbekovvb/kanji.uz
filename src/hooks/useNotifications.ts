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

export function useUserCombinedNotifications() {
	return useQuery<NotificationAllApiResponse, Error, Notification[]>({
		queryKey: ['notifications', 'user-combined'],
		queryFn: () => fetch('/api/notifications/user-combined').then(res => res.json()),
		select: data => data.data,
	})
}

export function useMarkAsRead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['notifications', 'mark-as-read'],
		mutationFn: async (notificationId: string) => {
			const res = await fetch('/api/notifications/mark-as-read', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ notificationId }),
			})

			if (!res.ok) throw new Error('Failed to mark notification as read')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
			queryClient.invalidateQueries({ queryKey: ['unread-count'] })
			queryClient.invalidateQueries({ queryKey: ['unread-count-combined'] })
		},
		onError: (error: any) => {
			toast.error(error.message)
		},
	})
}

export function useMarkPublicAsRead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['notifications', 'mark-public-as-read'],
		mutationFn: async (notificationId: string) => {
			const res = await fetch('/api/notifications/mark-public-as-read', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ notificationId }),
			})

			if (!res.ok) throw new Error('Failed to mark public notification as read')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
			queryClient.invalidateQueries({ queryKey: ['unread-count'] })
			queryClient.invalidateQueries({ queryKey: ['unread-count-combined'] })
		},
		onError: (error: any) => {
			toast.error(error.message)
		},
	})
}

export function useMarkAllAsRead() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['notifications', 'mark-all-as-read'],
		mutationFn: async (userId: string) => {
			const res = await fetch('/api/notifications/mark-all-as-read', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userId }),
			})

			if (!res.ok) throw new Error('Failed to mark all notifications as read')
			return res.json()
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notifications'] })
			queryClient.invalidateQueries({ queryKey: ['unread-count'] })
			queryClient.invalidateQueries({ queryKey: ['unread-count-combined'] })
			toast.success('All notifications marked as read')
		},
		onError: (error: any) => {
			toast.error(error.message)
		},
	})
}

export function useUnreadCount(userId: string) {
	return useQuery<{ data: { count: number } }, Error, number>({
		queryKey: ['unread-count', userId],
		queryFn: () =>
			fetch(`/api/notifications/unread-count?userId=${userId}`).then(res => res.json()),
		select: data => data.data.count,
		enabled: !!userId,
		refetchInterval: 30000, // 30 soniyada bir marta refresh
	})
}

export function useCombinedUnreadCount(userId: string) {
	return useQuery<{ data: Notification[] }, Error, number>({
		queryKey: ['unread-count-combined', userId],
		queryFn: () => fetch('/api/notifications/user-combined').then(res => res.json()),
		select: data => {
			if (!data?.data || !Array.isArray(data.data)) return 0

			// Count personal unread notifications
			const personalUnread = data.data.filter(item => !item.isRead && item.userId === userId).length

			// Count public unread notifications (those not read by this user)
			const publicUnread = data.data.filter(item => {
				if (item.userId !== null) return false // Skip personal notifications

				// Check if user has read this public notification
				const readByUser = (item as any).readByUsers?.some(
					(readStatus: any) => readStatus.userId === userId
				)
				return !item.isRead && !readByUser
			}).length

			return personalUnread + publicUnread
		},
		enabled: !!userId,
		refetchInterval: 30000, // 30 soniyada bir marta refresh
	})
}
