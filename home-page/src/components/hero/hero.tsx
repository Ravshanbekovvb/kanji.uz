import { Button } from '../lightswind/button'
import { ScrollReveal } from '../lightswind/scroll-reveal'
export const Hero = () => {
	return (
		<div className="relative h-250 bg-[url('/hero-image.png')] bg-cover bg-no-repeat">
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
			<div className='flex h-full flex-col items-end justify-center text-right md:pr-80'>
				<ScrollReveal size='lg' textClassName='font-bold' staggerDelay={0.1}>
					Welcome to Kanji.uz
				</ScrollReveal>
				<ScrollReveal size='lg' textClassName='font-bold' staggerDelay={0.2}>
					2,000 kanji.
				</ScrollReveal>
				<ScrollReveal size='lg' textClassName='font-bold' staggerDelay={0.3}>
					In just over a year.
				</ScrollReveal>
				<ScrollReveal size='sm' textClassName='font-semibold' staggerDelay={0.4}>
					Biz bilan o'zingizni kanji cardlaringizni yarating va rivojlaning!
				</ScrollReveal>
				<div className='space-x-5'>
					<Button className='text-lg font-bold'>Register</Button>
					<Button variant='outline' className='text-lg font-bold'>
						Chat with Us
					</Button>
				</div>
			</div>
		</div>
	)
}
