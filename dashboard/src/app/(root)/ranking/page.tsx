'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth-context'
import { RankingUser, useRanking } from '@/hooks/useRanking'
import { Trophy } from 'lucide-react'
import { useTranslations } from 'next-intl'

const CrownIcon = ({ rank }: { rank: number }) => {
	if (rank === 1)
		return (
			<svg className='h-7 w-7' viewBox='0 0 24 24' fill='#EF9F27'>
				<path d='M5 16L3 5l5.5 5L12 2l3.5 8L21 5l-2 11H5zm0 2h14v2H5v-2z' />
			</svg>
		)
	if (rank === 2)
		return (
			<svg className='h-6 w-6' viewBox='0 0 24 24' fill='#888780'>
				<path d='M5 20h14v2H5v-2zm0-2l-3-9 5.5 3L12 4l4.5 8L22 9l-3 9H5z' />
			</svg>
		)
	return (
		<svg className='h-5 w-5' viewBox='0 0 24 24' fill='#D85A30'>
			<path d='M5 20h14v2H5v-2zm0-2l-3-9 5.5 3L12 4l4.5 8L22 9l-3 9H5z' />
		</svg>
	)
}

const avatarStyle: Record<number, string> = {
	1: 'bg-amber-100 border-amber-400 text-amber-900 h-24 w-24 text-3xl',
	2: 'bg-slate-100 border-slate-400 text-slate-800 h-[72px] w-[72px] text-2xl',
	3: 'bg-orange-100 border-orange-300 text-orange-900 h-[72px] w-[72px] text-2xl',
}

const barStyle: Record<number, string> = {
	1: 'h-36 bg-amber-400',
	2: 'h-24 bg-slate-300',
	3: 'h-16 bg-orange-300',
}

const rankTextStyle: Record<number, string> = {
	1: 'text-5xl text-amber-900',
	2: 'text-4xl text-slate-700',
	3: 'text-3xl text-orange-900',
}

const PodiumUser = ({ user }: { user: RankingUser }) => {
	const letter = user.userName?.trim()?.charAt(0)?.toUpperCase() || 'U'

	return (
		<div className='flex flex-1 flex-col items-center'>
			<div className='mb-1.5 flex h-8 items-center justify-center'>
				<CrownIcon rank={user.rank} />
			</div>

			<div
				className={`flex items-center justify-center rounded-full border-2 font-medium ${
					avatarStyle[user.rank] ||
					'h-[72px] w-[72px] bg-slate-100 border-slate-300 text-slate-700 text-2xl'
				}`}
			>
				{letter}
			</div>

			<p className='mt-2.5 max-w-[110px] truncate text-center text-sm font-medium text-slate-800'>
				{user.userName}
			</p>
			<p className='mb-3 text-xs text-slate-500'>
				{user.wordsCount} so'z · {user.lessonsCount} dars
			</p>

			<div
				className={`flex w-full items-center justify-center rounded-t-xl ${
					barStyle[user.rank] || 'h-16 bg-slate-200'
				}`}
			>
				<span
					className={`font-medium leading-none ${
						rankTextStyle[user.rank] || 'text-3xl text-slate-600'
					}`}
				>
					{user.rank}
				</span>
			</div>
		</div>
	)
}

export default function RankingPage() {
	const { user } = useAuth()
	const { data, isPending, error } = useRanking()
	const t = useTranslations('ranking')

	const first = data?.topUsers.find(u => u.rank === 1)
	const second = data?.topUsers.find(u => u.rank === 2)
	const third = data?.topUsers.find(u => u.rank === 3)

	return (
		<Section>
			<div className='space-y-6'>
				{/* My rank */}
				{data?.currentUser && (
					<div className='flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3'>
						<div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-800'>
							{data.currentUser.userName?.charAt(0)?.toUpperCase()}
						</div>
						<div>
							<p className='text-sm font-medium text-slate-800'>{t('myRank')}</p>
							<p className='text-xs text-slate-500'>
								{t('lessons')}: {data.currentUser.lessonsCount} · {t('words')}:{' '}
								{data.currentUser.wordsCount}
							</p>
						</div>
						<p className='ml-auto text-2xl font-medium text-blue-700'>#{data.currentUser.rank}</p>
					</div>
				)}

				{/* Loading */}
				{isPending && (
					<div className='space-y-3'>
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className='h-14 animate-pulse rounded-xl bg-slate-100' />
						))}
					</div>
				)}

				{/* Error */}
				{error && (
					<div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600'>
						{t('error')}
					</div>
				)}

				{!isPending && !error && (
					<>
						{/* Podium */}
						<Card className='overflow-hidden border-slate-200'>
							<CardHeader className='pb-2'>
								<CardTitle className='text-xs font-medium uppercase tracking-widest text-slate-400'>
									{t('podium')}
								</CardTitle>
							</CardHeader>
							<CardContent className='px-4 pb-0'>
								<div className='flex items-end justify-center gap-4'>
									{second && <PodiumUser user={second} />}
									{first && <PodiumUser user={first} />}
									{third && <PodiumUser user={third} />}
								</div>
							</CardContent>
						</Card>

						{/* Table */}
						<Card className='border-slate-200'>
							<CardHeader className='py-3'>
								<div className='flex items-center justify-between'>
									<CardTitle className='flex items-center gap-2 text-base font-medium'>
										<Trophy className='h-4 w-4 text-amber-600' />
										{t('top10')}
									</CardTitle>
									<span className='rounded-full border border-slate-200 bg-slate-50 px-3 py-0.5 text-xs text-slate-500'>
										{t('total')}: {data?.totalUsers || 0} {t('people')}
									</span>
								</div>
							</CardHeader>
							<CardContent className='p-0'>
								<Table>
									<TableBody>
										{data?.topUsers.map(userItem => {
											const isCurrentUser = userItem.id === user?.id
											const letter = userItem.userName?.charAt(0)?.toUpperCase()

											return (
												<TableRow
													key={userItem.id}
													className={isCurrentUser ? 'bg-blue-50 hover:bg-blue-100/60' : ''}
												>
													<TableCell className='font-medium text-slate-500'>
														{userItem.rank}
													</TableCell>
													<TableCell>
														<div className='flex items-center gap-2.5'>
															<div
																className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
																	isCurrentUser
																		? 'bg-blue-200 text-blue-900'
																		: 'bg-slate-100 text-slate-600'
																}`}
															>
																{letter}
															</div>
															<span className={isCurrentUser ? 'font-medium text-blue-800' : ''}>
																{userItem.userName}
															</span>
															{isCurrentUser && (
																<span className='rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700'>
																	{t('you')}
																</span>
															)}
														</div>
													</TableCell>
													<TableCell className='text-slate-600'>
														{userItem.lessonsCount} {t('lessonUnit')}
													</TableCell>
													<TableCell
														className={`font-medium ${
															isCurrentUser ? 'text-blue-700' : 'text-amber-700'
														}`}
													>
														{userItem.wordsCount} {t('wordUnit')}
													</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</>
				)}
			</div>
		</Section>
	)
}
