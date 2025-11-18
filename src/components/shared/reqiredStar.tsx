import { cn } from '@/lib/func/utils'

interface ReqiredStarProps {
	className?: string
}
export const ReqiredStar: React.FC<ReqiredStarProps> = ({ className }) => {
	return <span className={cn('text-red-500', className)}>*</span>
}
