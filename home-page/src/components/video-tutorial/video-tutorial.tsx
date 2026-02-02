export const VideoTutorial: React.FC = () => {
	const features = [
		'Kanji kartalarini yaratish va boshqarish',
		'JLPT formatida reading testlari',
		"Shaxsiy lug'at va PDF eksport",
		'Kundalik mashqlar va statistika',
		"O'quv jarayonini kuzatish",
		"Interaktiv o'rganish tizimlari"
	]

	return (
		<div className='relative -mt-60 w-full overflow-hidden bg-blue-400 px-5 py-80 [clip-path:polygon(0_15%,100%_0,100%_100%,0_100%)] md:px-20'>
			<div className='max-w-8xl mx-auto'>
				<h2 className='mb-20 text-center text-5xl font-extrabold md:text-6xl'>
					Platformadan foydalanish bo'yicha video qo'llanma
				</h2>

				<div className='group relative overflow-hidden rounded-2xl shadow-2xl'>
					<video
						className='h-[80vh] w-full object-cover'
						controls
						poster='/hero-image.png'
						preload='metadata'
					>
						<source src='/tutorial.mp4' type='video/mp4' />
						Brauzeringiz video ni qo'llab-quvvatlamaydi.
					</video>
				</div>
			</div>
		</div>
	)
}
