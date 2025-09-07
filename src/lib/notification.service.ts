import { NotFoundError } from '@/types/errors'
import { getSearchParams } from './get-search-params'
import { Notification, prisma, PrismaClient } from './prisma'

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

	async markAllAsRead(userId: string): Promise<{ count: number }> {
		const result = await this.prisma.notification.updateMany({
			where: {
				userId: userId,
				isRead: false,
			},
			data: {
				isRead: true,
			},
		})

		return result
	}

	async getUnreadCount(userId: string): Promise<number> {
		const count = await this.prisma.notification.count({
			where: {
				userId: userId,
				isRead: false,
			},
		})

		return count
	}
}

const notificationService = new NotificationService(prisma)
type notificationServiceType = typeof notificationService

export { notificationService, type notificationServiceType }
