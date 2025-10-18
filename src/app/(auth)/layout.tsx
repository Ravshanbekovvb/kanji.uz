'use client'
import { AuthProvider } from '@/contexts/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<AuthProvider>
			<QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
		</AuthProvider>
	)
}
