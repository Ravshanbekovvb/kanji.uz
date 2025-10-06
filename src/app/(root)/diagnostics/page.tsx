'use client'

import { UserLoginChart } from '@/components/shared/charts/user-login-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { useUserLoginStats } from '@/hooks/useUserLoginStats'
import { Activity, BarChart3, TrendingUp, Users } from 'lucide-react'

export default function AdminDashboard() {
	const { data: users } = useUserLoginStats()

	const totalUsers = users?.length || 0
	const totalLogins = users?.reduce((sum, user) => sum + user.loginCount, 0) || 0
	const averageLogins = totalUsers > 0 ? Math.round(totalLogins / totalUsers) : 0
	const mostActiveUser = users?.find(
		user => user.loginCount === Math.max(...users.map(u => u.loginCount))
	)

	return (
		<Section className=' space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
					<p className='text-gray-600 mt-2'>Monitor user activity and login statistics</p>
				</div>
			</div>

			{/* Stats Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Users</CardTitle>
						<Users className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{totalUsers}</div>
						<p className='text-xs text-muted-foreground'>Registered users</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Total Logins</CardTitle>
						<Activity className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{totalLogins}</div>
						<p className='text-xs text-muted-foreground'>All time logins</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Average Logins</CardTitle>
						<TrendingUp className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{averageLogins}</div>
						<p className='text-xs text-muted-foreground'>Per user</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>Most Active User</CardTitle>
						<BarChart3 className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>{mostActiveUser?.loginCount || 0}</div>
						<p className='text-xs text-muted-foreground'>{mostActiveUser?.userName || 'No data'}</p>
					</CardContent>
				</Card>
			</div>

			{/* Login Chart */}
			<UserLoginChart />

			{/* Users Table */}
			<Card>
				<CardHeader>
					<CardTitle>User Details</CardTitle>
					<CardDescription>Complete list of users with their login counts</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='border-b'>
									<th className='text-left p-3 font-semibold'>Username</th>
									<th className='text-left p-3 font-semibold'>Email</th>
									<th className='text-left p-3 font-semibold'>Role</th>
									<th className='text-left p-3 font-semibold'>Login Count</th>
									<th className='text-left p-3 font-semibold'>Joined</th>
								</tr>
							</thead>
							<tbody>
								{users?.map(user => (
									<tr key={user.id} className='border-b hover:bg-gray-50'>
										<td className='p-3 font-medium'>{user.userName}</td>
										<td className='p-3 text-gray-600'>{user.email}</td>
										<td className='p-3'>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${
													user.role === 'ADMIN'
														? 'bg-red-100 text-red-800'
														: user.role === 'TEACHER'
															? 'bg-blue-100 text-blue-800'
															: 'bg-gray-100 text-gray-800'
												}`}
											>
												{user.role}
											</span>
										</td>
										<td className='p-3'>
											<span className='font-bold text-lg'>{user.loginCount}</span>
										</td>
										<td className='p-3 text-gray-600'>
											{new Date(user.createdAt).toLocaleDateString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</Section>
	)
}
