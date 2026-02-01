import { Menu } from 'lucide-react'
import { Button } from '../lightswind/button'
import { ToggleTheme } from '../lightswind/theme-toggle'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../lightswind/sheet'
export const Header = () => {
	return (
		<header className='flex items-center justify-between bg-white/20 container mx-auto p-3 fixed top-0 z-50'>
			<a href='/' className='flex items-center gap-5 '>
				<img src='/logo.png' alt='Kanji.uz Logo' className='max-w-15' />
				<b className='hidden sm:block'> Kanji.uz</b>
			</a>
			<nav className='hidden sm:block'>
				<ul className='flex items-center justify-center gap-10'>
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
			<div className='items-center gap-5 sm:flex hidden'>
				<ToggleTheme className='cursor-pointer' />
				<a href='https://dashboard.kanji.uz/login' target='_blank'>
					<Button variant='secondary' className='cursor-pointer'>
						Register
					</Button>
				</a>
			</div>
			{/* mobile menu */}
			<Sheet>
				<SheetTrigger asChild>
					<Menu className='text-white size-8 sm:hidden' />
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
