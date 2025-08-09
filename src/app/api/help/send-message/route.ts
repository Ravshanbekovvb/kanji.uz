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
*from TSUKUROU*

🆘 *Help Request*

👤 *Name:* ${name}
${phone ? `📞 *Phone:* ${phone}` : ''}
💬 *Message:*
${message}

📅 *Date:* ${new Date().toLocaleString()}
		`.trim()

		const chatIds = [TELEGRAM_CHAT_ID_1, TELEGRAM_CHAT_ID_2]
		const responses = await Promise.all(
			chatIds.map(chatId =>
				fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						chat_id: chatId,
						text: telegramMessage,
						parse_mode: 'Markdown',
					}),
				})
			)
		)

		const allOk = responses.every(res => res.ok)
		if (!allOk) {
			throw new Error('Failed to send message to all Telegram chats')
		}

		return NextResponse.json({
			success: true,
			message: 'Your help request has been sent successfully!',
		})
	} catch (error) {
		console.error('Error sending help message:', error)
		return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 })
	}
}
