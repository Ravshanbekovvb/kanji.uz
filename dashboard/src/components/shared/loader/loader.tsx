import { Button } from '@/components/ui/button'
import { cn } from '@/lib/func/utils'
import { Loader2 } from 'lucide-react'

interface LoaderProps {
	className?: string
	variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
	title?: string
}

export const Loader: React.FC<LoaderProps> = ({ className, variant, title = 'Loading...' }) => {
	return (
		<Button className={cn('flex items-center', className)} variant={variant} disabled>
			<Loader2 className='rotate-right' />
			{title}
		</Button>
	)
}
