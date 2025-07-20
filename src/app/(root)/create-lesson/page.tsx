import { CreatePdfPage } from '@/components/shared/create-pdf'
import { Suspense } from 'react'

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CreatePdfPage />
		</Suspense>
	)
}
