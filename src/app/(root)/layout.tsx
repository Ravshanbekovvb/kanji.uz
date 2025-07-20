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

					<main className='flex flex-col h-screen w-full overflow-y-auto'>
						{/* Desktop Header */}
						<Header className='max-md:hidden' />

						{/* Content with mobile padding */}
						<div className='p-4 md:p-10 pb-20 md:pb-10 pt-20 md:pt-4'>{children}</div>
					</main>
				</QueryClientProvider>
			</div>
		</AuthProvider>
	)
}
