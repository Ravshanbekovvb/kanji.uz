import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/src/shared/ui'

import { useLoginFormModel } from '../model'

export const OtpStep: React.FC<{ model: ReturnType<typeof useLoginFormModel> }> = () => {
	return (
		<div className='flex flex-col items-center gap-4'>
			<InputOTP maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} className='size-12' />
					<InputOTPSlot index={1} className='size-12' />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={2} className='size-12' />
					<InputOTPSlot index={3} className='size-12' />
				</InputOTPGroup>
			</InputOTP>
			{/* <Button className='w-full'>Submit</Button> */}
		</div>
	)
}
