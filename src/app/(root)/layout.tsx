'use client'
import { Header, MobileMenu, Sidebar } from '@/components/shared'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
export default function Home({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='flex'>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				{/* <Toaster position='top-right' richColors /> */}
				<Sidebar className='max-md:hidden' />
				<MobileMenu className='max-md:block hidden' />
				<main className='flex flex-col h-screen w-full overflow-y-auto'>
					<Header />

					<div className='p-10'>{children}</div>
				</main>
			</QueryClientProvider>
		</div>
	)
}
