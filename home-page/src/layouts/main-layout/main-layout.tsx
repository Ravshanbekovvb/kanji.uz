import { Header } from '../../components/header/header'
import { Hero } from '../../components/hero/hero'
import { Reviews } from '../../components/reviews/reviews'

export const HomeLayout = () => {
	return (
		<div className=''>
			<Header />
			<Hero />
			<Reviews />
		</div>
	)
}
