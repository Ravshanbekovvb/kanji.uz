import { Iphone } from '../ui/iphone'
import { Safari } from '../ui/safari'

export const MobileDesktopViews: React.FC = () => {
	return (
		<section className='from-background via-background/50 to-background w-full bg-blue-500 px-4 [clip-path:polygon(0_0,100%_15%,100%_100%,0_100%)] md:py-80 lg:-mt-60'>
			<div className='mx-auto max-w-7xl'>
				{/* Header */}
				<div className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold md:text-5xl'>Har Qanday Qurilmada</h2>
				</div>

				{/* Showcase */}
				<div className='relative flex items-center justify-center'>
					{/* Desktop */}
					<div className='w-full max-w-5xl drop-shadow-2xl'>
						<Safari imageSrc='/desktop-image.png' />
					</div>

					{/* Mobile Overlay */}
					<div className='absolute right-10 -bottom-10 z-40 w-55 drop-shadow-2xl md:w-65'>
						<Iphone src='/mobile-image.png' />
					</div>
				</div>
			</div>
		</section>
	)
}
