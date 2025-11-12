'use client'
import { AuthProvider } from '@/contexts/auth-context'
import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</AuthProvider>
	)
}
