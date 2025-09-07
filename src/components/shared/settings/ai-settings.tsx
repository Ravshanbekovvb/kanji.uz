'use client'
import { useStore } from '@/store/store'

const aiOptions: { name: string; image: string; key: 'chatgpt' | 'groq' }[] = [
	{ name: 'Chat GPT', image: '/chat-gpt.png', key: 'chatgpt' },
	{ name: 'Groq', image: '/groq.png', key: 'groq' },
]

export const AiSettings: React.FC = () => {
	const { currentAi, setCurrentAi } = useStore()

	return (
		<div className='p-3 space-y-3'>
			<h2 className='text-lg font-semibold text-gray-800'>AI Assistant</h2>
			<div className='flex gap-3'>
				{aiOptions.map(ai => (
					<div
						key={ai.key}
						className={`group cursor-pointer rounded-xl p-3 flex flex-col items-center transition-all duration-200 min-w-[90px]
              ${
								currentAi === ai.key
									? 'bg-gradient-to-b from-blue-50 to-blue-100 border-2 border-blue-400 shadow-md'
									: 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
							}
            `}
						onClick={() => setCurrentAi(ai.key)}
					>
						<div
							className={`rounded-full p-2 mb-2 transition-all duration-200 ${
								currentAi === ai.key ? 'bg-white shadow-sm' : 'bg-gray-50 group-hover:bg-gray-100'
							}`}
						>
							<img
								src={ai.image}
								alt={ai.name}
								className={`${ai.name === 'Groq' ? 'w-15 h-8' : 'w-8 h-8'}`}
							/>
						</div>
						<span
							className={`text-sm font-medium transition-colors ${
								currentAi === ai.key ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-800'
							}`}
						>
							{ai.name}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
