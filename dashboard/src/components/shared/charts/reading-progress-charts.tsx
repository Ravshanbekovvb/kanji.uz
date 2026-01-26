import React from 'react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { ReadingProgress } from '../../../../prisma/__generated__'

interface ChartData {
	date: string
	accuracy: number
	total: number
	correct: number
	avgTime: number
}

interface DifficultyData {
	difficulty: string
	total: number
	correct: number
	accuracy: number
	avgTime: number
}

interface ReadingProgressChartsProps {
	data: ReadingProgress[]
}

const COLORS = {
	EASY: '#10b981',
	MEDIUM: '#f59e0b',
	HARD: '#ef4444',
}

export const ReadingProgressCharts: React.FC<ReadingProgressChartsProps> = ({ data }) => {
	// Group by day for daily accuracy chart
	const dailyData = data.reduce(
		(acc, item) => {
			const date = new Date(item.createdAt).toISOString().split('T')[0]

			if (!acc[date]) {
				acc[date] = { total: 0, correct: 0, totalTime: 0 }
			}

			acc[date].total++
			acc[date].totalTime += item.solvedTime
			if (item.isCorrect) {
				acc[date].correct++
			}

			return acc
		},
		{} as Record<string, { total: number; correct: number; totalTime: number }>
	)

	const chartData: ChartData[] = Object.entries(dailyData)
		.map(([date, stats]) => ({
			date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			accuracy: Math.round(((stats as any).correct / (stats as any).total) * 100),
			total: (stats as any).total,
			correct: (stats as any).correct,
			avgTime: Math.round((stats as any).totalTime / (stats as any).total),
		}))
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.slice(-7) // Last 7 days

	// Group by difficulty
	const difficultyStats = data.reduce(
		(acc, item) => {
			const level = item.testLevel as 'EASY' | 'MEDIUM' | 'HARD'

			if (!acc[level]) {
				acc[level] = { total: 0, correct: 0, totalTime: 0 }
			}

			acc[level].total++
			acc[level].totalTime += item.solvedTime
			if (item.isCorrect) {
				acc[level].correct++
			}

			return acc
		},
		{} as Record<string, { total: number; correct: number; totalTime: number }>
	)

	const difficultyData: DifficultyData[] = Object.entries(difficultyStats).map(
		([difficulty, stats]) => ({
			difficulty,
			total: (stats as any).total,
			correct: (stats as any).correct,
			accuracy: Math.round(((stats as any).correct / (stats as any).total) * 100),
			avgTime: Math.round((stats as any).totalTime / (stats as any).total),
		})
	)

	// Overall stats
	const totalTests = data.length
	const totalCorrect = data.filter(item => item.isCorrect).length
	const overallAccuracy = totalTests > 0 ? Math.round((totalCorrect / totalTests) * 100) : 0
	const avgSolvedTime =
		totalTests > 0
			? Math.round(data.reduce((sum, item) => sum + item.solvedTime, 0) / totalTests)
			: 0

	if (data.length === 0) {
		return (
			<div className='text-center py-8'>
				<p className='text-gray-500'>Hozircha ma'lumotlar yo'q</p>
			</div>
		)
	}

	return (
		<div className='space-y-8'>
			{/* Overall Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<div className='bg-white p-4 rounded-lg border'>
					<div className='text-2xl font-bold text-blue-600'>{totalTests}</div>
					<div className='text-sm text-gray-600'>Jami Testlar</div>
				</div>
				<div className='bg-white p-4 rounded-lg border'>
					<div className='text-2xl font-bold text-green-600'>{totalCorrect}</div>
					<div className='text-sm text-gray-600'>To'g'ri Javoblar</div>
				</div>
				<div className='bg-white p-4 rounded-lg border'>
					<div className='text-2xl font-bold text-purple-600'>{overallAccuracy}%</div>
					<div className='text-sm text-gray-600'>Umumiy Aniqlik</div>
				</div>
				<div className='bg-white p-4 rounded-lg border'>
					<div className='text-2xl font-bold text-orange-600'>
						{Math.floor(avgSolvedTime / 60)}:{(avgSolvedTime % 60).toString().padStart(2, '0')}
					</div>
					<div className='text-sm text-gray-600'>O'rtacha Vaqt</div>
				</div>
			</div>

			{/* Daily Accuracy Chart */}
			<div className='bg-white p-6 rounded-lg border'>
				<h3 className='text-lg font-semibold mb-4'>Kunlik Aniqlik (%)</h3>
				<div style={{ width: '100%', height: '300px' }}>
					<ResponsiveContainer>
						<LineChart data={chartData}>
							<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
							<XAxis dataKey='date' tick={{ fontSize: 12 }} stroke='#666' />
							<YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke='#666' />
							<Tooltip
								formatter={(value: any) => [`${value}%`, 'Aniqlik']}
								labelFormatter={date => `Sana: ${date}`}
								contentStyle={{
									backgroundColor: '#fff',
									border: '1px solid #ccc',
									borderRadius: '8px',
								}}
							/>
							<Line
								type='monotone'
								dataKey='accuracy'
								stroke='#2563eb'
								strokeWidth={3}
								dot={{ r: 5, fill: '#2563eb' }}
								activeDot={{ r: 7 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
				{/* Difficulty Performance Chart */}
				<div className='bg-white p-6 rounded-lg border'>
					<h3 className='text-lg font-semibold mb-4'>Qiyinchilik Darajasi bo'yicha Natija</h3>
					<div style={{ width: '100%', height: '300px' }}>
						<ResponsiveContainer>
							<BarChart data={difficultyData}>
								<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
								<XAxis dataKey='difficulty' tick={{ fontSize: 12 }} stroke='#666' />
								<YAxis tick={{ fontSize: 12 }} stroke='#666' />
								<Tooltip
									formatter={(value: any, name: string) => {
										if (name === 'accuracy') return [`${value}%`, 'Aniqlik']
										if (name === 'total') return [value, 'Jami']
										if (name === 'correct') return [value, "To'g'ri"]
										return [value, name]
									}}
									contentStyle={{
										backgroundColor: '#fff',
										border: '1px solid #ccc',
										borderRadius: '8px',
									}}
								/>
								<Bar dataKey='accuracy' fill='#3b82f6' radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Average Time by Difficulty */}
				<div className='bg-white p-6 rounded-lg border'>
					<h3 className='text-lg font-semibold mb-4'>Qiyinchilik bo'yicha O'rtacha Vaqt</h3>
					<div style={{ width: '100%', height: '300px' }}>
						<ResponsiveContainer>
							<BarChart data={difficultyData}>
								<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
								<XAxis dataKey='difficulty' tick={{ fontSize: 12 }} stroke='#666' />
								<YAxis tick={{ fontSize: 12 }} stroke='#666' />
								<Tooltip
									formatter={(value: any) => [
										`${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}`,
										"O'rtacha Vaqt",
									]}
									contentStyle={{
										backgroundColor: '#fff',
										border: '1px solid #ccc',
										borderRadius: '8px',
									}}
								/>
								<Bar dataKey='avgTime' fill='#8884d8' radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* Difficulty Distribution Pie Chart */}
			<div className='bg-white p-6 rounded-lg border'>
				<h3 className='text-lg font-semibold mb-4'>Test Taqsimoti (Qiyinchilik bo'yicha)</h3>
				<div style={{ width: '100%', height: '300px' }}>
					<ResponsiveContainer>
						<PieChart>
							<Pie
								data={difficultyData}
								cx='50%'
								cy='50%'
								outerRadius={100}
								dataKey='total'
								nameKey='difficulty'
								label={({ difficulty, total, percent }: any) =>
									`${difficulty}: ${total} (${((percent || 0) * 100).toFixed(0)}%)`
								}
							>
								{difficultyData.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[entry.difficulty as keyof typeof COLORS]}
									/>
								))}
							</Pie>
							<Tooltip
								formatter={(value: any) => [value, 'Testlar soni']}
								contentStyle={{
									backgroundColor: '#fff',
									border: '1px solid #ccc',
									borderRadius: '8px',
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}
