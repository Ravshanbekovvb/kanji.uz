import { Loader } from '../loader'

export const NotificationAll: React.FC = () => {
	return (
		<div>
			<form className='flex items-center gap-2'>
				<input
					name='message'
					type='text'
					placeholder='type new notification...'
					className='border p-2 rounded w-full'
				/>
				{true ? (
					<Loader title='' />
				) : (
					<button
						type='button'
						className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
					>
						ADD
					</button>
				)}
			</form>
		</div>
	)
}
