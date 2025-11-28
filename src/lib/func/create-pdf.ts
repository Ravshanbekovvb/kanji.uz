import jsPDF from 'jspdf'

type Props = {
	word: string
	translation?: boolean
	transcription?: boolean
	example?: boolean
}

export const setTextSize = ({ word, translation, transcription, example }: Props): string => {
	const length = word.length

	if (translation) {
		if (length > 60) return 'text-[9px]'
		if (length > 50) return 'text-[10px]'
		if (length > 40) return 'text-[12px]'
		if (length > 35) return 'text-[13px]'
		if (length > 30) return 'text-[12px]'
		if (length > 24) return 'text-[13px]'
		if (length > 20) return 'text-[14px]'
		if (length > 16) return 'text-[16px]'
		if (length > 12) return 'text-[18px]'
		if (length > 10) return 'text-[20px]'
		if (length > 8) return 'text-[22px]'
		if (length > 6) return 'text-[24px]'
		if (length > 4) return 'text-[28px]'
		return 'text-[40px]'
	}

	if (transcription) {
		if (length === 1) return 'text-[38px]'
		if (length === 2) return 'text-[35px]'
		if (length <= 6) return 'text-[26px]'
		if (length <= 10) return 'text-[20px]'
		if (length <= 13) return 'text-[18px]'
		if (length <= 15) return 'text-[16px]'
		if (length <= 17) return 'text-[14px]'
		if (length <= 20) return 'text-[12px]'
		return 'text-[10px]'
	}

	if (example) {
		if (length > 20) return 'text-[12px]'
		if (length > 18) return 'text-[14px]'
		if (length > 16) return 'text-[16px]'
		if (length > 14) return 'text-[18px]'
		if (length > 12) return 'text-[20px]'
		if (length > 10) return 'text-[20px]'
		if (length > 8) return 'text-[22px]'
		if (length > 6) return 'text-[24px]'
		return 'text-[25px]'
	}

	if (length === 1) return 'text-[105px]'
	if (length === 2) return 'text-[100px]'
	if (length === 3) return 'text-[95px]'
	if (length === 4) return 'text-[85px]'
	if (length === 5) return 'text-[70px] pt-2'
	if (length === 6) return 'text-[55px] pt-5'
	if (length === 7) return 'text-[50px] pt-7'
	if (length === 8) return 'text-[44px] pt-7'
	if (length === 9) return 'text-[39px] pt-8'
	if (length === 10) return 'text-[35px] pt-9'
	if (length === 11) return 'text-[30px] pt-10'
	if (length === 12) return 'text-[28px] pt-11'
	if (length <= 14) return 'text-[25px] pt-11'
	if (length === 15) return 'text-[23px] pt-12'
	if (length === 16) return 'text-[21px] pt-13'
	if (length === 17) return 'text-[20px] pt-12'
	if (length === 18) return 'text-[19px] pt-12'
	if (length === 19) return 'text-[18px] pt-13'
	if (length === 20) return 'text-[17px] pt-13'
	return 'text-[15px] pt-13'
}

export const setKanjiTextSize = (kanji: string) => {
	const length = kanji.length
	const result =
		length === 1
			? 50
			: length === 2
				? 48
				: length === 3
					? 46
					: length === 4
						? 44
						: length === 5
							? 40
							: length === 6
								? 32
								: length === 7
									? 28
									: length === 8
										? 25
										: length === 9
											? 22
											: length === 10
												? 18
												: length === 11
													? 18
													: length === 12
														? 16
														: length === 13
															? 15
															: length === 14
																? 13
																: length === 15
																	? 12
																	: length === 16
																		? 11
																		: 10
	return result
}

export const setTranscriptionTextSize = (reading: string) => {
	const length = reading.length
	if (length <= 2) return 22
	if (length <= 4) return 21
	if (length <= 5) return 20
	if (length <= 6) return 19
	if (length <= 7) return 18
	if (length <= 8) return 17
	if (length <= 9) return 16
	if (length <= 10) return 15
	if (length <= 11) return 14
	if (length <= 12) return 13
	if (length <= 13) return 12
	if (length <= 14) return 11
	if (length <= 15) return 10
	if (length <= 16) return 7
	return 10
}

export const setRomajiTextSize = (reading: string) => {
	const length = reading.length
	if (length <= 2) return 45
	if (length <= 4) return 42
	if (length <= 5) return 35
	if (length <= 6) return 30
	if (length <= 7) return 28
	if (length <= 8) return 25
	if (length <= 9) return 23
	if (length <= 10) return 22
	if (length <= 11) return 20
	if (length <= 12) return 18
	if (length <= 13) return 16
	if (length <= 14) return 15
	if (length <= 15) return 14
	if (length <= 16) return 13
	return 12
}

export const setExampleTextSize = (reading: string) => {
	const length = reading.length
	if (length <= 2) return 22
	if (length <= 4) return 21
	if (length <= 5) return 20
	if (length <= 6) return 19
	if (length <= 7) return 18
	if (length <= 8) return 17
	if (length <= 9) return 16
	if (length <= 10) return 15
	if (length <= 11) return 14
	if (length <= 12) return 13
	if (length <= 13) return 12
	if (length <= 14) return 11
	if (length <= 15) return 10
	if (length <= 20) return 8
	if (length <= 30) return 7
	if (length <= 40) return 6
	return 5
}

// Uzun textni ikki qatorga bo'lish funksiyasi
export const splitTextIntoLines = (text: string, maxLength: number = 25): string[] => {
	if (text.length <= maxLength) {
		return [text]
	}

	// Agar text juda uzun bo'lsa, kesib qisqartirish
	if (text.length > maxLength * 2.2) {
		text = text.substring(0, Math.floor(maxLength * 2.2) - 3) + '...'
	}

	// So'zlarni bo'lib olish
	const words = text.split(' ')
	const lines: string[] = []
	let currentLine = ''

	for (const word of words) {
		// Agar joriy qator + yangi so'z maksimal uzunlikdan oshsa
		if ((currentLine + ' ' + word).length > maxLength && currentLine !== '') {
			lines.push(currentLine.trim())
			currentLine = word
		} else {
			currentLine = currentLine ? currentLine + ' ' + word : word
		}
	}

	// Oxirgi qatorni qo'shish
	if (currentLine) {
		lines.push(currentLine.trim())
	}

	// Maksimal 2 qator qaytarish va har birini kichraytirish
	return lines.slice(0, 2)
}
function splitByLength(text: string, maxLength: number): string[] {
	const result: string[] = []
	for (let i = 0; i < text.length; i += maxLength) {
		result.push(text.slice(i, i + maxLength))
	}
	return result
}
interface Word {
	kanji: string
	translation: string
	transcription: string
	example: string
	jlptLevel: string
}

interface createPdf {
	words: Word[]
	title: string
	type?: 'table' | 'card'
}

export function createPdf({ words, title, type = 'card' }: createPdf) {
	const doc = new jsPDF({
		orientation: type === 'card' ? 'landscape' : 'portrait',
		unit: 'cm',
		format: 'a4',
	})

	// FONT
	doc.addFont('/fonts/NotoSansJP-Medium.ttf', 'NotoSansJP', 'normal')
	doc.addFont('/fonts/NotoSansJP-Thin.ttf', 'NotoSansJP-Thin', 'normal')

	doc.setLineWidth(1 / 20)

	if (type === 'table') {
		createTableFormat(doc, words, title)
	} else {
		createCardFormat(doc, words, title)
	}

	doc.save(`${title}_${words.length}_words.pdf`)

	return 'PDF muvaffaqiyatli yaratildi!'
}

function createTableFormat(doc: jsPDF, words: Word[], title: string) {
	const wordsPerPage = 20 // har sahifada 15 ta so'z (ikki qatorli example uchun yanada kamaytirildi)
	const totalPages = Math.ceil(words.length / wordsPerPage)

	for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
		if (pageIndex > 0) {
			doc.addPage('l')
		}

		const startIndex = pageIndex * wordsPerPage
		const endIndex = Math.min(startIndex + wordsPerPage, words.length)
		const pageWords = words.slice(startIndex, endIndex)

		// Sarlavha
		doc.setFontSize(14)
		doc.setFont('NotoSansJP-Thin')
		doc.text(`${title}`, 1, 1, {
			align: 'left',
		})

		// Jadval sarlavhalari
		doc.setFontSize(10)
		const headers = ['#', 'Kanji', 'Translation', 'Transcription', 'Example', 'JLPT']
		const colWidths = [1, 2.5, 4, 3, 7.5, 1]
		let x = 1
		let y = 1.5

		doc.setLineWidth(0.000000001) // yupqaroq chiziq

		// Sarlavhalar
		headers.forEach((header, i) => {
			doc.setFont('NotoSansJP-Thin', 'bold')
			doc.rect(x, y, colWidths[i], 1) // F - filled (background)
			doc.text(header, x + colWidths[i] / 2, y + 0.5, {
				align: 'center',
				baseline: 'middle',
			})
			x += colWidths[i]
		})
		doc.setFont('NotoSansJP-Thin', 'normal')
		y += 1
		// So'zlar
		pageWords.forEach((word, index) => {
			const rowData = [
				(startIndex + index + 1).toString(),
				word.kanji,
				word.translation,
				word.transcription,
				word.example,
				`N${word.jlptLevel}`,
			]

			// Example uzun bo'lsa, row height'ini oshirish
			const exampleLines = splitByLength(word.example, 26)
			const lineHeight = 0.4 // har bir qator balandligi
			const rowHeight = Math.max(1.2, exampleLines.length * lineHeight)

			x = 1

			rowData.forEach((data, i) => {
				doc.rect(x, y, colWidths[i], rowHeight)

				if (i === 1) {
					// Kanji
					doc.setFont('NotoSansJP')
					doc.setFontSize(Math.min(14, Math.max(8, 16 - data.length)))
					doc.text(data, x + colWidths[i] / 2, y + rowHeight / 2, {
						align: 'center',
						baseline: 'middle',
					})
				} else if (i === 2) {
					// Translate
					doc.setFont('NotoSansJP-Thin')

					const translationLines = splitByLength(data, 20) // har 20 harfda bo‘lib yuborish
					const lineHeight = 0.4

					if (translationLines.length === 1) {
						// Bitta qator
						const fontSize = Math.min(9, Math.max(6, 11 - data.length / 10))
						doc.setFontSize(fontSize)
						doc.text(translationLines[0], x + colWidths[i] / 2, y + rowHeight / 2, {
							align: 'center',
							baseline: 'middle',
						})
					} else {
						// Ikki yoki undan ko‘p qator
						translationLines.forEach((line, lineIndex) => {
							doc.setFontSize(7)
							const lineY = y + 0.4 + lineIndex * lineHeight
							doc.text(line, x + colWidths[i] / 2, lineY, {
								align: 'center',
								baseline: 'middle',
							})
						})
					}
				} else if (i === 4) {
					// Example
					doc.setFont('NotoSansJP-Thin')

					if (exampleLines.length === 1) {
						// Bitta qator
						const fontSize = Math.min(8, Math.max(5, 9 - data.length / 20))
						doc.setFontSize(fontSize)
						doc.text(exampleLines[0], x + colWidths[i] / 2, y + rowHeight / 2, {
							align: 'center',
							baseline: 'middle',
						})
					} else {
						exampleLines.forEach((line, lineIndex) => {
							doc.setFontSize(7)
							const lineY = y + 0.4 + lineIndex * lineHeight
							doc.text(line, x + colWidths[i] / 2, lineY, {
								align: 'center',
								baseline: 'middle',
							})
						})
					}
				} else {
					// Boshqa ustunlar
					doc.setFont('NotoSansJP-Thin')
					doc.setFontSize(Math.min(10, Math.max(6, 12 - data.length / 10)))
					doc.text(data, x + colWidths[i] / 2, y + rowHeight / 2, {
						align: 'center',
						baseline: 'middle',
					})
				}
				x += colWidths[i]
			})
			y += rowHeight
		})
	}
}

function createCardFormat(doc: jsPDF, words: Word[], title: string) {
	const widths = 7.425
	const height = 4.2
	const wordsPerPage = 20 // 5 qator x 4 ustun
	const cols = 4
	const rows = 5

	const totalPages = Math.ceil(words.length / wordsPerPage) * 2 // Har bir so'z sahifasi uchun 2 ta sahifa kerak

	// Barcha sahifalarni yaratish
	for (let pageIndex = 0; pageIndex < totalPages; pageIndex += 2) {
		const wordStartIndex = (pageIndex / 2) * wordsPerPage
		const wordEndIndex = Math.min(wordStartIndex + wordsPerPage, words.length)
		const currentPageWords = words.slice(wordStartIndex, wordEndIndex)

		// Agar birinchi sahifa bo'lmasa, yangi sahifa qo'shish
		if (pageIndex > 0) {
			doc.addPage('l')
		}

		// KANJI SAHIFASI (toq sahifalar)
		// Kvadratlarni chizish
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				doc.rect(col * widths, row * height, widths, height)
			}
		}

		// Kanji so'zlarni joylashtirish
		for (let i = 0; i < currentPageWords.length; i++) {
			const row = Math.floor(i / cols)
			const col = i % cols

			// Sarlavha
			doc.setFontSize(10)
			doc.setFont('NotoSansJP-Thin')
			// lesson title chap tomonda
			doc.text(
				`${title}`,
				col * widths + 0.2, // chapdan biroz ichkariga
				row * height + height / 7,
				{
					align: 'left',
					baseline: 'middle',
				}
			)
			// kanji.uz chap tomonda pastda
			doc.text(
				`kanji.uz`,
				col * widths + 0.2, // chapdan biroz ichkariga
				row * height + height - 0.4,
				{
					align: 'left',
					baseline: 'middle',
				}
			)
			// JLPT level ong tomonda
			doc.text(
				`${currentPageWords[i].jlptLevel}`,
				(col + 1) * widths - 0.2, // o‘ngdan biroz ichkariga
				row * height + height / 7,
				{
					align: 'right',
					baseline: 'middle',
				}
			)

			// Kanji
			doc.setFontSize(setKanjiTextSize(currentPageWords[i].kanji))
			doc.setFont('NotoSansJP')
			doc.text(currentPageWords[i].kanji, col * widths + widths / 2, row * height + height / 2, {
				align: 'center',
				baseline: 'middle',
			})
		}

		// TARJIMA SAHIFASI (juft sahifalar)
		doc.addPage('l')

		// Kvadratlarni chizish
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				doc.rect(col * widths, row * height, widths, height)
			}
		}

		// Tarjima, transkripsiya va misollarni joylashtirish
		for (let i = 0; i < currentPageWords.length; i++) {
			const row = Math.floor(i / cols)
			const col = i % cols
			const centerX = (cols - 1 - col) * widths + widths / 2 // Orqaga aylantirish

			doc.setFont('NotoSansJP-Thin')

			// Transkripsiya
			doc.setFontSize(setTranscriptionTextSize(currentPageWords[i].transcription))
			doc.text(currentPageWords[i].transcription, centerX, row * height + height * 0.2, {
				align: 'center',
				baseline: 'middle',
			})

			// Tarjima - uzun bo'lsa ikki qatorga bo'lish
			const translate = currentPageWords[i].translation
			if (translate.length <= 28) {
				// Qisqa misol - bitta qator
				doc.setFontSize(setRomajiTextSize(translate))
				doc.text(translate, centerX, row * height + height * 0.5, {
					align: 'center',
					baseline: 'middle',
				})
			} else {
				// Uzun misol - ikki qatorga bo'lish
				const translateLines = splitTextIntoLines(translate, 28) // bo‘shliq bo‘lsa so‘z bo‘yicha

				if (translateLines.length === 1) {
					// Agar split qilgandan keyin ham bitta qator bo'lsa
					doc.setFontSize(setRomajiTextSize(translate))
					doc.text(translateLines[0], centerX, row * height + height * 0.5, {
						align: 'center',
						baseline: 'middle',
					})
				} else {
					// Ikki qator
					doc.setFontSize(setRomajiTextSize(translate))

					// Birinchi qator
					doc.text(translateLines[0], centerX, row * height + height * 0.45, {
						align: 'center',
						baseline: 'middle',
					})

					// Ikkinchi qator
					doc.text(translateLines[1], centerX, row * height + height * 0.6, {
						align: 'center',
						baseline: 'middle',
					})
				}
			}
			const example = currentPageWords[i].example
			if (example.length <= 30) {
				// Qisqa misol - bitta qator
				doc.setFontSize(setExampleTextSize(example))
				doc.text(example, centerX, row * height + height * 0.8, {
					align: 'center',
					baseline: 'middle',
				})
			} else {
				// Uzun misol - ikki qatorga bo'lish
				const exampleLines = example.includes(' ')
					? splitTextIntoLines(example, 26) // bo‘shliq bo‘lsa so‘z bo‘yicha
					: splitByLength(example, 26)
				const fontSize = Math.max(6, setExampleTextSize(example) - 2) // Biroz kichikroq font

				if (exampleLines.length === 1) {
					// Agar split qilgandan keyin ham bitta qator bo'lsa
					doc.setFontSize(fontSize)
					doc.text(exampleLines[0], centerX, row * height + height * 0.8, {
						align: 'center',
						baseline: 'middle',
					})
				} else {
					// Ikki qator
					doc.setFontSize(fontSize)

					// Birinchi qator
					doc.text(exampleLines[0], centerX, row * height + height * 0.8, {
						align: 'center',
						baseline: 'middle',
					})

					// Ikkinchi qator
					doc.text(exampleLines[1], centerX, row * height + height * 0.88, {
						align: 'center',
						baseline: 'middle',
					})
				}
			}
		}
	}
}
