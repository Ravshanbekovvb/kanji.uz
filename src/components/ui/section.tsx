import { cn } from '@/lib/func/utils'

type Props = {
	className?: string
}

export const Section: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<section
			className={cn(
				'md:p-10 md:pt-4 pt-[calc(4rem+env(safe-area-inset-top))] md:pb-10 p-4 py-18 pb-[calc(5rem+env(safe-area-inset-bottom))] ',
				className
			)}
		>
			{children}
		</section>
	)
}
