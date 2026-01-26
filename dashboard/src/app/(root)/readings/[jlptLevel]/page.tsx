import { JlptLevel } from '@/components/shared/readings/jlpt-level/jlpt-level'

export default async function Page({
	params,
}: {
	params: Promise<{ jlptLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5' }>
}) {
	const resolvedParams = await params
	return <JlptLevel params={{ level: resolvedParams.jlptLevel }} />
}
