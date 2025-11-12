import { ReadingTest } from '@/components/shared/readings/jlpt-level/test/reading-test'

export default async function Page({
	params,
}: {
	params: Promise<{ number: string; jlptLevel: string }>
}) {
	const resolvedParams = await params
	return <ReadingTest level={resolvedParams.jlptLevel} testId={resolvedParams.number} />
}
