'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function Page() {
	const params = useParams()

	if (!params.doc) {
		return 'loading..'
	}
	return (
		<div>
			<Link
				href='/all-docs'
				className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8'
			>
				<ArrowLeft size={18} />
				<span>Back to All documents</span>
			</Link>
			{params.doc}
		</div>
	)
}
