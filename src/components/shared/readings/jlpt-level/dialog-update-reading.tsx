import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useReadingTests, useUpdateReadingTest } from '@/hooks/useReadings'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { toast } from 'sonner'

interface DialogUpdateReadingProps {
	trigger: ReactNode
	sectionId: string
	sectionTitle: string
}

interface QuestionData {
	id?: string
	question: string
	options: string[]
	correctAnswer: number
}

interface TestUpdateData {
	id: string
	text: string
	mainQuestion: string
	difficulty: 'EASY' | 'MEDIUM' | 'HARD'
	questions: QuestionData[]
}

export const DialogUpdateReading: React.FC<DialogUpdateReadingProps> = ({
	trigger,
	sectionId,
	sectionTitle,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [editingTestId, setEditingTestId] = useState<string | null>(null)
	const [editingTest, setEditingTest] = useState<TestUpdateData | null>(null)

	const { data, isPending: isLoadingTests } = useReadingTests(sectionId)
	const { mutate: updateTest, isPending: isUpdating } = useUpdateReadingTest()

	const handleEditTest = (test: any) => {
		setEditingTestId(test.id)
		setEditingTest({
			id: test.id,
			text: test.text,
			mainQuestion: test.mainQuestion,
			difficulty: test.difficulty,
			questions: test.questions.map((q: any) => ({
				id: q.id,
				question: q.question,
				options: q.options,
				correctAnswer: q.correctAnswer,
			})),
		})
	}

	const handleSaveTest = () => {
		if (!editingTest) return

		updateTest(
			{
				testId: editingTest.id,
				text: editingTest.text,
				mainQuestion: editingTest.mainQuestion,
				difficulty: editingTest.difficulty,
				questions: editingTest.questions,
			},
			{
				onSuccess: () => {
					setEditingTestId(null)
					setEditingTest(null)
					toast.success('Reading test updated successfully!')
				},
			}
		)
	}

	const handleCancelEdit = () => {
		setEditingTestId(null)
		setEditingTest(null)
	}

	const handleAddQuestion = () => {
		if (!editingTest) return

		setEditingTest({
			...editingTest,
			questions: [
				...editingTest.questions,
				{
					question: '',
					options: ['', '', '', ''],
					correctAnswer: 0,
				},
			],
		})
	}

	const handleRemoveQuestion = (questionIndex: number) => {
		if (!editingTest) return

		setEditingTest({
			...editingTest,
			questions: editingTest.questions.filter((_, index) => index !== questionIndex),
		})
	}

	const handleQuestionChange = (questionIndex: number, field: string, value: any) => {
		if (!editingTest) return

		const updatedQuestions = editingTest.questions.map((q, index) => {
			if (index === questionIndex) {
				return { ...q, [field]: value }
			}
			return q
		})

		setEditingTest({
			...editingTest,
			questions: updatedQuestions,
		})
	}

	const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
		if (!editingTest) return

		const updatedQuestions = editingTest.questions.map((q, index) => {
			if (index === questionIndex) {
				const updatedOptions = q.options.map((opt, optIdx) =>
					optIdx === optionIndex ? value : opt
				)
				return { ...q, options: updatedOptions }
			}
			return q
		})

		setEditingTest({
			...editingTest,
			questions: updatedQuestions,
		})
	}

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='sm:max-w-4xl max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Update Reading Tests</DialogTitle>
					<DialogDescription>Update reading tests in "{sectionTitle}" section</DialogDescription>
				</DialogHeader>

				{isLoadingTests ? (
					<div className='flex justify-center py-8'>
						<Loader2 className='h-8 w-8 animate-spin' />
					</div>
				) : (
					<div className='space-y-4 my-5'>
						{data?.readingTests && data.readingTests.length > 0 ? (
							data.readingTests.map((test: any, testIndex: number) => (
								<Card key={test.id} className='border-gray-200'>
									<CardHeader className='pb-3'>
										<div className='flex items-center justify-between'>
											<CardTitle className='text-lg'>Test {testIndex + 1}</CardTitle>
											<div className='flex items-center gap-2'>
												<Badge
													variant={
														test.difficulty === 'EASY'
															? 'secondary'
															: test.difficulty === 'MEDIUM'
																? 'default'
																: 'destructive'
													}
												>
													{test.difficulty}
												</Badge>
												{editingTestId === test.id ? (
													<div className='flex gap-2'>
														<Button size='sm' onClick={handleSaveTest} disabled={isUpdating}>
															{isUpdating ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Save'}
														</Button>
														<Button size='sm' variant='outline' onClick={handleCancelEdit}>
															Cancel
														</Button>
													</div>
												) : (
													<Button size='sm' variant='outline' onClick={() => handleEditTest(test)}>
														Edit
													</Button>
												)}
											</div>
										</div>
									</CardHeader>
									<CardContent>
										{editingTestId === test.id && editingTest ? (
											<div className='space-y-4'>
												{/* Main Question */}
												<div>
													<Label>Main Question</Label>
													<Input
														value={editingTest.mainQuestion}
														onChange={e =>
															setEditingTest({
																...editingTest,
																mainQuestion: e.target.value,
															})
														}
														placeholder='Enter main question'
													/>
												</div>

												{/* Difficulty */}
												<div>
													<Label>Difficulty</Label>
													<Select
														value={editingTest.difficulty}
														onValueChange={(value: 'EASY' | 'MEDIUM' | 'HARD') =>
															setEditingTest({ ...editingTest, difficulty: value })
														}
													>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value='EASY'>Easy</SelectItem>
															<SelectItem value='MEDIUM'>Medium</SelectItem>
															<SelectItem value='HARD'>Hard</SelectItem>
														</SelectContent>
													</Select>
												</div>

												{/* Reading Text */}
												<div>
													<Label>Reading Text</Label>
													<Textarea
														value={editingTest.text}
														onChange={e =>
															setEditingTest({
																...editingTest,
																text: e.target.value,
															})
														}
														placeholder='Enter reading text'
														rows={6}
													/>
												</div>

												{/* Questions */}
												<div>
													<div className='flex items-center justify-between mb-3'>
														<Label>Questions</Label>
														<Button
															type='button'
															size='sm'
															variant='outline'
															onClick={handleAddQuestion}
														>
															<Plus className='h-4 w-4 mr-1' />
															Add Question
														</Button>
													</div>

													{editingTest.questions.map((question, qIndex) => (
														<Card key={qIndex} className='mb-3'>
															<CardContent className='pt-4'>
																<div className='space-y-3'>
																	<div className='flex items-center justify-between'>
																		<Label>Question {qIndex + 1}</Label>
																		{editingTest.questions.length > 1 && (
																			<Button
																				type='button'
																				size='sm'
																				variant='ghost'
																				onClick={() => handleRemoveQuestion(qIndex)}
																			>
																				<Trash2 className='h-4 w-4' />
																			</Button>
																		)}
																	</div>

																	<Input
																		value={question.question}
																		onChange={e =>
																			handleQuestionChange(qIndex, 'question', e.target.value)
																		}
																		placeholder='Enter question'
																	/>

																	<div className='grid grid-cols-2 gap-2'>
																		{question.options.map((option, oIndex) => (
																			<div key={oIndex} className='flex items-center gap-2'>
																				<input
																					type='radio'
																					name={`correct-${qIndex}`}
																					checked={question.correctAnswer === oIndex}
																					onChange={() =>
																						handleQuestionChange(qIndex, 'correctAnswer', oIndex)
																					}
																				/>
																				<Input
																					value={option}
																					onChange={e =>
																						handleOptionChange(qIndex, oIndex, e.target.value)
																					}
																					placeholder={`Option ${oIndex + 1}`}
																				/>
																			</div>
																		))}
																	</div>
																</div>
															</CardContent>
														</Card>
													))}
												</div>
											</div>
										) : (
											<div className='space-y-3'>
												<p>
													<strong>Main Question:</strong> {test.mainQuestion}
												</p>
												<p>
													<strong>Text:</strong> {test.text.substring(0, 150)}...
												</p>
												<p>
													<strong>Questions:</strong> {test.questions.length}
												</p>
												<p>
													<strong>Author:</strong> {test.author?.userName || 'Unknown'}
												</p>
											</div>
										)}
									</CardContent>
								</Card>
							))
						) : (
							<div className='text-center py-8 text-gray-500'>
								No reading tests found in this section
							</div>
						)}
					</div>
				)}

				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
