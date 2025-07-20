import { Switch } from '@/components/ui/switch'

type Props = {
	settings: {
		autoTranslate: boolean
		autoAddingExample: boolean
	}
	handleSwitchChange: (key: string, isChecked: boolean) => void
}

export const SwitchInputs: React.FC<Props> = ({ settings, handleSwitchChange }) => {
	return (
		<div className='flex justify-evenly mt-5 mb-8 text-lg max-xl:text-base gap-3 max-sm:justify-around'>
			<div className='flex items-center gap-3 max-sm:flex-col  max-sm:items-start'>
				<span>Auto Translate</span>
				<Switch
					className='data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300'
					checked={settings.autoTranslate}
					onCheckedChange={checked => handleSwitchChange('autoTranslate', checked)}
				/>
			</div>
			<div className='flex items-center gap-3 max-sm:flex-col  max-sm:items-start'>
				<span>Auto transcribe</span>
				<Switch
					className='data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-300'
					checked={settings.autoAddingExample}
					onCheckedChange={checked => handleSwitchChange('autoAddingExample', checked)}
				/>
			</div>
		</div>
	)
}
