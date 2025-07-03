import { Loader } from '../loader'

export const NotificationPersonal: React.FC = () => {
	return (
		<div>
			<form className='flex items-center gap-2'>
				<input
					name='message'
					type='text'
					placeholder='type new notification personal...'
					className='border p-2 rounded w-full'
				/>
				{/* <Combobox users={users} setWhichUser={setWhichUser} /> */}

				{true ? (
					<Loader title='' />
				) : (
					<button
						type='submit'
						className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
					>
						ADD
					</button>
				)}
			</form>
		</div>
	)
}
