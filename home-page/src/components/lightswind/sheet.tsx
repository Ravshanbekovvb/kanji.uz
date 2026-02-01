import React, { createContext, useContext, useState } from 'react'
import { X } from 'lucide-react'

interface SheetContextType {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
}

const SheetContext = createContext<SheetContextType | undefined>(undefined)

const useSheet = () => {
	const context = useContext(SheetContext)
	if (!context) {
		throw new Error('Sheet components must be used within a Sheet')
	}
	return context
}

export const Sheet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<SheetContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</SheetContext.Provider>
	)
}

export const SheetTrigger: React.FC<{ 
	children: React.ReactNode
	asChild?: boolean 
}> = ({ children, asChild }) => {
	const { setIsOpen } = useSheet()

	const handleClick = () => setIsOpen(true)

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<any>, {
			onClick: handleClick
		})
	}

	return <button onClick={handleClick}>{children}</button>
}

export const SheetContent: React.FC<{ 
	children: React.ReactNode
	className?: string 
}> = ({ children, className = '' }) => {
	const { isOpen, setIsOpen } = useSheet()

	if (!isOpen) return null

	return (
		<>
			<div 
				className="fixed inset-0 bg-black/50 z-50"
				onClick={() => setIsOpen(false)}
			/>
			<div className={`fixed right-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg z-50 p-6 overflow-y-auto ${className}`}>
				<button
					onClick={() => setIsOpen(false)}
					className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<X className="w-5 h-5" />
				</button>
				{children}
			</div>
		</>
	)
}

export const SheetHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="mb-6">{children}</div>
}

export const SheetTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <h2 className="text-2xl font-bold mb-2">{children}</h2>
}

export const SheetDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <p className="text-gray-600 dark:text-gray-400">{children}</p>
}

export const SheetFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="mt-6 flex justify-end gap-2">{children}</div>
}

export const SheetClose: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { setIsOpen } = useSheet()

	const handleClick = () => setIsOpen(false)

	if (React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<any>, {
			onClick: handleClick
		})
	}

	return <button onClick={handleClick}>{children}</button>
}
