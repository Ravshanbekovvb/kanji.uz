import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const locales = ['uz', 'ja', 'ru', 'us'] as const
export default getRequestConfig(async () => {
	const cookieStore = await cookies()
	console.log('cookie:', cookieStore.get('locale')?.value)

	const cookieLocale = cookieStore.get('locale')?.value

	// Validate if the locale from cookie is supported
	const locale =
		cookieLocale && locales.includes(cookieLocale as (typeof locales)[number]) ? cookieLocale : 'ru'

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
	}
})
