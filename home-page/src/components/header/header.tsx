import { Menu } from 'lucide-react'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '../../components/lightswind/sheet'
import { Button } from '../lightswind/button'

export const Header = () => {
	return (
		<header className='fixed z-5 flex w-full items-center justify-between px-5 py-3'>
			<a href='/' className='flex items-center gap-5'>
				<img src='/logo.png' alt='Kanji.uz Logo' className='max-w-15' />
				<b className='hidden text-3xl font-bold sm:block'>Kanji.uz</b>
			</a>
			<nav className='hidden md:block'>
				<ul className='flex items-center justify-center gap-10 text-xl font-bold'>
					<li>
						<a href='#'>Home</a>
					</li>
					<li>
						<a href='#'>About Us</a>
					</li>
					<li>
						<a href='#'>Contacts</a>
					</li>
					<li>
						<a href='#'>Blogs</a>
					</li>
				</ul>
			</nav>
			<div className='hidden items-center gap-5 md:flex'>
				<a href='https://dashboard.kanji.uz/login' target='_blank'>
					<Button variant='secondary' className='cursor-pointer' size='sm'>
						Register
					</Button>
				</a>
			</div>
			{/* mobile menu */}
			<Sheet>
				<SheetTrigger asChild>
					<Menu className='size-8 stroke-2 text-white md:hidden' />
				</SheetTrigger>
				<SheetContent className='w-full bg-blue-400 text-white'>
					<SheetHeader className='mb-8'>
						<div className='flex items-center gap-3'>
							<img src='/logo.png' alt='Kanji.uz Logo' className='max-w-12' />
							<SheetTitle className='text-3xl font-extrabold text-white'>
								Kanji.uz
							</SheetTitle>
						</div>
						<SheetDescription className='text-left text-lg font-semibold text-white/80'>
							Yapon tilini o'rganish platformasi
						</SheetDescription>
					</SheetHeader>

					<nav className='space-y-2'>
						<ul className='space-y-2'>
							<li>
								<SheetClose>
									<a
										href='#'
										className='block rounded-lg border border-blue-300 px-5 py-4 text-xl font-bold transition-all hover:bg-white hover:text-blue-500'
									>
										Home
									</a>
								</SheetClose>
							</li>
							<li>
								<SheetClose>
									<a
										href='#'
										className='block rounded-lg border border-blue-300 px-5 py-4 text-xl font-bold transition-all hover:bg-white hover:text-blue-500'
									>
										About Us
									</a>
								</SheetClose>
							</li>
							<li>
								<SheetClose>
									<a
										href='#'
										className='block rounded-lg border border-blue-300 px-5 py-4 text-xl font-bold transition-all hover:bg-white hover:text-blue-500'
									>
										Contacts
									</a>
								</SheetClose>
							</li>
							<li>
								<SheetClose>
									<a
										href='#'
										className='block rounded-lg border border-blue-300 px-5 py-4 text-xl font-bold transition-all hover:bg-white hover:text-blue-500'
									>
										Blogs
									</a>
								</SheetClose>
							</li>
						</ul>
					</nav>

					<SheetFooter className='mt-8'>
						<SheetClose>
							<a
								href='https://dashboard.kanji.uz/login'
								target='_blank'
								className='w-full'
							>
								<Button className='w-full text-lg font-bold'>Register</Button>
							</a>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</header>
	)
}
