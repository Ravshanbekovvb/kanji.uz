'use client'
import Image from 'next/image'

import { Form } from './form'
import { cn } from '@/src/shared/lib/utils'
import {
	CardContent,
	CardDescription,
	CardHeader,
	Card as CardRoot,
	CardTitle
} from '@/src/shared/ui'

import { useLoginFormModel } from '../model'

export const Card: React.FC<{ className?: string }> = ({ className, ...props }) => {
	const model = useLoginFormModel()

	return (
		<div className={cn('', className)} {...props}>
			<CardRoot>
				<CardHeader>
					<div className='flex items-center gap-5'>
						<Image alt='Main logo' src={'/logo.png'} height={20} width={60} priority />
						<span className='text-foreground text-2xl font-semibold'>
							Dashboard kanji.uz
						</span>{' '}
					</div>
					<CardTitle className='text-xl'>Kodni kiriting</CardTitle>
					<CardDescription className='text-muted-foreground text-base'>
						<span className='text-foreground cursor-pointer font-medium underline underline-offset-4'>
							@kanji.uz
						</span>{' '}
						Telegram botiga kiring va 1 daqiqa ichida tasdiqlash kodini oling.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form model={model} />
				</CardContent>
			</CardRoot>
		</div>
	)
}
