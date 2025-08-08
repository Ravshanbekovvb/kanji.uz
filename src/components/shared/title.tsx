import { cn } from '@/lib/utils'

interface PageTitleProps {
	className?: string
	title: string
}

export const PageTitle: React.FC<PageTitleProps> = ({ className, title }) => {
	return (
		<div className={cn('text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold', className)}>
			{title}
		</div>
	)
}
