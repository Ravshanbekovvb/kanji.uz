'use client'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
// import { getDataFromToken } from '@/services/getDatafromToken'
// import { JWTPayload } from 'jose'
type Props = {
	className?: string
}

export const UserRole: React.FC<Props> = ({ className }: Props) => {
	// const [isUserdata, setIsuserData] = useState<JWTPayload | null>(null)

	useEffect(() => {
		// const userDatas = getDataFromToken()
		// setIsuserData(userDatas)
	}, [])
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<img
				src={
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt08ADSBsRRxQ2xzvxjADA0SCVuwEwY6gASg&s'
				}
				// src={
				// 	isUserdata && isUserdata.gender === 'MALE'
				// 		? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt08ADSBsRRxQ2xzvxjADA0SCVuwEwY6gASg&s'
				// 		: isUserdata?.gender === 'FEMALE'
				// 		? 'https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png'
				// 		: 'https://cdn.pixabay.com/photo/2016/10/18/18/19/question-mark-1750942_1280.png'
				// }
				alt=''
				width={40}
				className='rounded-full'
			/>
			<div className='flex flex-col'>
				<div className='font-bold capitalize'>asd</div>
				<div className='text-black/50 text-[12px]'>Admin</div>
			</div>
		</div>
	)
}
