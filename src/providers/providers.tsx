'use client'

import { AuthProvider } from '@/contexts/auth-context'
import { QueryProvider } from './query-provider'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<AuthProvider>{children}</AuthProvider>
		</QueryProvider>
	)
}