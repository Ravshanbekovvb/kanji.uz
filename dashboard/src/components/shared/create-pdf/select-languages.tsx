import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { languagesType } from '@/types/types'
import { CN, JP, KR, RU, TR, US, UZ } from 'country-flag-icons/react/3x2'
export const SelectLanguages: React.FC<{
	translateToLanguage: languagesType
	setTranslateToLanguage: React.Dispatch<React.SetStateAction<languagesType>>
}> = ({ translateToLanguage, setTranslateToLanguage }) => {
	return (
		<div className=' flex items-center justify-around mt-8'>
			<Select disabled defaultValue='japanese'>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='language' className='p-3' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='japanese'>
						<JP /> Japanese
					</SelectItem>
				</SelectContent>
			</Select>
			<Select
				value={translateToLanguage}
				onValueChange={value => setTranslateToLanguage(value as languagesType)}
			>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Theme' className='p-3' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='uz'>
						<UZ /> Uzbek
					</SelectItem>
					<SelectItem value='ru'>
						<RU /> Russian
					</SelectItem>
					<SelectItem value='en'>
						<US /> English
					</SelectItem>
					<SelectItem value='ko'>
						<KR /> Korean
					</SelectItem>
					<SelectItem value='tr'>
						<TR /> Turkish
					</SelectItem>
					<SelectItem value='zh'>
						<CN /> Chinese
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
