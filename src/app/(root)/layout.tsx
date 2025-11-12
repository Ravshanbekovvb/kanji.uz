'use client'
import { Header, MobileNav, Sidebar } from '@/components/shared'
import { AuthProvider } from '@/contexts/auth-context'
import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

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
						<div className='flex-1 overflow-y-auto sm:shadow-[inset_0px_0px_10px_rgba(0,0,0,0.4)]'>
							{children}
						</div>
					</main>
				</QueryClientProvider>
			</div>
		</AuthProvider>
	)
}
