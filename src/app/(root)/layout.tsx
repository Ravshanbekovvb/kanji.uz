'use client'
import { Header, MobileNav, Sidebar } from '@/components/shared'
import { AuthProvider } from '@/contexts/auth-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
export default function Home({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<AuthProvider>
			<div className='flex'>
				<QueryClientProvider client={queryClient}>
					{/* Desktop Sidebar */}
					<Sidebar className='max-md:hidden' />

					{/* Mobile Navigation */}
					<MobileNav />

					<main className='flex flex-col min-h-screen w-full'>
						{/* Desktop Header */}
						<Header className='max-md:hidden' />

						{/* Content with mobile padding */}
						<div className='flex-1 overflow-y-auto'>{children}</div>
					</main>
				</QueryClientProvider>
			</div>
		</AuthProvider>
	)
}
