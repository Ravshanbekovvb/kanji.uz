import React, { useState, useEffect } from 'react';
import { translations } from './translations/translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Reviews from './components/Reviews';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [currentLang, setCurrentLang] = useState<string>('uz');
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLang') || 'uz';
    setCurrentLang(savedLang);
  }, []);

  const handleLangChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('selectedLang', lang);
  };

  const t = (key: string): string => {
    return translations[currentLang as keyof typeof translations]?.[key] || key;
  };

  return (
    <div className="App">
      <Navbar t={t} currentLang={currentLang} onLangChange={handleLangChange} />
      <Hero t={t} onContactClick={() => setIsContactModalOpen(true)} />
      <Reviews t={t} />
      <About t={t} />
      <Footer t={t} onContactClick={() => setIsContactModalOpen(true)} />

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-[10000] animate-[fadeIn_0.3s_ease] backdrop-blur-sm p-3 sm:p-4" 
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="bg-gradient-to-br from-white/95 to-sky-100/95 p-5 sm:p-6 md:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl w-full max-w-[500px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-[slideDown_0.3s_ease] relative max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-transparent border-none text-[24px] sm:text-[28px] md:text-[32px] text-primary cursor-pointer transition-transform duration-200 leading-none w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center hover:rotate-90 active:scale-90" 
              onClick={() => setIsContactModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-primary mb-4 sm:mb-5 md:mb-7 text-lg sm:text-[22px] md:text-[28px] text-center pr-6 sm:pr-8">{t('contact-title')}</h2>
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
              <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-2.5 sm:p-3 md:p-4 bg-white/60 rounded-lg md:rounded-xl transition-all duration-300 hover:translate-x-1 hover:shadow-[0_5px_15px_rgba(14,165,233,0.2)] active:bg-white/80">
                <img 
                  src="/images/telegram-icon.png" 
                  alt="Telegram" 
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl flex-shrink-0" 
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-600 mb-0.5 sm:mb-1">{t('contact-telegram')}</p>
                  <a 
                    href="https://t.me/+WFMxQyBvsu8xOTRi" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary no-underline font-semibold hover:underline text-xs sm:text-sm md:text-base break-all"
                  >
                    t.me/+WFMxQyBvsu8xOTRi
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-2.5 sm:p-3 md:p-4 bg-white/60 rounded-lg md:rounded-xl transition-all duration-300 hover:translate-x-1 hover:shadow-[0_5px_15px_rgba(14,165,233,0.2)] active:bg-white/80">
                <span className="text-[28px] sm:text-[32px] md:text-[40px] w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">📱</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-600 mb-0.5 sm:mb-1">{t('contact-phone')}</p>
                  <a 
                    href="tel:+998944183810" 
                    className="text-primary no-underline font-semibold hover:underline text-xs sm:text-sm md:text-base"
                  >
                    +998 94 418 38 10
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4 p-2.5 sm:p-3 md:p-4 bg-white/60 rounded-lg md:rounded-xl transition-all duration-300 hover:translate-x-1 hover:shadow-[0_5px_15px_rgba(14,165,233,0.2)] active:bg-white/80">
                <span className="text-[28px] sm:text-[32px] md:text-[40px] w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">✉️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-600 mb-0.5 sm:mb-1">{t('contact-email')}</p>
                  <a 
                    href="mailto:ravshanbekovbehruz79@gmail.com" 
                    className="text-primary no-underline font-semibold hover:underline break-all text-xs sm:text-sm md:text-base"
                  >
                    ravshanbekovbehruz79@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
