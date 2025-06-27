'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
// import { getDataFromToken } from '@/services/getDatafromToken'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ja from '../../../../public/ja.png'
import ru from '../../../../public/ru.png'
import en from '../../../../public/usa.png'
import uz from '../../../../public/uz.png'

export const LocaleSwitcher: React.FC = () => {
	const router = useRouter()
	const [localLang, setLocalLang] = useState<string>('RU') // Track selected language

	const changeLang = async (e: string) => {
		const lang = e.toLowerCase()
		document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax;`
		setLocalLang(e) // Update localLang state to re-render the component
		router.refresh() // Trigger a refresh to apply the language change
	}

	useEffect(() => {
		const getLocaleFromCookies = async () => {
			// const user = getDataFromToken()
			// const language = user?.language || 'UZ' // Ensure default to 'UZ' if not found
			// setLocalLang(language as string) // Set the initial language based on user data
		}

		getLocaleFromCookies() // Call the async function to fetch the language
	}, [])

	return (
		<Select onValueChange={changeLang} value={localLang}>
			<SelectTrigger className='w-[70px]'>
				<SelectValue placeholder='language' />
			</SelectTrigger>
			<SelectContent className='min-w-[70px]'>
				<SelectItem value='UZ'>
					<img src={uz.src} alt='Uzbek flag' className='rounded-full w-5 h-5 border' />
				</SelectItem>
				<SelectItem value='JA'>
					<img src={ja.src} alt='Japanese flag' className='rounded-full w-5 h-5 border' />
				</SelectItem>
				<SelectItem value='RU'>
					<img src={ru.src} alt='Russian flag' className='rounded-full w-5 h-5 border' />
				</SelectItem>
				<SelectItem value='EN'>
					<img src={en.src} alt='English flag' className='rounded-full w-5 h-5 border' />
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
