import Globe from '../lightswind/globe'

export const OurTarget: React.FC = () => {
	return (
		<section className='relative -mt-40 overflow-hidden bg-blue-400 bg-gradient-to-b py-40 [clip-path:polygon(0_15%,100%_0,100%_100%,0_100%)]'>
			<div className='relative mx-auto max-w-7xl px-6'>
				{/* Title */}
				<h2 className='mb-20 text-center text-5xl font-extrabold text-white md:text-6xl'>
					Bizning maqsadimiz
				</h2>

				{/* Content */}
				<div className='grid items-center gap-20 md:grid-cols-2'>
					<div className='rounded-3xl bg-white/10 p-10 text-white shadow backdrop-blur-md'>
						<p className='text-lg leading-relaxed font-bold md:text-2xl'>
							Bizning maqsadimiz — yapon tilini o‘rganayotgan insonlarga osonlik
							yaratish, o‘rganish jarayonini qiziqarli va samarali qilishdir. <br />
							<br />
							Kanji.uz platformasi orqali foydalanuvchilar nafaqat til ko‘nikmalarini
							rivojlantiradi, balki dunyoning turli burchaklaridan do‘stlar topib,
							o‘zaro muloqot va tajriba almashish imkoniyatiga ega bo‘ladilar.
						</p>
					</div>

					<div className='flex justify-center'>
						<div className='rounded-full bg-white/10 p-6 shadow backdrop-blur-md'>
							<Globe diffuse={0.1} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
