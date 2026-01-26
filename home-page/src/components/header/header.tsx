import { Button } from '../lightswind/button'
import { ToggleTheme } from '../lightswind/theme-toggle'
export const Header = () => {
	return (
		<header className='flex items-center justify-between bg-white/20 container mx-auto p-3 fixed top-0 z-50'>
			<a href='/' className='flex items-center gap-5 '>
				<img src='/logo.png' alt='Kanji.uz Logo' className='max-w-15' />
				<b>Kanji.uz</b>
			</a>
			<nav>
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
			<div className='flex items-center gap-5'>
				<ToggleTheme className='cursor-pointer' />
				<a href='https://dashboard.kanji.uz/login' target='_blank'>
					<Button variant='secondary' className='cursor-pointer'>
						Register
					</Button>
				</a>
			</div>
		</header>
	)
}
