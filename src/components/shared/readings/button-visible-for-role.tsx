import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'
interface Props {
	visibleRole: 'TEACHER' | 'ADMIN' | 'USER' | 'STUDENT'
	title: string
	href: string
	className?: string
}
export const ButtonVisibleForRole: React.FC<Props> = ({ visibleRole, className, title, href }) => {
	const { user } = useAuth()
	if (user?.role === visibleRole)
		return (
			<Link href={href}>
				<Button className={className} variant={'outline'}>
					{title}
				</Button>
			</Link>
		)
}
