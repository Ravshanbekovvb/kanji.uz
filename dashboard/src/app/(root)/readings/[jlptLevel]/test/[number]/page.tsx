import { ReadingTest } from '@/components/shared/readings/jlpt-level/test/reading-test'

export default async function Page({
	params,
}: {
	params: Promise<{ number: string; jlptLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'N5' }>
}) {
	const resolvedParams = await params
	return <ReadingTest level={resolvedParams.jlptLevel} testId={resolvedParams.number} />
}
