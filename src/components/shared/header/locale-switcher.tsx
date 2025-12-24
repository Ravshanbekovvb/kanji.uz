'use client'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { UZ, JP, RU, US } from 'country-flag-icons/react/3x2'
// import { getDataFromToken } from '@/services/getDatafromToken'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const languages = [
	{
		code: 'uz',
		label: 'UZ',
		flag: UZ,
	},
	{
		code: 'ja',
		label: 'JA',
		flag: JP,
	},
	{
		code: 'ru',
		label: 'RU',
		flag: RU,
	},
	{
		code: 'us',
		label: 'US',
		flag: US,
	},
]
export const LocaleSwitcher: React.FC = () => {
	const router = useRouter()
	const [localLang, setLocalLang] = useState<string>('uz') // Track selected language

	const changeLang = async (e: string) => {
		console.log(e)
		document.cookie = `locale=${e}; path=/; max-age=31536000; SameSite=Lax;`
		setLocalLang(e)
		// Force reload to update messages
		router.refresh()
	}

	const selectedLanguage = languages.find(lang => lang.code === localLang)

	return (
		<Select onValueChange={changeLang} value={localLang}>
			<SelectTrigger className='w-[95px] border-2 focus:ring-0'>
				<SelectValue>
					{selectedLanguage && (
						<div className='flex items-center gap-2'>
							<selectedLanguage.flag className='w-6 h-4' />
							<span className='text-sm font-medium'>{selectedLanguage.label}</span>
						</div>
					)}
				</SelectValue>
			</SelectTrigger>
			<SelectContent className='min-w-[95px]'>
				{languages.map(language => (
					<SelectItem key={language.code} value={language.code}>
						<div className='flex items-center gap-2'>
							<language.flag className='w-6 h-4' />
							<span className='text-sm'>{language.label}</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
