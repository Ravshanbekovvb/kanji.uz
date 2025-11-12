'use client'
import { Loader } from '@/components/shared/loader'
import { Badge } from '@/components/ui/badge'
import { Section } from '@/components/ui/section'
import { useReadingTests } from '@/hooks/useReadings'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BackLink } from '../../../back-link'
import { CountdownModal } from './countdown-modal'
import { Timer } from './timer'

interface ReadingTestProps {
	testId: string
	level: string
}

// Test data structure
interface Question {
	id: number
	question: string
	options: string[]
	correctAnswer: number
}

interface TestData {
	id: number
	text: string
	questions: Question[]
	mainQuestion: string
}

export const ReadingTest: React.FC<ReadingTestProps> = ({ testId, level }) => {
	const { data, isPending, error } = useReadingTests(testId)
	const [mounted, setMounted] = useState(false)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
	const [showResults, setShowResults] = useState(false)
	const [showCountdown, setShowCountdown] = useState(false) // Start as false
	const [testStarted, setTestStarted] = useState(false)
	if (error) {
		return <>error</>
	}
	// Handle hydration
	useEffect(() => {
		setMounted(true)
		setShowCountdown(true) // Set countdown after mount
	}, [])

	if (!mounted) {
		return (
			<Section>
				<Loader variant='ghost' title='Loading...' />
			</Section>
		)
	}

	if (isPending) {
		return (
			<Section>
				<BackLink href={`/readings/${level}`} text={`Back to ${level?.toUpperCase() || 'Level'}`} />
				<div className='animate-pulse'>
					{/* Timer skeleton */}
					<div className='mb-6 flex justify-center'>
						<div className='h-8 bg-gray-200 rounded w-20'></div>
					</div>

					{/* Reading test skeleton */}
					<div className='flex flex-col gap-8'>
						{[...Array(1)].map((_, i) => (
							<div key={i}>
								{/* Reading text skeleton */}
								<div className='bg-gray-50 p-6 rounded-xl mb-5'>
									{/* Author section */}
									<div className='flex items-center gap-3 mb-5'>
										<div className='w-6 h-6 bg-gray-200 rounded'></div>
										<div className='h-6 bg-gray-200 rounded w-24'></div>
									</div>

									{/* Problem header */}
									<div className='mb-5 flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<div className='bg-gray-300 rounded-md w-10 h-10'></div>
											<div className='h-6 bg-gray-200 rounded w-16'></div>
											<div className='h-6 bg-gray-200 rounded w-80 ml-5'></div>
										</div>
										<div className='h-6 bg-gray-200 rounded w-20'></div>
									</div>

									{/* Reading text lines */}
									<div className='space-y-3'>
										<div className='h-5 bg-gray-200 rounded w-full'></div>
										<div className='h-5 bg-gray-200 rounded w-11/12'></div>
										<div className='h-5 bg-gray-200 rounded w-full'></div>
										<div className='h-5 bg-gray-200 rounded w-10/12'></div>
										<div className='h-5 bg-gray-200 rounded w-full'></div>
										<div className='h-5 bg-gray-200 rounded w-9/12'></div>
									</div>
								</div>

								{/* Questions skeleton */}
								{[...Array(2)].map((_, qIndex) => (
									<div key={qIndex} className='p-6'>
										{/* Question title */}
										<div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>

										{/* Answer options */}
										<div className='space-y-3'>
											{[...Array(4)].map((_, oIndex) => (
												<div key={oIndex} className='w-full p-4 rounded-lg border border-gray-200'>
													<div className='flex items-center'>
														<div className='h-5 bg-gray-200 rounded w-6 mr-3'></div>
														<div className='h-5 bg-gray-200 rounded w-2/3'></div>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						))}
					</div>

					{/* Finish button skeleton */}
					<div className='mb-6 text-center'>
						<div className='h-12 bg-gray-200 rounded w-32 mx-auto'></div>
					</div>
				</div>
			</Section>
		)
	}

	// if (!n2TestData) {
	// 	return (
	// 		<Section>
	// 			<BackLink href={`/readings/${level}`} text={`Back to ${level?.toUpperCase() || 'Level'}`} />
	// 			<div className='text-center py-12'>
	// 				<div className='text-gray-400 text-lg'>Test not found</div>
	// 			</div>
	// 		</Section>
	// 	)
	// }

	const handleAnswerSelect = (testIndex: number, questionIndex: number, answerIndex: number) => {
		// Only allow answer selection after test has started
		if (!testStarted) {
			return
		}

		const newAnswers = [...selectedAnswers]
		const globalQuestionIndex = testIndex * 1000 + questionIndex // Create unique index
		newAnswers[globalQuestionIndex] = answerIndex
		setSelectedAnswers(newAnswers)
	}

	const handleCountdownComplete = () => {
		setShowCountdown(false)
		setTestStarted(true)
	}

	const calculateScore = () => {
		let correct = 0
		let totalQuestions = 0

		// n2TestData.forEach((test, testIndex) => {
		// 	test.questions.forEach((question, questionIndex) => {
		// 		const globalQuestionIndex = testIndex * 1000 + questionIndex
		// 		if (selectedAnswers[globalQuestionIndex] === question.correctAnswer) {
		// 			correct++
		// 		}
		// 		totalQuestions++
		// 	})
		// })

		return { correct, totalQuestions }
	}

	if (showResults) {
		const { correct, totalQuestions } = calculateScore()
		const percentage = Math.round((correct / totalQuestions) * 100)

		return (
			<Section>
				<BackLink href={`/readings/${level}`} text={`Back to ${level?.toUpperCase() || 'Level'}`} />
				<div className='text-center py-12'>
					<h1 className='text-3xl font-bold text-gray-900 mb-6'>Test Results</h1>
					<div className='bg-white rounded-xl p-8 mb-6'>
						<div className='text-6xl font-bold text-blue-600 mb-4'>{percentage}%</div>
						<p className='text-xl text-gray-700 mb-2'>
							You got {correct} out of {totalQuestions} questions correct
						</p>
						<div
							className={`inline-block px-4 py-2 rounded-full text-white font-medium ${
								percentage >= 80
									? 'bg-green-500'
									: percentage >= 60
										? 'bg-yellow-500'
										: 'bg-red-500'
							}`}
						>
							{percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good!' : 'Keep practicing!'}
						</div>
					</div>
					<button
						onClick={() => {
							setCurrentQuestion(0)
							setSelectedAnswers([])
							setShowResults(false)
							setTestStarted(false)
							setShowCountdown(true) // Restart countdown
						}}
						className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
					>
						Try Again
					</button>
				</div>
			</Section>
		)
	}
	return (
		<Section>
			<BackLink href={`/readings/${level}`} text={`Back to ${level?.toUpperCase() || 'Level'}`} />
			<Timer shouldStart={testStarted} />
			<CountdownModal isOpen={showCountdown} onComplete={handleCountdownComplete} />

			<div>
				<div className='flex flex-col gap-8'>
					{/* Reading Text */}
					{data.readingTests.length > 0
						? data.readingTests.map((test, index) => (
								<div key={test.id}>
									<div className='bg-gray-50 p-6 rounded-xl mb-5'>
										<div className='flex items-center gap-3 mb-5'>
											<User />
											<Badge variant={'outline'}>
												{typeof test.author === null ? 'Deleted Account' : test.author.userName}
											</Badge>
										</div>
										<div className='mb-5 flex items-center justify-between'>
											<div className='flex items-center gap-2 font-semibold '>
												<span className='bg-black rounded-md w-10 h-10'></span>
												問題 {index + 1}
												<span className='pl-5'>{test.mainQuestion}</span>
											</div>
											<span
												className={`
											px-3 py-1 text-sm font-semibold rounded-full 
											${
												test.difficulty === 'EASY'
													? 'bg-green-100 text-green-700'
													: test.difficulty === 'MEDIUM'
														? 'bg-yellow-100 text-yellow-700'
														: 'bg-red-100 text-red-700'
											}
											`}
											>
												{test.difficulty}
											</span>
										</div>

										<div className='text-gray-700 leading-relaxed whitespace-pre-line'>
											{test.text}
										</div>
									</div>

									{/* Question */}
									<div>
										{test.questions.map((item, questionIndex) => (
											<div key={item.id} className='p-6'>
												<h3 className='text-lg font-semibold text-gray-900 mb-4'>
													{item.question}
												</h3>
												<div className='space-y-3'>
													{item.options.map((variant, optionIndex) => {
														const globalQuestionIndex = index * 1000 + questionIndex
														return (
															<button
																key={variant}
																onClick={() =>
																	handleAnswerSelect(index, questionIndex, optionIndex)
																}
																disabled={!testStarted && showCountdown}
																className={`w-full p-4 text-left rounded-lg border transition-all ${
																	selectedAnswers[globalQuestionIndex] === optionIndex
																		? 'border-blue-500 bg-blue-50 text-blue-700'
																		: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
																} ${!testStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
															>
																<span className='font-medium mr-3'>{optionIndex + 1}.</span>
																{variant}
															</button>
														)
													})}
												</div>
											</div>
										))}
									</div>
								</div>
							))
						: 'xatolik 0 ta test !'}
				</div>
			</div>
			{testStarted && (
				<div className='mb-6 text-center'>
					<button
						onClick={() => setShowResults(true)}
						className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors'
					>
						Finish Test
					</button>
				</div>
			)}
		</Section>
	)
}
