import {
	ThreeDScrollTriggerContainer,
	ThreeDScrollTriggerRow,
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
		text: 'Kanji.uz orqali kanjilarni o‘rganish juda osonlashdi. Har kuni oz-ozdan mashq qilib, qisqa vaqt ichida katta natija ko‘rdim.',
	},
	{
		name: 'Jasur Alimuhamedov',
		role: 'Yapon tili talabasi',
		avatar: 'https://i.pravatar.cc/80?img=15',
		text: 'Reading bo‘limi ayniqsa zo‘r. JLPT formatida testlar borligi meni imtihonga real tayyorlayapti.',
	},
	{
		name: 'Madina Usmonova',
		role: 'Boshlovchi',
		avatar: 'https://i.pravatar.cc/80?img=32',
		text: 'Oldin kanjilarni yodlash juda qiyin edi. Bu platformada esa hammasi tizimli va tushunarli.',
	},
	{
		name: 'Bekzod Rahimov',
		role: 'N2 ga tayyorlanmoqda',
		avatar: 'https://i.pravatar.cc/80?img=8',
		text: 'PDF yaratish funksiyasi menga juda yoqdi. O‘zimga kerakli so‘zlarni jamlab, bosmaga chiqaraman.',
	},
	{
		name: 'Shahnoza Tursunova',
		role: 'O‘qituvchi',
		avatar: 'https://i.pravatar.cc/80?img=21',
		text: 'O‘quvchilarimga Kanji.uz ni tavsiya qilyapman. Interfeysi sodda, ammo imkoniyatlari juda keng.',
	},
]

export const Reviews = () => {
	return (
		<ThreeDScrollTriggerContainer className='py-20 space-y-10 bg-blue-400'>
			<ThreeDScrollTriggerRow baseVelocity={4} direction={1}>
				{[...reviews, ...reviews].map((r, i) => (
					<div key={i} className='mx-3 w-[320px] shrink-0 rounded-2xl border  p-5 shadow-sm'>
						<div className='mb-3 flex items-center gap-3'>
							<img src={r.avatar} alt={r.name} className='h-10 w-10 rounded-full object-cover' />
							<div>
								<p className='text-md font-semibold '>{r.name}</p>
								<p className='text-sm '>{r.role}</p>
							</div>
						</div>

						<p className='text-sm whitespace-normal'>“{r.text}”</p>
					</div>
				))}
			</ThreeDScrollTriggerRow>
			<ThreeDScrollTriggerRow baseVelocity={2} direction={-1}>
				{[...reviews, ...reviews].map((r, i) => (
					<div key={i} className='mx-3 w-[320px] shrink-0 rounded-2xl border  p-5 shadow-sm'>
						<div className='mb-3 flex items-center gap-3'>
							<img src={r.avatar} alt={r.name} className='h-10 w-10 rounded-full object-cover' />
							<div>
								<p className='text-md font-semibold '>{r.name}</p>
								<p className='text-sm '>{r.role}</p>
							</div>
						</div>

						<p className='text-sm whitespace-normal'>“{r.text}”</p>
					</div>
				))}
			</ThreeDScrollTriggerRow>
			<ThreeDScrollTriggerRow baseVelocity={2} direction={1}>
				{[...reviews, ...reviews].map((r, i) => (
					<div key={i} className='mx-3 w-[320px] shrink-0 rounded-2xl border  p-5 shadow-sm'>
						<div className='mb-3 flex items-center gap-3'>
							<img src={r.avatar} alt={r.name} className='h-10 w-10 rounded-full object-cover' />
							<div>
								<p className='text-md font-semibold '>{r.name}</p>
								<p className='text-sm '>{r.role}</p>
							</div>
						</div>

						<p className='text-sm whitespace-normal'>“{r.text}”</p>
					</div>
				))}
			</ThreeDScrollTriggerRow>
		</ThreeDScrollTriggerContainer>
	)
}
