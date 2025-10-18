import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { name, phone, message } = await request.json()

		// Validate required fields
		if (!name || !message) {
			return NextResponse.json(
				{ success: false, error: 'Name and message are required' },
				{ status: 400 }
			)
		}

		// Telegram Bot configuration
		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
		const TELEGRAM_CHAT_ID_1 = process.env.TELEGRAM_CHAT_ID_1
		const TELEGRAM_CHAT_ID_2 = process.env.TELEGRAM_CHAT_ID_2

		if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID_1 || !TELEGRAM_CHAT_ID_2) {
			return NextResponse.json(
				{ success: false, error: 'Telegram configuration missing' },
				{ status: 500 }
			)
		}

		// Format message for Telegram
		const telegramMessage = `
 *🏛 TSUKUROU*
 
🆘 *Help Request*

👤 *Name:* ${name}
${phone ? `📞 *Phone:* ${phone}` : ''}
💬 *Message:*
${message}

📅 *Date:* ${new Date().toLocaleString()}
		`.trim()

		const chatIds = [TELEGRAM_CHAT_ID_1, TELEGRAM_CHAT_ID_2]

		const results = await Promise.allSettled(
			chatIds.map(async (chatId, index) => {
				const response = await fetch(
					`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							chat_id: chatId,
							text: telegramMessage,
							parse_mode: 'Markdown',
						}),
					}
				)

				if (!response.ok) {
					const errorText = await response.text()
					console.error(`Failed to send to chat ${index + 1}:`, response.status, errorText)
					throw new Error(`Chat ${index + 1} (${chatId}): ${response.status} - ${errorText}`)
				}

				return { chatId, success: true }
			})
		)

		const successful = results.filter(result => result.status === 'fulfilled')
		const failed = results.filter(result => result.status === 'rejected')

		// If at least one message was sent successfully, consider it a success
		if (successful.length > 0) {
			return NextResponse.json({
				success: true,
				message: `Your help request has been sent successfully to ${successful.length} chat(s)!`,
				details: {
					successful: successful.length,
					failed: failed.length,
				},
			})
		}
		// If no messages were sent successfully
		throw new Error('Failed to send message to any Telegram chat')
	} catch (error) {
		console.error('Error sending help message:', error)
		return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
	}
}
