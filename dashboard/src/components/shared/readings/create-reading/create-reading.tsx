'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Section } from '@/components/ui/section'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/contexts/auth-context'
import {
	useAddReadingToSection,
	useCreateReadingSectionWithReadingTests,
	useReadingSections,
} from '@/hooks/useReadings'
import { useStore } from '@/store/store'
import { CreateQuestion, CreateTest } from '@/types/types'
import { EllipsisVertical, Pen, Plus, RefreshCcw, Trash2 } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { BackLink } from '../../back-link'
import { Loader } from '../../loader'
import { PageTitle } from '../../title'
import { DialogUpdateTitle } from '../jlpt-level/dialog-update-title'

export const CreateReading: React.FC = () => {
	const { isAddingReading, setAddingReading } = useStore()
	const { user } = useAuth()
	const { data: readingSectionTitles } = useReadingSections()
	const {
		mutate: createReadingSectionWithReadingTests,
		isPending,
		error,
	} = useCreateReadingSectionWithReadingTests()

	const { mutate: addReadingToSection, isPending: isPendingAddReading } = useAddReadingToSection()

	const [selectedTitle, setSelectedTitle] = useState('')
	const [isCustomTitle, setIsCustomTitle] = useState(false)
	const [jlptLevel, setJlptLevel] = useState('')

	const [tests, setTests] = useState<CreateTest[]>([
		{
			text: '',
			difficulty: 'EASY',
			authorId: user?.id || '',
			mainQuestion: '',
			questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }],
		},
	])

	// 🔧 yangi test (dokkalarning) qo'shilishi
	const addTest = () => {
		setTests(prev => [
			...prev,
			{
				text: '',
				difficulty: 'EASY',
				mainQuestion: '',
				questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }],
				authorId: user?.id || '',
			},
		])
	}

	// ❌ testni o‘chirish
	const removeTest = (index: number) => {
		setTests(prev => prev.filter((_, i) => i !== index))
	}

	// 📝 test maydonini yangilash
	const updateTestField = (index: number, field: keyof CreateTest, value: any) => {
		setTests(prev => {
			const updated = [...prev]
			updated[index] = { ...updated[index], [field]: value }
			return updated
		})
	}

	// 🔄 savollarni yangilash
	const updateQuestion = (
		testIndex: number,
		qIndex: number,
		field: keyof CreateQuestion,
		value: any
	) => {
		setTests(prev => {
			const updated = [...prev]
			const test = updated[testIndex]
			const newQuestions = [...test.questions]
			newQuestions[qIndex] = { ...newQuestions[qIndex], [field]: value }
			updated[testIndex] = { ...test, questions: newQuestions }
			return updated
		})
	}

	// ➕ yangi savol qo'shish
	const addQuestion = (testIndex: number) => {
		setTests(prev => {
			const updated = [...prev]
			updated[testIndex].questions.push({
				question: '',
				options: ['', '', '', ''],
				correctAnswer: 0,
			})
			return updated
		})
	}

	// ❌ savolni o‘chirish
	const removeQuestion = (testIndex: number, qIndex: number) => {
		setTests(prev => {
			const updated = [...prev]
			updated[testIndex].questions = updated[testIndex].questions.filter((_, i) => i !== qIndex)
			return updated
		})
	}

	// ➕ variant qo‘shish
	const addOption = (testIndex: number, qIndex: number) => {
		setTests(prev => {
			const updated = [...prev]
			const opts = [...updated[testIndex].questions[qIndex].options, '']
			updated[testIndex].questions[qIndex].options = opts
			return updated
		})
	}

	// ❌ variant o'chirish
	const removeOption = (testIndex: number, qIndex: number, optIndex: number) => {
		setTests(prev => {
			const updated = [...prev]
			const opts = updated[testIndex].questions[qIndex].options.filter((_, i) => i !== optIndex)
			let correct = updated[testIndex].questions[qIndex].correctAnswer
			if (correct !== null && correct >= opts.length) correct = 0
			updated[testIndex].questions[qIndex] = {
				...updated[testIndex].questions[qIndex],
				options: opts,
				correctAnswer: correct,
			}
			return updated
		})
	}

	// 🧾 form submit
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Basic validation
		if (!selectedTitle.trim() && isAddingReading.title === null) {
			toast.error('Please enter a section title')
			return
		}

		if (!jlptLevel && isAddingReading.jlptLevel === null) {
			toast.error('Please select a JLPT level')
			return
		}

		if (tests.length === 0) {
			toast.error('Please add at least one reading test')
			return
		}

		// Check if all tests have required fields
		for (let i = 0; i < tests.length; i++) {
			const test = tests[i]
			if (!test.text.trim()) {
				toast.error(`Please enter text for reading ${i + 1}`)
				return
			}

			if (test.questions.length === 0) {
				toast.error(`Please add at least one question for reading ${i + 1}`)
				return
			}

			for (let j = 0; j < test.questions.length; j++) {
				const question = test.questions[j]
				if (!question.question.trim()) {
					toast.error(`Please enter question text for reading ${i + 1}, question ${j + 1}`)
					return
				}

				if (question.options.some(opt => !opt.trim())) {
					toast.error(`Please fill all options for reading ${i + 1}, question ${j + 1}`)
					return
				}

				if (question.options.length < 2) {
					toast.error(`Please add at least 2 options for reading ${i + 1}, question ${j + 1}`)
					return
				}
			}
		}

		// Tests are already in the correct format without IDs
		const final = {
			jlptLevel: jlptLevel as 'N1' | 'N2' | 'N3' | 'N4' | 'N5',
			title: selectedTitle,
			readingTests: tests, // No need to map and remove IDs anymore
		}

		console.log(final)

		// Agar existing section ga qo'shilayotgan bo'lsa
		if (isAddingReading.id && tests.length === 1 && typeof user?.id === 'string') {
			const readingData = {
				text: tests[0].text,
				difficulty: tests[0].difficulty,
				mainQuestion: tests[0].mainQuestion,
				authorId: tests[0].authorId,
				questions: tests[0].questions,
			}

			addReadingToSection(
				{
					sectionId: isAddingReading.id,
					readingData,
				},
				{
					onSuccess: () => {
						toast.success('Reading added to section successfully!')
						// Reset form
						setSelectedTitle('')
						setIsCustomTitle(false)
						setAddingReading(null, null, null)
						setJlptLevel('')
						setTests([
							{
								text: '',
								difficulty: 'EASY',
								authorId: user.id,
								mainQuestion: '',
								questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }],
							},
						])
					},
					onError: err => {
						console.log(err)
						toast.error(err.message)
					},
				}
			)
		} else {
			// Yangi section yaratish
			createReadingSectionWithReadingTests(final, {
				onSuccess: () => {
					toast.success('Reading Test created successfully!')
					// Reset form
					setSelectedTitle('')
					setIsCustomTitle(false)
					setJlptLevel('')
					setTests([
						{
							text: '',
							difficulty: 'EASY',
							authorId: user?.id || '',
							mainQuestion: '',
							questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }],
						},
					])
				},
				onError: err => {
					console.log(err)
					toast.error(err.message)
				},
			})
		}
	}
	console.log(typeof isAddingReading.title)

	return (
		<Section>
			<BackLink href='/readings' text='Back to Readings' />
			<div className='flex items-center justify-between'>
				<PageTitle
					title={
						typeof isAddingReading.title === 'string'
							? isAddingReading.title
							: 'Create Reading Section'
					}
					className='mb-3'
				/>
				{typeof isAddingReading.id === 'string' && typeof isAddingReading.title === 'string' ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline'>
								<EllipsisVertical />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='end'>
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={() => {
										setAddingReading(null, null, null)
										toast.success('Current adding reading has been cleaned!')
									}}
								>
									Refresh
									<DropdownMenuShortcut>
										<RefreshCcw />
									</DropdownMenuShortcut>
								</DropdownMenuItem>

								<DialogUpdateTitle
									trigger={
										<DropdownMenuItem onSelect={e => e.preventDefault()} className='cursor-pointer'>
											Update title
											<DropdownMenuShortcut>
												<Pen />
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									}
									data={isAddingReading.title}
									id={isAddingReading.id}
								/>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					''
				)}
			</div>
			<p className='mb-3'>
				{typeof isAddingReading.id === 'string' ? (
					<span className='text-gray-400'>
						Hozir siz bor reading secitonga reading qo`shayabsiz{' '}
						<span className='text-blue-500'>{isAddingReading.title}</span>
					</span>
				) : (
					''
				)}
			</p>
			<form onSubmit={handleSubmit} className='space-y-8'>
				{/* SECTION TITLE */}
				<div className='flex items-center w-full gap-5'>
					<div className='w-full'>
						<label className='text-sm font-medium text-gray-700'>Author</label>
						<Input disabled defaultValue={user?.userName || 'TEACHER'} />
					</div>
					<div>
						<label className='text-sm font-medium text-gray-700'>Section Title</label>
						{typeof isAddingReading.title === 'string' ? (
							<Input type='text' value={isAddingReading.title} disabled />
						) : (
							// ):
							// ) : !isCustomTitle ? (
							// 	<Select
							// 		onValueChange={val => {
							// 			if (val === 'custom') {
							// 				setIsCustomTitle(true)
							// 				setSelectedTitle('')
							// 			} else {
							// 				const selectedSection = readingSectionTitles?.find(t => t.id === val)
							// 				setSelectedTitle(selectedSection?.title || val)
							// 			}
							// 		}}
							// 	>
							// 		<SelectTrigger>
							// 			<SelectValue placeholder='Select or create section title' />
							// 		</SelectTrigger>
							// 		<SelectContent className='w-full'>
							// 			{/* {readingSectionTitles &&
							// 				readingSectionTitles.length > 0 &&
							// 				readingSectionTitles.map((t, i) => (
							// 					<SelectItem key={i} value={t.id}>
							// 						{t.title}
							// 					</SelectItem>
							// 				))} */}
							// 			<SelectItem value='custom'>+ New Title...</SelectItem>
							// 		</SelectContent>
							// 	</Select>
							<div className='flex items-center gap-2 w-[520px]'>
								<Input
									value={selectedTitle}
									onChange={e => setSelectedTitle(e.target.value)}
									placeholder='Enter new section title...'
									className='w-full'
								/>
								{/* <Button type='button' variant='outline' onClick={() => setIsCustomTitle(false)}>
									Cancel
								</Button> */}
							</div>
						)}
					</div>
					<div>
						<label className='text-sm font-medium text-gray-700 whitespace-nowrap'>
							JLPT Level
						</label>
						<Select
							onValueChange={setJlptLevel}
							value={jlptLevel}
							defaultValue={
								typeof isAddingReading.jlptLevel === 'string' ? isAddingReading.jlptLevel : ''
							}
							disabled={typeof isAddingReading.jlptLevel === 'string'}
						>
							<SelectTrigger className='w-auto'>
								<SelectValue
									placeholder={
										typeof isAddingReading.jlptLevel === 'string'
											? isAddingReading.jlptLevel
											: 'jlpt level'
									}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='N1'>N1</SelectItem>
								<SelectItem value='N2'>N2</SelectItem>
								<SelectItem value='N3'>N3</SelectItem>
								<SelectItem value='N4'>N4</SelectItem>
								<SelectItem value='N5'>N5</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* TESTS */}
				<div className='space-y-6'>
					<h2 className='text-lg font-semibold text-gray-800'>Readings ({tests.length})</h2>
					{tests.map((test, tIndex) => (
						<Card key={tIndex}>
							<CardContent className='pt-4 space-y-4 relative'>
								{/* delete button */}
								<button
									type='button'
									onClick={() => removeTest(tIndex)}
									className='absolute top-3 right-3 text-gray-400 hover:text-red-500'
								>
									<Trash2 size={18} />
								</button>
								{/* main question */}
								<div>
									<label className='text-sm font-medium'>Main question</label>
									<Input
										value={test.mainQuestion}
										type='text'
										placeholder='Enter main question...'
										onChange={e => updateTestField(tIndex, 'mainQuestion', e.target.value)}
									/>
								</div>
								{/* reading text */}
								<div>
									<Badge variant={'outline'} className='absolute top-0 left-0'>
										{tIndex + 1}
									</Badge>

									<label className='text-sm font-medium'>Reading Text</label>
									<textarea
										className='w-full border rounded-md p-2 min-h-[120px] focus:ring-2 focus:ring-primary'
										value={test.text}
										onChange={e => updateTestField(tIndex, 'text', e.target.value)}
										placeholder='Enter reading text...'
									/>
								</div>

								{/* difficulty */}
								<div>
									<label className='text-sm font-medium'>Difficulty Level</label>
									<Select
										onValueChange={val => updateTestField(tIndex, 'difficulty', val)}
										value={test.difficulty}
									>
										<SelectTrigger>
											<SelectValue placeholder='Select level' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='EASY'>Easy</SelectItem>
											<SelectItem value='MEDIUM'>Medium</SelectItem>
											<SelectItem value='HARD'>Hard</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* questions */}
								<div className='space-y-3'>
									<h3 className='font-semibold text-gray-700 text-sm'>Questions</h3>
									{test.questions.map((q, qIndex) => (
										<Card key={qIndex} className='border-gray-200'>
											<CardContent className='pt-4 space-y-3 relative'>
												<button
													type='button'
													onClick={() => removeQuestion(tIndex, qIndex)}
													className='absolute top-2 right-2 text-gray-400 hover:text-red-500'
												>
													<Trash2 size={16} />
												</button>

												<Input
													value={q.question}
													onChange={e => updateQuestion(tIndex, qIndex, 'question', e.target.value)}
													placeholder='Enter question text...'
												/>

												{/* options */}
												<div className='space-y-2'>
													{q.options.map((opt, i) => (
														<div key={i} className='flex items-center gap-2'>
															<Input
																value={opt}
																onChange={e =>
																	updateQuestion(
																		tIndex,
																		qIndex,
																		'options',
																		q.options.map((o, oi) => (oi === i ? e.target.value : o))
																	)
																}
																placeholder={`Option ${i + 1}`}
															/>
															<Button
																type='button'
																variant='ghost'
																size='icon'
																onClick={() => removeOption(tIndex, qIndex, i)}
																disabled={q.options.length <= 2}
															>
																<Trash2 size={14} className='text-gray-400' />
															</Button>
														</div>
													))}
													<Button
														type='button'
														variant='outline'
														size='sm'
														onClick={() => addOption(tIndex, qIndex)}
													>
														<Plus size={14} className='mr-1' />
														Add Option
													</Button>
												</div>

												{/* correct answer */}
												<div>
													<label className='text-sm font-medium'>Correct Answer</label>
													<Select
														onValueChange={val =>
															updateQuestion(tIndex, qIndex, 'correctAnswer', Number(val))
														}
														value={
															q.correctAnswer !== null ? q.correctAnswer.toString() : undefined
														}
													>
														<SelectTrigger>
															<SelectValue placeholder='Select correct option' />
														</SelectTrigger>
														<SelectContent>
															{q.options.map((_, i) => (
																<SelectItem key={i} value={i.toString()}>
																	Option {i + 1}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											</CardContent>
										</Card>
									))}
									<Button type='button' variant='outline' onClick={() => addQuestion(tIndex)}>
										<Plus size={14} className='mr-1' /> Add Question
									</Button>
								</div>
							</CardContent>
						</Card>
					))}

					<Button type='button' variant='outline' onClick={addTest}>
						<Plus size={16} className='mr-1' /> Add New Reading
					</Button>
				</div>

				{/* submit */}
				<div className='pt-6'>
					{isPending || isPendingAddReading ? (
						<Loader title='creating...' className='w-full' />
					) : (
						<Button type='submit' className='w-full'>
							{typeof isAddingReading.title === 'string'
								? 'Add Reading to Section'
								: 'Create New Section'}
						</Button>
					)}
				</div>
			</form>
		</Section>
	)
}
