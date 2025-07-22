'use client'
import { useFindUserById } from '@/hooks/useUsers'
import { ArrowLeft, LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Page() {
	const user = useParams()

	const { data, isPending, error } = useFindUserById(user.user)
	if (isPending) {
		return (
			<div className='p-6'>
				<div className='text-center flex items-center gap-5'>
					<LoaderIcon className='rotate-right' size={40} />
					Loading user profile...
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='p-6'>
				<div className='text-center text-red-500'>Error loading user profile</div>
			</div>
		)
	}

	if (!data) {
		return (
			<div className='p-6'>
				<div className='text-center'>User not found</div>
			</div>
		)
	}
	console.log(data)

	return (
		<div>
			<Link
				href='/users'
				className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6'
			>
				<ArrowLeft size={18} />
				<span>Back to Users</span>
			</Link>

			<h1 className='text-3xl font-bold text-gray-800 mb-6'>User Profile</h1>

			<div className='bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-10'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4'>
					<div className='flex items-center gap-2'>
						<span className='font-semibold text-gray-700'>Username:</span>
						<span className='text-gray-900'>{data.userName}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold text-gray-700'>Email:</span>
						<span className='text-gray-900'>{data.email}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold text-gray-700'>Role:</span>
						<span className='text-gray-900 capitalize'>{data.role}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold text-gray-700'>Language:</span>
						<span className='text-gray-900 uppercase'>{data.userLang}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold text-gray-700'>Created:</span>
						<span className='text-gray-900'>{new Date(data.createdAt).toLocaleDateString()}</span>
					</div>
				</div>
			</div>

			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
				Lessons of <span className='text-blue-600'>{data.userName}</span>
			</h2>

			<div className='rounded-xl border border-gray-200 shadow-sm overflow-hidden max-h-[400px] overflow-y-auto'>
				<table className='min-w-full text-left text-sm'>
					<thead className='bg-gray-100 text-gray-700'>
						<tr>
							<th className='px-4 py-2 border'>#</th>
							<th className='px-4 py-2 border'>Title</th>
						</tr>
					</thead>
					<tbody className='bg-white'>
						{data.lesson.length <= 0 ? (
							<tr>
								<td colSpan={2} className='px-4 py-6 text-center text-gray-500'>
									No lessons available.
								</td>
							</tr>
						) : (
							data.lesson.map((item: { title: string; id: string }, index: number) => (
								<tr key={index} className='hover:bg-gray-200 cursor-pointer'>
									<td className='px-4 py-2 border font-medium text-gray-800'>{index + 1}</td>
									<td className='px-4 py-2 border text-gray-800'>{item.title}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
