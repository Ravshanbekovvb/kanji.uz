import { Header } from '../../components/header/header'
import { Hero } from '../../components/hero/hero'
import { Reviews } from '../../components/reviews/reviews'

export const HomeLayout = () => {
	return (
		<div
			className='h-screen overflow-x-hidden overflow-y-auto'
			onScroll={e => {
				if (e.currentTarget.scrollTop > 84) {
					document
						.querySelector('header')
						?.classList.add(
							'bg-white/20',
							'backdrop-blur-md',
							'shadow-md',
							'duration-500',
							'ease-in-out'
						)
				} else {
					document
						.querySelector('header')
						?.classList.remove('bg-white/20', 'backdrop-blur-md', 'shadow-md')
				}
			}}
		>
			<Header />
			<Hero />
			<Reviews />
		</div>
	)
}
