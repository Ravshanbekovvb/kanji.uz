import { cn } from '@/lib/func/utils'
import React from 'react'

type Props = {
	className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return <div className={cn('max-w-[1190px] px-10 mx-auto', className)}>{children}</div>
}
