import { JP, RU, US, UZ } from 'country-flag-icons/react/3x2'
import { useEffect, useRef, useState } from 'react'
const languages = [
	{ code: 'uz', label: 'UZ', flag: UZ },
	{ code: 'ja', label: 'JA', flag: JP },
	{ code: 'ru', label: 'RU', flag: RU },
	{ code: 'en', label: 'US', flag: US },
]
const Navbar = ({ t, currentLang, onLangChange }) => {
	const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
	const dropdownRef = useRef(null)

	const currentLanguage = languages.find(lang => lang.code === currentLang.code)

	useEffect(() => {
		const handleClickOutside = e => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setIsLangMenuOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	}, [])
	const Flag = currentLanguage?.flag
	return (
		<nav className='navbar'>
			<a href='/' className='logo-box'>
				<img src='/images/logo.png' alt='Kanji.uz' className='logo' />
				<span className='logo-text'>
					Kanji<span>.uz</span>
				</span>
			</a>

			<ul className='menu'>
				<li>
					<a href='#review'>{t('menu-reviews')}</a>
				</li>
				<li>
					<a href='#about'>{t('menu-about')}</a>
				</li>
				<li>
					<a href='#menu-login'>{t('menu-login')}</a>
				</li>
				<li className='btn'>
					<a href='#menu-register'>{t('menu-register')}</a>
				</li>
			</ul>

			<div className='lang-dropdown' ref={dropdownRef}>
				<button
					className='lang-btn'
					onClick={() => {
						console.log(currentLang)

						setIsLangMenuOpen(!isLangMenuOpen)
					}}
				>
					{Flag && <Flag width={24} height={16} />}
					<span>{currentLanguage?.label}</span>
					<span className='arrow'>▾</span>
				</button>

				<ul className='lang-menu' style={{ display: isLangMenuOpen ? 'block' : 'none' }}>
					{languages.map(lang => (
						<li
							key={lang.code}
							onClick={() => {
								onLangChange(lang)
								setIsLangMenuOpen(false)
							}}
						>
							{lang.flag && <lang.flag className='max-w-6 max-h-4' />}
							{lang.label}
							{lang.code === currentLang && <span className='check'>✔</span>}
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar
