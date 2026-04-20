'use client'
import Image from 'next/image'
import { ClassAttributes, InputHTMLAttributes, useState } from 'react'
import { PatternFormat } from 'react-number-format'

import { cn } from '@/src/shared/lib/utils'
import {
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/src/shared/ui'

const countries = [
	{ code: 'uz', name: 'Uzbekistan', phone: '+998', flag: '/flag-uz.png', mask: '##-###-##-##' },
]
export const InputPhone: React.FC<
	ClassAttributes<HTMLInputElement> &
		InputHTMLAttributes<HTMLInputElement> & {
			className?: string
			onChange?: (value: string) => void
		}
> = ({ className, onChange, ...props }) => {
	const [country, setCountry] = useState(countries[0])
	const [localValue, setLocalValue] = useState('')

	const handleCountryChange = (countryCode: string) => {
		const newCountry = countries.find(c => c.code === countryCode) || countries[0]
		setCountry(newCountry)
	}
	return (
		<div className={cn('flex items-center', className)}>
			<Select defaultValue={country.code} onValueChange={handleCountryChange} disabled>
				<SelectTrigger className='w-35 border-r-0'>
					<SelectValue placeholder='phone number' />
				</SelectTrigger>
				<SelectContent className='min-w-30'>
					<SelectGroup>
						{countries.map(country => (
							<SelectItem key={country.code} value={country.code}>
								<Image
									src={country.flag}
									alt={country.name}
									width={20}
									height={12}
									priority
									unoptimized
								/>
								{country.phone}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<PatternFormat
				format={country.mask}
				allowEmptyFormatting
				mask='x'
				customInput={Input}
				onValueChange={values => {
					setLocalValue(values.value)
					if (values.value) {
						onChange?.(`${country.phone}${values.value}`)
					}
				}}
			/>
		</div>
	)
}