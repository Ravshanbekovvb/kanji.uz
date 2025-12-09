'use client'

import { PageTitle } from '@/components/shared/title'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Download, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const books = [
	{
		bookUrl: '/books/N1-chokuzen-taisaku.pdf',
		description:
			'直前対策は、JLPT N1試験の直前に最適な対策本です。豊富な練習問題と模擬試験を通じて、試験の形式に慣れ、自信を持って本番に臨むことができます。',
		image: '/books/books-image/n1-chokuzen-image.png',
		title: '直前対策',
		jlptLevel: 'N1',
	},
	{
		bookUrl: '/books/N2-chokuzen-taisaku.pdf',
		description:
			'直前対策は、JLPT N2試験の直前に最適な対策本です。豊富な練習問題と模擬試験を通じて、試験の形式に慣れ、自信を持って本番に臨むことができます。',
		image: '/books/books-image/n2-chokuzen-image.png',
		title: '直前対策',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N3-chokuzen-taisaku.pdf',
		description:
			'直前対策は、JLPT N3試験の直前に最適な対策本です。豊富な練習問題と模擬試験を通じて、試験の形式に慣れ、自信を持って本番に臨むことができます。',
		image: '/books/books-image/n3-chokuzen-image.png',
		title: '直前対策',
		jlptLevel: 'N3',
	},
	{
		bookUrl: '/books/N4-chokuzen-taisaku.pdf',
		description:
			'直前対策は、JLPT N4試験の直前に最適な対策本です。豊富な練習問題と模擬試験を通じて、試験の形式に慣れ、自信を持って本番に臨むことができます。',
		image: '/books/books-image/n4-chokuzen-image.png',
		title: '直前対策',
		jlptLevel: 'N4',
	},
	{
		bookUrl: '/books/N5-chokuzen-taisaku.pdf',
		description:
			'直前対策は、JLPT N5試験の直前に最適な対策本です。豊富な練習問題と模擬試験を通じて、試験の形式に慣れ、自信を持って本番に臨むことができます。',
		image: '/books/books-image/n5-chokuzen-image.png',
		title: '直前対策',
		jlptLevel: 'N5',
	},
	{
		bookUrl: '/books/N2-shinkanzen-dokkai.pdf',
		description:
			'新完全読解は、JLPT N2試験の読解セクションに特化した対策本です。多様な文章と練習問題を通じて、読解力を向上させ、試験で高得点を狙うことができます。',
		image: '/books/books-image/n2-shinkanzen-dokkai-image.png',
		title: '新完全読解',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N3-shinkanzen-dokkai.pdf',
		description:
			'新完全読解は、JLPT N3試験の読解セクションに特化した対策本です。多様な文章と練習問題を通じて、読解力を向上させ、試験で高得点を狙うことができます。',
		image: '/books/books-image/n3-shinkanzen-dokkai-image.png',
		title: '新完全読解',
		jlptLevel: 'N3',
	},
	{
		bookUrl: '/books/N3-speed-master-dokkai.pdf',
		description:
			'スピードマスター読解は、JLPT N3試験の読解セクションに特化した対策本です。スピードと正確さを重視した練習問題を通じて、効率的な読解力を養い、試験でのパフォーマンスを向上させます。',
		image: '/books/books-image/n3-speed-master-dokkai-image.png',
		title: 'スピードマスター読解',
		jlptLevel: 'N3',
	},
	{
		bookUrl: '/books/N2-kanji.pdf',
		description:
			'スピードマスター漢字は、JLPT N2試験の漢字セクションに特化した対策本です。漢字の読み書きや意味を効率的に学び、試験でのパフォーマンスを向上させます。',
		image: '/books/books-image/n2-kanji-image.png',
		title: 'スピードマスター漢字',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/hajimete-no-nihongo-nouryoku-shiken-n2-tango-2500-tests.pdf',
		description:
			'はじめての日本語能力試験N2単語2500は、JLPT N2試験に必要な2500語の単語を網羅した対策本です。豊富な例文と練習問題を通じて、語彙力を強化し、試験での成功をサポートします。',
		image: '/books/books-image/hajimete-no-nihongo-nouryoku-shiken-n2-tango-2500-tests-image.png',
		title: '漢字 TEST 2500',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N2-shinkanzen-bunpou.pdf',
		description:
			'新完全文法は、JLPT N2試験に必要な文法を網羅した対策本です。豊富な例文と練習問題を通じて、文法力を強化し、試験での成功をサポートします。',
		image: '/books/books-image/n2-shinkanzen-bunpou-image.png',
		title: '新完全文法',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N2-words.pdf',
		description:
			'スピードマスター単語は、JLPT N2試験の語彙セクションに特化した対策本です。効率的に単語を学び、試験でのパフォーマンスを向上させます。',
		image: '/books/books-image/n2-words-image.png',
		title: '単語',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N2-shinkanzen-chyokkai.pdf',
		description:
			'新完全聴解は、JLPT N2試験の聴解セクションに特化した対策本です。多様な音声素材と練習問題を通じて、聴解力を向上させ、試験で高得点を狙うことができます。',
		image: '/books/books-image/n2-shinkanzen-chyokkai-image.png',
		title: '新完全聴解',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N2-jlpt-grammar.pdf',
		description:
			'JLPT文法は、JLPT N2試験に必要な文法を網羅した対策本です。豊富な例文と練習問題を通じて、文法力を強化し、試験での成功をサポートします。',
		image: '/books/books-image/n2-jlpt-grammar-image.png',
		title: 'JLPT文法',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N2-test.pdf',
		description:
			'模擬試験は、JLPT N2試験の形式に慣れるための対策本です。実際の試験に近い問題構成で、時間配分や解答戦略を練習し、本番でのパフォーマンスを最大限に引き出します。',
		image: '/books/books-image/n2-test-image.png',
		title: '模擬試験',
		jlptLevel: 'N2',
	},
	{
		bookUrl: '/books/N3-topics.pdf',
		description:
			'トピックスは、JLPT N3試験の語彙と表現に特化した対策本です。日常生活や社会的なテーマに関連する語彙を学び、試験での理解力と表現力を向上させます。',
		image: '/books/books-image/n3-topics-image.png',
		title: 'トピックス',
		jlptLevel: 'N3',
	},
]

const jlptLevels = ['All', 'N1', 'N2', 'N3', 'N4', 'N5'] as const

export default function Page() {
	const [selectedLevel, setSelectedLevel] = useState<string>('All')

	const filteredBooks =
		selectedLevel === 'All' ? books : books.filter(book => book.jlptLevel === selectedLevel)

	return (
		<Section>
			<div className='container mx-auto'>
				<div className='flex items-center justify-between mb-5 flex-wrap gap-4'>
					<PageTitle title='Books' />

					<div className='flex gap-2 flex-wrap'>
						{jlptLevels.map(level => (
							<Button
								key={level}
								variant={selectedLevel === level ? 'secondary' : 'outline'}
								size='sm'
								onClick={() => setSelectedLevel(level)}
								className='min-w-[60px]'
							>
								{level}
							</Button>
						))}
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{filteredBooks.map((book, index) => (
						<div
							key={index}
							className='border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-card'
						>
							<div className='relative w-full h-64'>
								<Image src={book.image} alt={book.title} fill className='object-contain' />
							</div>

							<div className='p-4 space-y-3'>
								<div className='flex items-center justify-between'>
									<h2 className='text-xl font-semibold'>{book.title}</h2>
									<Badge
										variant={
											book.jlptLevel === 'N1'
												? 'n1'
												: book.jlptLevel === 'N2'
													? 'n2'
													: book.jlptLevel === 'N3'
														? 'n3'
														: book.jlptLevel === 'N4'
															? 'n4'
															: book.jlptLevel === 'N5'
																? 'n5'
																: 'default'
										}
									>
										{book.jlptLevel}
									</Badge>
								</div>
								<p className='text-sm text-muted-foreground line-clamp-3'>{book.description}</p>

								<div className='flex pt-2 items-center flex-wrap gap-2 justify-center'>
									<Button asChild variant='outline' size='sm' className='w-full'>
										<Link href={book.bookUrl} target='_blank' rel='noopener noreferrer'>
											<Eye className='size-4' />
											Preview
										</Link>
									</Button>

									<Button asChild variant='default' size='sm' className='w-full'>
										<a href={book.bookUrl} download>
											<Download className='size-4' />
											Download
										</a>
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	)
}
