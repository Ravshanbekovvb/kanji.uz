import { OtpStep } from './otp-step'

import { useLoginFormModel } from '../model'

export const Form: React.FC<{ model: ReturnType<typeof useLoginFormModel> }> = ({ model }) => {
	return (
		<form>
			<OtpStep model={model} />
			{/* <p className='mt-5'>
					Don&apos;t have an account? <a href='#'>Sign up</a>
				</p> */}
		</form>
	)
}
