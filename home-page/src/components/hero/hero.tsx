import { Button } from '../lightswind/button'
import { ScrollReveal } from '../lightswind/scroll-reveal'
import { MorphingText } from '../ui/morphing-text'

export const Hero = () => {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-[url('/hero-image.png')] bg-cover bg-center bg-no-repeat">
			{/* Clouds */}
			<div className='cloud cloud-1' />
			<div className='cloud cloud-2' />
			<div className='cloud cloud-3' />
			<div className='cloud cloud-4' />
			<div className='cloud cloud-5' />
			<div className='cloud cloud-6' />
			<div className='cloud cloud-7' />
			<div className='cloud cloud-8' />
			<div className='cloud cloud-9' />
			<div className='cloud cloud-10' />

			{/* Content */}
			<div className='container mx-auto flex min-h-screen flex-col items-center justify-center px-6 text-center xl:items-start xl:text-left'>
				<MorphingText
					texts={['Japanese.', 'JLPT N5.', 'Vocabulary.', 'JLPT N2.', 'Grammar.']}
					className='text-white lg:text-[5rem]'
				/>
				<div className='-mt-6 max-w-2xl space-y-4'>
					<ScrollReveal
						size='xl'
						textClassName='font-bold text-3xl sm:text-4xl lg:text-5xl text-white'
						staggerDelay={0.1}
					>
						Welcome to Kanji.uz
					</ScrollReveal>

					<ScrollReveal
						size='xl'
						textClassName='font-bold text-3xl sm:text-4xl lg:text-5xl text-white'
						staggerDelay={0.2}
					>
						Endless kanji.
					</ScrollReveal>

					<div className='flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center xl:justify-start'>
						<a href='https://dashboard.kanji.uz/login' target='_blank'>
							<Button className='w-full text-lg font-bold sm:w-auto'>Register</Button>
						</a>
						<Button variant='outline' className='w-full text-lg font-bold sm:w-auto'>
							Chat with Us
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
