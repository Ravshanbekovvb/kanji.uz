'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserLoginStats, useUserLoginStats } from '@/hooks/useUserLoginStats'
import { LoaderIcon } from 'lucide-react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const COLORS = [
	'#8884d8',
	'#82ca9d',
	'#ffc658',
	'#ff7300',
	'#0088fe',
	'#00c49f',
	'#ffbb28',
	'#ff8042',
]

interface ChartData {
	id: string
	name: string
	loginCount: number
	role: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload
		return (
			<div className='bg-white p-3 border rounded-lg shadow-lg'>
				<p className='font-semibold'>{`User: ${label}`}</p>
				<p className='text-blue-600'>{`Logins: ${data.loginCount}`}</p>
				<p className='text-gray-600'>{`Role: ${data.role}`}</p>
			</div>
		)
	}
	return null
}

export const UserLoginChart = () => {
	const { data: users, isLoading, error } = useUserLoginStats()

	if (isLoading) {
		return (
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>User Login Statistics</CardTitle>
					<CardDescription>Loading chart data...</CardDescription>
				</CardHeader>
				<CardContent className='flex items-center justify-center h-96'>
					<LoaderIcon className='animate-spin' size={40} />
				</CardContent>
			</Card>
		)
	}

	if (error) {
		return (
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>User Login Statistics</CardTitle>
					<CardDescription>Error loading data</CardDescription>
				</CardHeader>
				<CardContent className='flex items-center justify-center h-96'>
					<p className='text-red-500'>Failed to load user login statistics</p>
				</CardContent>
			</Card>
		)
	}

	if (!users || users.length === 0) {
		return (
			<Card className='w-full'>
				<CardHeader>
					<CardTitle>User Login Statistics</CardTitle>
					<CardDescription>No data available</CardDescription>
				</CardHeader>
				<CardContent className='flex items-center justify-center h-96'>
					<p className='text-gray-500'>No users found</p>
				</CardContent>
			</Card>
		)
	}

	// Transform data for the chart
	const chartData: ChartData[] = users.map((user: UserLoginStats) => ({
		id: user.id,
		name: user.userName,
		loginCount: user.loginCount,
		role: user.role,
	}))

	// Take top 10 users for better readability
	const topUsers = chartData.slice(0, 10)

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>User Login Statistics</CardTitle>
				<CardDescription>Number of logins per user (Top 10)</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='w-full h-96'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart
							data={topUsers}
							margin={{
								top: 20,
								right: 30,
								left: 20,
								bottom: 60,
							}}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis
								dataKey='name'
								angle={-45}
								textAnchor='end'
								height={80}
								interval={0}
								fontSize={12}
							/>
							<YAxis />
							<Tooltip content={<CustomTooltip />} />
							<Bar dataKey='loginCount' radius={[4, 4, 0, 0]}>
								{topUsers.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div className='mt-4 flex flex-wrap gap-2'>
					{topUsers.map((user, index) => (
						<div key={user.id} className='flex items-center space-x-2'>
							<div
								className='w-4 h-4 rounded'
								style={{ backgroundColor: COLORS[index % COLORS.length] }}
							/>
							<span className='text-sm font-medium'>{user.name}</span>
							<span className='text-sm text-gray-500'>({user.loginCount} logins)</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
