import { columns } from './columns'
import { DataTable } from './data-table'

async function getData(): Promise<
	{
		user: string
		title: string
		words: { kanji: string; translation: string; transcription: string; example: string }[]
	}[]
> {
	return [
		{
			user: 'Behruz',
			title: '1-dars',
			words: [
				{
					kanji: '漢字',
					translation: 'Kanji',
					transcription: 'かんじ',
					example: '漢字を勉強します。',
				},
				{ kanji: '家', translation: 'uy', transcription: 'いえ', example: '家に帰ります。' },
				{
					kanji: '学校',
					translation: 'maktab',
					transcription: 'がっこう',
					example: '学校へ行きます。',
				},
				{
					kanji: '先生',
					translation: 'o‘qituvchi',
					transcription: 'せんせい',
					example: '先生は日本人です。',
				},
				{
					kanji: '学生',
					translation: 'talaba',
					transcription: 'がくせい',
					example: '私は学生です。',
				},
			],
		},
		{
			user: 'Behruz',
			title: '2-dars',
			words: [
				{ kanji: '水', translation: 'suv', transcription: 'みず', example: '水を飲みます。' },
				{ kanji: '火', translation: 'olov', transcription: 'ひ', example: '火をつけます。' },
				{ kanji: '木', translation: 'daraxt', transcription: 'き', example: '木があります。' },
				{
					kanji: '金',
					translation: 'pul/oltin',
					transcription: 'きん',
					example: '金を払います。',
				},
				{ kanji: '土', translation: 'yer', transcription: 'つち', example: '土で育ちます。' },
			],
		},
		{
			user: 'Behruz',
			title: '3-dars',
			words: [
				{ kanji: '日', translation: 'kun', transcription: 'ひ', example: '今日はいい日です。' },
				{ kanji: '月', translation: 'oy', transcription: 'つき', example: '月がきれいです。' },
				{ kanji: '年', translation: 'yil', transcription: 'とし', example: '新しい年です。' },
				{
					kanji: '時間',
					translation: 'vaqt',
					transcription: 'じかん',
					example: '時間があります。',
				},
				{ kanji: '今', translation: 'hozir', transcription: 'いま', example: '今、行きます。' },
			],
		},
		{
			user: 'Behruz',
			title: '4-dars',
			words: [
				{ kanji: '人', translation: 'inson', transcription: 'ひと', example: '日本人です。' },
				{
					kanji: '男',
					translation: 'erkak',
					transcription: 'おとこ',
					example: '男の人がいます。',
				},
				{ kanji: '女', translation: 'ayol', transcription: 'おんな', example: '女の人です。' },
				{
					kanji: '子供',
					translation: 'bola',
					transcription: 'こども',
					example: '子供が遊んでいます。',
				},
				{
					kanji: '友達',
					translation: 'do‘st',
					transcription: 'ともだち',
					example: '友達と話します。',
				},
			],
		},
		{
			user: 'Behruz',
			title: '5-dars',
			words: [
				{ kanji: '手', translation: 'qo‘l', transcription: 'て', example: '手を洗います。' },
				{ kanji: '足', translation: 'oyoq', transcription: 'あし', example: '足が痛いです。' },
				{ kanji: '目', translation: 'ko‘z', transcription: 'め', example: '目を開けます。' },
				{ kanji: '口', translation: 'og‘iz', transcription: 'くち', example: '口を閉じます。' },
				{ kanji: '耳', translation: 'quloq', transcription: 'みみ', example: '耳が聞こえます。' },
			],
		},
		{
			user: 'Behruz',
			title: '6-dars',
			words: [
				{ kanji: '山', translation: 'tog‘', transcription: 'やま', example: '山に登ります。' },
				{ kanji: '川', translation: 'daryo', transcription: 'かわ', example: '川で泳ぎます。' },
				{ kanji: '海', translation: 'dengiz', transcription: 'うみ', example: '海が見えます。' },
				{ kanji: '空', translation: 'osmon', transcription: 'そら', example: '空が青いです。' },
				{ kanji: '風', translation: 'shamol', transcription: 'かぜ', example: '風が強いです。' },
			],
		},
		{
			user: 'Behruz',
			title: '7-dars',
			words: [
				{
					kanji: '食べる',
					translation: 'yemoq',
					transcription: 'たべる',
					example: 'ご飯を食べます。',
				},
				{
					kanji: '飲む',
					translation: 'ichmoq',
					transcription: 'のむ',
					example: '水を飲みます。',
				},
				{
					kanji: '買う',
					translation: 'sotib olmoq',
					transcription: 'かう',
					example: '本を買います。',
				},
				{
					kanji: '行く',
					translation: 'bormoq',
					transcription: 'いく',
					example: '学校へ行きます。',
				},
				{
					kanji: '来る',
					translation: 'kelmoq',
					transcription: 'くる',
					example: '先生が来ます。',
				},
			],
		},
		{
			user: 'Behruz',
			title: '8-dars',
			words: [
				{
					kanji: '見る',
					translation: 'ko‘rmoq',
					transcription: 'みる',
					example: '映画を見ます。',
				},
				{
					kanji: '聞く',
					translation: 'eshitmoq',
					transcription: 'きく',
					example: '音楽を聞きます。',
				},
				{
					kanji: '話す',
					translation: 'gapirmoq',
					transcription: 'はなす',
					example: '友達と話します。',
				},
				{
					kanji: '読む',
					translation: 'o‘qimoq',
					transcription: 'よむ',
					example: '本を読みます。',
				},
				{
					kanji: '書く',
					translation: 'yozmoq',
					transcription: 'かく',
					example: '手紙を書きます。',
				},
			],
		},
		{
			user: 'Behruz',
			title: '9-dars',
			words: [
				{
					kanji: '上',
					translation: 'yuqori',
					transcription: 'うえ',
					example: '棚の上にあります。',
				},
				{ kanji: '下', translation: 'past', transcription: 'した', example: '机の下です。' },
				{
					kanji: '中',
					translation: 'ichida',
					transcription: 'なか',
					example: '箱の中にあります。',
				},
				{
					kanji: '外',
					translation: 'tashqarida',
					transcription: 'そと',
					example: '外で遊びます。',
				},
				{ kanji: '前', translation: 'oldinda', transcription: 'まえ', example: '家の前です。' },
			],
		},
		{
			user: 'Behruz',
			title: '10-dars',
			words: [
				{
					kanji: '後ろ',
					translation: 'orqada',
					transcription: 'うしろ',
					example: '車の後ろです。',
				},
				{
					kanji: '左',
					translation: 'chap',
					transcription: 'ひだり',
					example: '左に曲がります。',
				},
				{ kanji: '右', translation: 'o‘ng', transcription: 'みぎ', example: '右手です。' },
				{
					kanji: '間',
					translation: 'orasida',
					transcription: 'あいだ',
					example: '机と椅子の間です。',
				},
				{
					kanji: '近く',
					translation: 'yaqin',
					transcription: 'ちかく',
					example: '駅の近くです。',
				},
			],
		},
	]
}
export default async function AllDocs() {
	const data = await getData()
	return (
		<div>
			<h2 className='mb-4 text-4xl font-semibold'>All documents</h2>
			<DataTable columns={columns} data={data} />
		</div>
	)
}
