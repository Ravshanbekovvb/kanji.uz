import { ScrollReveal } from '../lightswind/scroll-reveal'
export const Hero = () => {
	return (
		<div className="bg-[url('/hero-image.jpg')] bg-no-repeat bg-center bg-cover h-200 relative">
			<div className='absolute inset-0 bg-white/10 dark:bg-black/20' />
			<div className='flex flex-col items-center justify-center h-full mb-50'>
				<ScrollReveal size='lg' textClassName='font-bold'>
					welcome to Our Website
				</ScrollReveal>
				<ScrollReveal size='sm' textClassName='font-semibold '>
					Biz bilan o'zingizni kanji cardlaringizni yarating va rivojlaning!
				</ScrollReveal>
			</div>
		</div>
	)
}
