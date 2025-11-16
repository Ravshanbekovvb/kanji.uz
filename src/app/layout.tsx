import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
const roboto = Roboto_Mono({
	weight: ['200', '300', '400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
	title: 'Kanji.uz - Japanese Learning Platform',
	description:
		'Learn Japanese Kanji, Hiragana, and Katakana with interactive reading tests, vocabulary building, and JLPT preparation tools.',
	keywords: ['Japanese', 'Kanji', 'JLPT', 'Learning', 'Reading', 'Vocabulary', 'Education'],
	authors: [{ name: 'Kanji.uz Team' }],
	creator: 'Kanji.uz',
	publisher: 'Kanji.uz',
	openGraph: {
		title: 'Kanji.uz - Japanese Learning Platform',
		description:
			'Master Japanese with our comprehensive learning platform featuring reading tests, vocabulary building, and JLPT preparation.',
		url: 'https://kanji.uz',
		siteName: 'Kanji.uz',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Kanji.uz - Japanese Learning Platform',
		description: 'Learn Japanese Kanji, Hiragana, and Katakana with interactive tools.',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<meta name='google-site-verification' content='eoTkLD9BkXvY8XVLcSG1bzBr8wMwK9Z84TE4tJactUY' />
			<head>
				<meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
			</head>
			<body className={`${roboto.className} antialiased min-h-screen`} suppressHydrationWarning>
				{children}
				<Toaster position='top-right' richColors />
				<SpeedInsights />
			</body>
		</html>
	)
}
