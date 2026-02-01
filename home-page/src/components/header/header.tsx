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
			<nav className='hidden sm:block'>
				<ul className='flex items-center justify-center gap-10 font-semibold'>
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
			<div className='hidden items-center gap-5 sm:flex'>
				<a href='https://dashboard.kanji.uz/login' target='_blank'>
					<Button variant='secondary' className='cursor-pointer' size='sm'>
						Register
					</Button>
				</a>
			</div>
			{/* mobile menu */}
			<Sheet>
				<SheetTrigger asChild>
					<Menu className='size-8 text-white sm:hidden' />
				</SheetTrigger>
				<SheetContent className='w-full'>
					<SheetHeader>
						<SheetTitle>Edit Profile</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when you're done.
						</SheetDescription>
					</SheetHeader>
					<div className='grid gap-4 py-4'>{/* Form content here */}</div>
					<SheetFooter>
						<SheetClose>
							<Button>Save changes</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</header>
	)
}
