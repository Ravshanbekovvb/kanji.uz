import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline'
	children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ 
	variant = 'primary', 
	className = '', 
	children, 
	...props 
}) => {
	const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200'
	
	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
		outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
	}
	
	return (
		<button 
			className={`${baseStyles} ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}
