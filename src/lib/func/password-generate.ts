import crypto from 'crypto'

type Policy = 'daily' | 'weekly' | 'monthly' | 'fixed'

/**
 * Email + name asosida vaqtga bog'langan (rotating) deterministic password hosil qiluvchi funksiya.
 * - policy: 'daily' | 'weekly' | 'monthly' | 'fixed'
 *   - daily: har kun yangi parol
 *   - weekly: har hafta yangi parol
 *   - monthly: har oy yangi parol
 *   - fixed: har doim bir xil parol (faqat email+name)
 *
 * @param email user email
 * @param name  user name
 * @param length desired password length (default 12, minimal 8)
 * @param secret server secret (process.env.PASSWORD_SECRET kabi)
 * @param policy rotation policy
 */
export function generateRotatingPassword(
	email: string,
	name: string,
	length = 12,
	secret = 'local_dev_secret',
	policy: Policy = 'daily'
): string {
	if (!email || !name) throw new Error('email va name kerak')
	if (length < 8) length = 8

	// belgilar to'plamlari
	const lowers = 'abcdefghijklmnopqrstuvwxyz'
	const uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	const digits = '0123456789'
	const symbols = '!@#$%^&*()-_=+[]{}<>?'
	const all = lowers + uppers + digits + symbols

	// vaqtga bog'langan seed yaratish (policy asosida)
	const now = new Date()
	let timeSeed: string
	if (policy === 'daily') {
		// YYYYMMDD
		timeSeed = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}`
	} else if (policy === 'weekly') {
		// YYYY-WW (ISO week-ish simplified)
		const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1))
		const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) + 1
		const week = Math.ceil((dayOfYear + start.getUTCDay()) / 7)
		timeSeed = `${now.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
	} else if (policy === 'monthly') {
		timeSeed = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
	} else {
		timeSeed = 'fixed'
	}

	// HMAC orqali deterministik, lekin time-rotating seed
	const seed = `${email.toLowerCase().trim()}|${name.trim()}|${timeSeed}`
	const hmac = crypto.createHmac('sha256', secret).update(seed).digest() // Buffer

	// Kamida bitta har bir turdagi belgi qo'shish
	const out: string[] = []
	out.push(uppers[hmac[0] % uppers.length])
	out.push(lowers[hmac[1] % lowers.length])
	out.push(digits[hmac[2] % digits.length])
	out.push(symbols[hmac[3] % symbols.length])

	// Qolganlarini hmac dan tanlab to'ldirish
	for (let i = 4; i < length; i++) {
		const b = hmac[i % hmac.length]
		out.push(all[b % all.length])
	}

	// Shuffle (Fisher-Yates) using hmac bytes deterministik tarzda
	for (let i = out.length - 1; i > 0; i--) {
		const j = hmac[(i + 4) % hmac.length] % (i + 1)
		const tmp = out[i]
		out[i] = out[j]
		out[j] = tmp
	}

	return out.join('')
}
