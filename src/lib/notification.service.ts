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
		}

		if (isPrivate && isPublic) {
			where = {}
		}

		const existingNotifications = await this.prisma.notification.findMany({
			where,
		})

		return existingNotifications
	}

	async create() {}

	async delete() {}

	async update() {}
}

const notificationService = new NotificationService(prisma)
type notificationServiceType = typeof notificationService

export { notificationService, type notificationServiceType }
