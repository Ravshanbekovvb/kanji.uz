import clsx from 'clsx'
import { HelpCircle, RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
interface Props {
	needHelp: boolean
	setNeedHelp: Dispatch<SetStateAction<boolean>>
	wordsLength: boolean
	setWords: Dispatch<SetStateAction<any[]>>
}
export const MemorizeHeader: React.FC<Props> = ({
	needHelp,
	setNeedHelp,
	wordsLength,
	setWords,
}) => {
	const reset = () => {
		setWords([])
	}
	return (
		<div className='flex items-center gap-5 justify-between'>
			<div className='flex items-center gap-5'>
				<Image src={'/target-icon.webp'} alt='target-icon' height={40} width={60} />
				<h2 className='text-4xl font-semibold'>Memorize</h2>
			</div>
			<div className={clsx('flex items-center gap-5', wordsLength ? '' : 'hidden')}>
				<div
					className='rounded-full bg-gray-800 hover:bg-gray-900 w-7 h-7 flex justify-center items-center text-slate-50 borde  cursor-pointer'
					onClick={reset}
				>
					<RefreshCcw size={15} />
				</div>
				<button
					className={clsx('text-gray-500 hover:text-black transition-colors duration-200')}
					onClick={() => setNeedHelp(!needHelp)}
				>
					<HelpCircle size={28} className='cursor-pointer' />
				</button>
			</div>
		</div>
	)
}
