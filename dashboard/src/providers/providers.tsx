import { AuthProvider } from '@/contexts/auth-context'
import { QueryProvider } from './query-provider'
import { NextIntlClientProvider } from 'next-intl'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<NextIntlClientProvider>
				<AuthProvider>{children}</AuthProvider>
			</NextIntlClientProvider>
		</QueryProvider>
	)
}
