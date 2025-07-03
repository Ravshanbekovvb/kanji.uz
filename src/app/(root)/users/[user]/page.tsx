'use client'
import { useFindUserById } from '@/hooks/useUsers'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Page() {
	const user = useParams()

	const { data, isPending, error } = useFindUserById(user.user)

	if (isPending) {
		return (
			<div className='p-6'>
				<div className='text-center'>Loading user profile...</div>
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

	return (
		<div className='p-6'>
			<Link
				href='/users'
				className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8'
			>
				<ArrowLeft size={18} />
				<span>Back to Users</span>
			</Link>
			<h1 className='text-2xl font-bold mb-4'>User Profile</h1>
			<div className='bg-white rounded-lg shadow-md p-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='flex items-center gap-2'>
						<span className='font-semibold'>Username:</span>
						<span className='text-gray-600'>{data.userName}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold'>Email:</span>
						<span className='text-gray-600'>{data.email}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold'>Role:</span>
						<span className='text-gray-600'>{data.role}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold'>Language:</span>
						<span className='text-gray-600'>{data.userLang}</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='font-semibold'>Created:</span>
						<span className='text-gray-600'>{new Date(data.createdAt).toLocaleDateString()}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
