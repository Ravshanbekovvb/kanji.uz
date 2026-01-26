import { JP, RU, US, UZ } from 'country-flag-icons/react/3x2'
import { useEffect, useState } from 'react'
import './App.css'
import About from './components/About'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Reviews from './components/Reviews'
import { translations } from './translations/translations'
const languages = [
	{ code: 'uz', label: 'UZ', flag: UZ },
	{ code: 'ja', label: 'JA', flag: JP },
	{ code: 'ru', label: 'RU', flag: RU },
	{ code: 'en', label: 'US', flag: US },
]
function App() {
	const [currentLang, setCurrentLang] = useState(languages[0])

	useEffect(() => {
		const savedCode = localStorage.getItem('selectedLang') || 'uz'
		const lang = languages.find(l => l.code === savedCode) || languages[0]
		setCurrentLang(lang)
	}, [])

	const handleLangChange = lang => {
		setCurrentLang(lang)
		localStorage.setItem('selectedLang', lang.code)
	}

	const t = key => translations[currentLang.code]?.[key] || key
	return (
		<div className='App'>
			<Navbar t={t} currentLang={currentLang} onLangChange={handleLangChange} />
			<Hero t={t} />
			<Reviews t={t} />
			<About t={t} />
			<Footer t={t} />
		</div>
	)
}

export default App
