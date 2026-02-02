import {
	ThreeDScrollTriggerContainer,
	ThreeDScrollTriggerRow
} from '../lightswind/3d-scroll-trigger'

type Review = {
	name: string
	role: string
	avatar: string
	text: string
}

const reviews: Review[] = [
	{
		name: 'Aziza Karimova',
		role: 'JLPT N3 o‘quvchisi',
		avatar: 'https://i.pravatar.cc/80?img=47',
		text: 'Kanji.uz orqali kanjilarni o‘rganish juda osonlashdi. Har kuni oz-ozdan mashq qilib, qisqa vaqt ichida katta natija ko‘rdim.'
	},
	{
		name: 'Jasur Alimuhamedov',
		role: 'Yapon tili talabasi',
		avatar: 'https://i.pravatar.cc/80?img=15',
		text: 'Reading bo‘limi ayniqsa zo‘r. JLPT formatida testlar borligi meni imtihonga real tayyorlayapti.'
	},
	{
		name: 'Madina Usmonova',
		role: 'Boshlovchi',
		avatar: 'https://i.pravatar.cc/80?img=32',
		text: 'Oldin kanjilarni yodlash juda qiyin edi. Bu platformada esa hammasi tizimli va tushunarli.'
	},
	{
		name: 'Bekzod Rahimov',
		role: 'N2 ga tayyorlanmoqda',
		avatar: 'https://i.pravatar.cc/80?img=8',
		text: 'PDF yaratish funksiyasi menga juda yoqdi. O‘zimga kerakli so‘zlarni jamlab, bosmaga chiqaraman.'
	},
	{
		name: 'Shahnoza Tursunova',
		role: 'O‘qituvchi',
		avatar: 'https://i.pravatar.cc/80?img=21',
		text: 'O‘quvchilarimga Kanji.uz ni tavsiya qilyapman. Interfeysi sodda, ammo imkoniyatlari juda keng.'
	}
]

export const Reviews = () => {
	return (
		<ThreeDScrollTriggerContainer className='-mt-50 w-full max-w-full space-y-10 overflow-x-hidden bg-blue-500 py-60 [clip-path:polygon(0_0,100%_15%,100%_100%,0_100%)]'>
			<h2 className='mb-20 text-center text-5xl font-extrabold md:text-6xl'>Reviewlar </h2>
			<ThreeDScrollTriggerRow baseVelocity={2} direction={1}>
				{[...reviews, ...reviews].map((r, i) => (
					<div
						key={i}
						className='mx-3 w-115 shrink-0 rounded-2xl border border-blue-300 p-5'
					>
						<div className='mb-3 flex items-center gap-3'>
							<img
								src={r.avatar}
								alt={r.name}
								className='h-12 w-12 rounded-full object-cover'
							/>
							<div>
								<p className='text-2xl font-bold'>{r.name}</p>
								<p className='text-lg font-bold'>{r.role}</p>
							</div>
						</div>

						<p className='text-lg font-semibold whitespace-normal'>“{r.text}”</p>
					</div>
				))}
			</ThreeDScrollTriggerRow>
			<ThreeDScrollTriggerRow baseVelocity={2} direction={-1}>
				{[...reviews, ...reviews].map((r, i) => (
					<div
						key={i}
						className='mx-3 w-115 shrink-0 rounded-2xl border border-blue-300 p-5'
					>
						<div className='mb-3 flex items-center gap-3'>
							<img
								src={r.avatar}
								alt={r.name}
								className='h-12 w-12 rounded-full object-cover'
							/>
							<div>
								<p className='text-2xl font-bold'>{r.name}</p>
								<p className='text-lg font-bold'>{r.role}</p>
							</div>
						</div>

						<p className='text-lg font-semibold whitespace-normal'>“{r.text}”</p>
					</div>
				))}
			</ThreeDScrollTriggerRow>
			<ThreeDScrollTriggerRow baseVelocity={2} direction={1}>
				{[...reviews, ...reviews].map((r, i) => (
					<div
						key={i}
						className='mx-3 w-115 shrink-0 rounded-2xl border border-blue-300 p-5'
					>
						<div className='mb-3 flex items-center gap-3'>
							<img
								src={r.avatar}
								alt={r.name}
								className='h-12 w-12 rounded-full object-cover'
							/>
							<div>
								<p className='text-2xl font-bold'>{r.name}</p>
								<p className='text-lg font-bold'>{r.role}</p>
							</div>
						</div>

						<p className='text-lg font-semibold whitespace-normal'>“{r.text}”</p>
					</div>
				))}
			</ThreeDScrollTriggerRow>
		</ThreeDScrollTriggerContainer>
	)
}
