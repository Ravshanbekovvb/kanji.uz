import { useEffect } from 'react'

const Hero = ({ t }) => {
	useEffect(() => {
		const clouds = document.querySelectorAll('.cloud')

		const setRandomTop = cloud => {
			const min = 200
			const max = 500
			const randomTop = Math.random() * (max - min) + min
			cloud.style.top = randomTop + 'px'
		}

		clouds.forEach(cloud => {
			setRandomTop(cloud)

			const handleAnimationIteration = () => {
				setRandomTop(cloud)
			}

			cloud.addEventListener('animationiteration', handleAnimationIteration)

			return () => {
				cloud.removeEventListener('animationiteration', handleAnimationIteration)
			}
		})
	}, [])

	return (
		<header
			className='hero'
			style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/home.png)` }}
		>
			<div className='clouds'>
				<img src='/images/cloud-computing.png' className='cloud cloud1' alt='Cloud' />
				<img src='/images/cloud (1).png' className='cloud cloud2' alt='Cloud' />
				<img src='/images/cloudy.png' className='cloud cloud3' alt='Cloud' />
			</div>

			<div className='home'>
				<h1 dangerouslySetInnerHTML={{ __html: t('home-title') }} className='font-bold' />

				<div className='btnhome font-semibold'>
					<a href='#footer'>{t('home-more')}</a>
					<a href='#'>{t('home-contact')}</a>
				</div>
			</div>
		</header>
	)
}

export default Hero
