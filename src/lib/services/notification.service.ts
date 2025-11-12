import { NotFoundError } from '@/types/errors'
import { Notification } from '../../../prisma/__generated__'
import { getSearchParams } from '../func/get-search-params'
import { prisma, PrismaClient } from '../prisma'

class NotificationService {
	constructor(private readonly prisma: PrismaClient) {}

	async findByUserId(userId: string): Promise<Notification[]> {
		const existingNotification = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				notification: true,
			},
		})

		if (!existingNotification)
			throw new NotFoundError(`This notification not found with this user ID: #${userId}`)

		return existingNotification.notification
	}

	async findAll(url: URL): Promise<Notification[]> {
		const { isPrivate, isPublic } = getSearchParams(url)

		let where = {}
		let include = {}
		if (isPublic && !isPrivate) {
			where = {
				user: null,
			}
			include = {
				readByUsers: true,
			}
		}

		if (isPrivate && !isPublic) {
			where = {
				user: {
					isNot: null,
				},
			}
			include = {
				user: {
					select: {
						userName: true,
					},
				},
			}
		}

		if (isPrivate && isPublic) {
			where = {}
			include = {
				user: {
					select: {
						userName: true,
					},
				},
				readByUsers: true,
			}
		}

		const existingNotifications = await this.prisma.notification.findMany({
			where,
			include,
		})

		return existingNotifications
	}

	async create(payload: Pick<Notification, 'message' | 'userId'>): Promise<Notification> {
		const { message, userId } = payload

		const createdNotification = await this.prisma.notification.create({
			data: {
				message,
				userId,
			},
		})

		return createdNotification
	}

	async delete(notificationId: string): Promise<Notification> {
		const existingNotification = await this.prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		})

		if (!existingNotification)
			throw new NotFoundError(`Notification with this ID not found: #${notificationId}`)

		const deletedNotification = await this.prisma.notification.delete({
			where: {
				id: existingNotification.id,
			},
		})

		return deletedNotification
	}

	async update(payload: Pick<Notification, 'message' | 'userId'>, notificationId: string) {
		const existingNotification = await this.prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		})

		if (!existingNotification)
			throw new NotFoundError(`Notification with this ID not found: #${notificationId}`)

		const updatedNotification = await this.prisma.notification.update({
			where: {
				id: notificationId,
			},
			data: {
				message: payload.message,
				userId: payload.userId,
			},
		})

		return updatedNotification
	}

	async markAsRead(notificationId: string): Promise<Notification> {
		const existingNotification = await this.prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		})

		if (!existingNotification)
			throw new NotFoundError(`Notification with this ID not found: #${notificationId}`)

		const updatedNotification = await this.prisma.notification.update({
			where: {
				id: notificationId,
			},
			data: {
				isRead: true,
			},
		})

		return updatedNotification
	}

	async markPublicNotificationAsReadByUser(notificationId: string, userId: string): Promise<void> {
		// Check if the notification exists and is public
		const notification = await this.prisma.notification.findUnique({
			where: {
				id: notificationId,
			},
		})

		if (!notification)
			throw new NotFoundError(`Notification with this ID not found: #${notificationId}`)

		if (notification.userId !== null) {
			throw new Error('This method is only for public notifications')
		}

		// Create or update the read status
		await this.prisma.notificationReadStatus.upsert({
			where: {
				notificationId_userId: {
					notificationId: notificationId,
					userId: userId,
				},
			},
			update: {
				readAt: new Date(),
			},
			create: {
				notificationId: notificationId,
				userId: userId,
			},
		})
	}

	async markAllAsRead(userId: string): Promise<{ count: number }> {
		// Mark all personal notifications as read
		const personalResult = await this.prisma.notification.updateMany({
			where: {
				userId: userId,
				isRead: false,
			},
			data: {
				isRead: true,
			},
		})

		// Get all unread public notifications
		const publicNotifications = await this.prisma.notification.findMany({
			where: {
				userId: null,
				isRead: false,
				NOT: {
					readByUsers: {
						some: {
							userId: userId,
						},
					},
				},
			},
		})

		// Mark all public notifications as read for this user
		for (const notification of publicNotifications) {
			await this.prisma.notificationReadStatus.upsert({
				where: {
					notificationId_userId: {
						notificationId: notification.id,
						userId: userId,
					},
				},
				update: {
					readAt: new Date(),
				},
				create: {
					notificationId: notification.id,
					userId: userId,
				},
			})
		}

		return { count: personalResult.count + publicNotifications.length }
	}

	async getUnreadCount(userId: string): Promise<number> {
		// Count personal unread notifications
		const personalCount = await this.prisma.notification.count({
			where: {
				userId: userId,
				isRead: false,
			},
		})

		// Count public notifications that user hasn't marked as read
		const publicCount = await this.prisma.notification.count({
			where: {
				userId: null, // Public notifications
				isRead: false,
				NOT: {
					readByUsers: {
						some: {
							userId: userId,
						},
					},
				},
			},
		})

		return personalCount + publicCount
	}
}

const notificationService = new NotificationService(prisma)
type notificationServiceType = typeof notificationService

export { notificationService, type notificationServiceType }
