import React, { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

interface ToggleThemeProps {
	className?: string
}

export const ToggleTheme: React.FC<ToggleThemeProps> = ({ className = '' }) => {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const theme = localStorage.getItem('theme')
		setIsDark(theme === 'dark')
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		}
	}, [])

	const toggleTheme = () => {
		const newTheme = !isDark
		setIsDark(newTheme)
		
		if (newTheme) {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		}
	}

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
			aria-label="Toggle theme"
		>
			{isDark ? (
				<Sun className="w-5 h-5 text-yellow-500" />
			) : (
				<Moon className="w-5 h-5 text-gray-700" />
			)}
		</button>
	)
}
