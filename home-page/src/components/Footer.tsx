import React from 'react';

interface FooterProps {
  t: (key: string) => string;
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ t, onContactClick }) => {
  return (
    <div className="bg-white text-slate-900 py-8 sm:py-12 md:py-16 px-4 sm:px-5 md:px-6 text-center border-t-2 border-primary" id="footer">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] mb-2 sm:mb-3 font-bold text-slate-900">{t('footer-title')}</h1>
      <p className="text-sm sm:text-base md:text-lg mb-5 sm:mb-7 md:mb-9 text-slate-700 max-w-2xl mx-auto px-2">{t('footer-desc')}</p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 flex-wrap max-w-md mx-auto">
        <button className="no-underline px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold transition-all duration-200 cursor-pointer border-none text-sm md:text-base bg-primary text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(14,165,233,0.35)] active:scale-95">
          {t('footer-join')}
        </button>
        <button 
          className="no-underline px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold transition-all duration-200 cursor-pointer border-2 border-primary text-primary bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(14,165,233,0.35)] active:scale-95 text-sm md:text-base" 
          onClick={onContactClick}
        >
          {t('footer-contact')}
        </button>
      </div>
    </div>
  );
};

export default Footer;
