'use client'
import { Section } from '@/components/ui/section'
import { useSignupRequests } from '@/hooks/useSignupRequests'
import { ArrowLeft, LoaderIcon } from 'lucide-react'
import Link from 'next/link'
import { PageTitle } from '../../title'
import { columns } from './columns'
import { DataTableSignupRequests } from './data-table'

export const SignupRequests: React.FC = () => {
	const { data, isPending, error } = useSignupRequests(true)

	if (isPending) {
		return <LoaderIcon className='rotate-right min-h-[560px] mx-auto' size={40} />
	}
	if (error) {
		return 'error..'
	}
	console.log(data)

	return (
		<Section>
			<Link
				href='/users'
				className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6'
			>
				<ArrowLeft size={18} />
				<span>Back to Users</span>
			</Link>
			<PageTitle title='Sign up Requests' className='mb-5' />
			<DataTableSignupRequests columns={columns} data={data} />
		</Section>
	)
}
