import { JlptLevel } from '@/components/shared/readings/jlpt-level/jlpt-level'

export default async function Page({ params }: { params: Promise<{ jlptLevel: string }> }) {
	const resolvedParams = await params
	return <JlptLevel params={{ level: resolvedParams.jlptLevel }} />
}
