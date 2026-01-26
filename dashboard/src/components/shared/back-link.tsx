import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
interface BackLinkProps {
	text: string
	href: string
}
export const BackLink: React.FC<BackLinkProps> = ({ href, text }) => {
	return (
		<Link
			href={href}
			className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-6'
		>
			<ArrowLeft size={18} />
			<span>{text}</span>
		</Link>
	)
}
