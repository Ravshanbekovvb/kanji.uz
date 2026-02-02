import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'

export const Footer = () => {
	return (
		<footer className='relative w-full overflow-hidden bg-[url(/footer-image.png)] bg-cover bg-no-repeat px-5 py-20 text-black md:px-10'>
			<div className='absolute inset-0 h-full w-full' />
			<div className='max-w-8xl relative z-100 mx-auto'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
					{/* About Section */}
					<div className='space-y-5'>
						<div className='flex items-center gap-3'>
							<img src='/logo.png' alt='Kanji.uz Logo' className='max-w-15' />
							<h3 className='text-3xl font-extrabold'>Kanji.uz</h3>
						</div>
						<p className='text-lg leading-relaxed font-semibold'>
							Yapon tilini o'rganish uchun eng yaxshi platforma. JLPT imtihonlariga
							tayyorgarlik ko'ring va kanji dunyosini kashf eting.
						</p>
						<div className='flex gap-3'>
							<a
								href='#'
								className='flex h-12 w-12 items-center justify-center rounded-full border border-blue-300 transition-all hover:bg-white hover:text-blue-500'
							>
								<Facebook className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='flex h-12 w-12 items-center justify-center rounded-full border border-blue-300 transition-all hover:bg-white hover:text-blue-500'
							>
								<Instagram className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='flex h-12 w-12 items-center justify-center rounded-full border border-blue-300 transition-all hover:bg-white hover:text-blue-500'
							>
								<Twitter className='h-5 w-5' />
							</a>
							<a
								href='#'
								className='flex h-12 w-12 items-center justify-center rounded-full border border-blue-300 transition-all hover:bg-white hover:text-blue-500'
							>
								<Youtube className='h-5 w-5' />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className='space-y-5'>
						<h3 className='text-2xl font-extrabold'>Tezkor Havolalar</h3>
						<ul className='space-y-3'>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Bosh sahifa
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Biz haqimizda
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Darsliklar
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									JLPT Testlar
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Blog
								</a>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div className='space-y-5'>
						<h3 className='text-2xl font-extrabold'>Resurslar</h3>
						<ul className='space-y-3'>
							<li>
								<a
									href='https://dashboard.kanji.uz'
									target='_blank'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Dashboard
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Yordam
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									FAQ
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Maxfiylik siyosati
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-lg font-semibold transition-all hover:translate-x-2 hover:text-white'
								>
									Foydalanish shartlari
								</a>
							</li>
						</ul>
					</div>

					{/* Contact & Newsletter */}
					<div className='space-y-5'>
						<h3 className='text-2xl font-extrabold'>Aloqa</h3>
						<div className='space-y-4'>
							<div className='flex items-start gap-3'>
								<MapPin className='mt-1 h-5 w-5 shrink-0' />
								<p className='text-lg font-semibold'>
									Toshkent, O'zbekiston
									<br />
									Amir Temur ko'chasi
								</p>
							</div>
							<div className='flex items-center gap-3'>
								<Phone className='h-5 w-5 shrink-0' />
								<a
									href='tel:+998901234567'
									className='text-lg font-semibold hover:text-white'
								>
									+998 (90) 123-45-67
								</a>
							</div>
							<div className='flex items-center gap-3'>
								<Mail className='h-5 w-5 shrink-0' />
								<a
									href='mailto:info@kanji.uz'
									className='text-lg font-semibold hover:text-white'
								>
									info@kanji.uz
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-15 border-t border-black pt-8'>
					<div className='flex flex-col items-center justify-between gap-5 md:flex-row'>
						<p className='text-center text-lg font-semibold'>
							© {new Date().getFullYear()} Kanji.uz. Barcha huquqlar himoyalangan.
						</p>
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className='pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-3xl' />
			<div className='pointer-events-none absolute top-0 right-0 h-60 w-60 rounded-full bg-white/5 blur-3xl' />
		</footer>
	)
}
