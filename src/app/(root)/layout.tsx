import { Header, MobileMenu, Sidebar } from '@/components/shared'

export default function Home({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className='flex'>
			{/* <Toaster position='top-right' richColors /> */}
			<Sidebar className='max-md:hidden' />
			<MobileMenu className='max-md:block hidden' />
			<main className='flex flex-col h-screen w-full overflow-y-auto'>
				<Header />

				<div className='p-10'>{children}</div>
			</main>
		</div>
	)
}
