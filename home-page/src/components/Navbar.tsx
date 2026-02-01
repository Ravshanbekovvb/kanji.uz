import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  t: (key: string) => string;
  currentLang: string;
  onLangChange: (lang: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ t, currentLang, onLangChange }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'uz', label: 'UZ', flag: 'https://flagcdn.com/w20/uz.png', hasDot: false },
    { code: 'ja', label: 'JA', flag: null, hasDot: true },
    { code: 'ru', label: 'RU', flag: 'https://flagcdn.com/w20/ru.png', hasDot: false },
    { code: 'en', label: 'US', flag: 'https://flagcdn.com/w20/us.png', hasDot: false }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      
      if (window.scrollY > heroHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[999] flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-24 py-4 sm:py-5 md:py-6 backdrop-blur-sm ${isScrolled ? 'bg-teal-600/90 shadow-lg' : 'bg-transparent'} transition-all duration-300`}>
      <a href="/" className="flex items-center gap-2 sm:gap-2.5 no-underline">
        <img src="/images/logo.png" alt="Kanji.uz" className="w-10 sm:w-12 md:w-14 lg:w-15 h-auto" />
        <span className="text-base sm:text-lg md:text-xl font-bold text-white">
          Kanji.uz
        </span>
      </a>

      {/* Hamburger Menu */}
      <button 
        className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1 z-[1000]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="w-6 h-0.5 bg-white rounded transition-all duration-300 hover:bg-teal-300"></span>
        <span className="w-6 h-0.5 bg-white rounded transition-all duration-300 hover:bg-teal-300"></span>
        <span className="w-6 h-0.5 bg-white rounded transition-all duration-300 hover:bg-teal-300"></span>
      </button>

      <ul className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex list-none items-center gap-6 lg:gap-10 flex-1 justify-end mx-4 md:mx-6 lg:mx-10 max-md:fixed max-md:top-[68px] max-md:left-0 max-md:w-full max-md:bg-teal-600/98 max-md:backdrop-blur-md max-md:flex-col max-md:gap-0 max-md:py-4 max-md:shadow-2xl max-md:z-[998] max-md:max-h-[calc(100vh-68px)] max-md:overflow-y-auto`}>
        <li className="max-md:w-full max-md:text-center max-md:py-3 max-md:border-b max-md:border-white/10">
          <a href="#review" onClick={() => setIsMobileMenuOpen(false)} className="no-underline text-white font-semibold text-sm md:text-base transition-all duration-300 hover:underline max-md:block max-md:px-4 max-md:py-3 max-md:text-base active:bg-white/10">
            {t('menu-reviews')}
          </a>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-3 max-md:border-b max-md:border-white/10">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="no-underline text-white font-semibold text-sm md:text-base transition-all duration-300 hover:underline max-md:block max-md:px-4 max-md:py-3 max-md:text-base active:bg-white/10">
            {t('menu-about')}
          </a>
        </li>
        <li className="max-md:w-full max-md:text-center max-md:py-4 max-md:px-4">
          <button onClick={() => setIsMobileMenuOpen(false)} className="bg-white text-teal-600 px-4 md:px-5 py-2 md:py-2.5 rounded-md font-semibold text-sm md:text-base transition-all duration-300 hover:bg-teal-100 hover:scale-105 active:scale-95 max-md:w-full">
            {t('menu-register')}
          </button>
        </li>
      </ul>

      <div className="relative inline-block ml-2 sm:ml-4" ref={dropdownRef}>
        <button 
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white cursor-pointer font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:border-primary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
        >
          {currentLanguage?.flag ? (
            <img src={currentLanguage.flag} alt={currentLanguage.label} className="w-4 sm:w-5 transition-transform duration-300 hover:scale-110 hover:rotate-6" />
          ) : (
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-600 rounded-full shadow-md shadow-red-600/30"></span>
          )}
          <span className="text-sm sm:text-base">{currentLanguage?.label}</span>
          <span className={`ml-1 sm:ml-1.5 text-slate-500 transition-transform duration-300 text-sm ${isLangMenuOpen ? 'rotate-180' : ''}`}>▾</span>
        </button>

        <ul className={`${isLangMenuOpen ? 'block' : 'hidden'} list-none p-2 mt-2.5 bg-gradient-to-br from-sky-100 to-blue-50 rounded-xl sm:rounded-2xl shadow-xl shadow-primary/15 absolute right-0 w-36 sm:w-44 animate-[slideDown_0.3s_ease] border border-primary/30`}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => {
                onLangChange(lang.code);
                setIsLangMenuOpen(false);
              }}
              className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer font-semibold text-sm sm:text-base transition-all duration-200 relative hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:pl-4 sm:hover:pl-5 rounded-lg group active:bg-primary/20"
            >
              <span className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-0.5 bg-gradient-to-b from-primary to-secondary rounded-r transition-all duration-200"></span>
              {lang.flag ? (
                <img src={lang.flag} alt={lang.label} className="w-4 sm:w-5 transition-transform duration-200 group-hover:scale-110" />
              ) : (
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-red-600 rounded-full shadow-sm shadow-red-600/30 transition-transform duration-200 group-hover:scale-125"></span>
              )}
              {lang.label}
              {lang.code === currentLang && <span className="ml-auto text-primary font-bold text-sm sm:text-base animate-[checkPulse_0.3s_ease]">✔</span>}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
