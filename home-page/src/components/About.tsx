import React from 'react';

interface AboutProps {
  t: (key: string) => string;
}

const About: React.FC<AboutProps> = ({ t }) => {
  const cards = [
    { id: 1, image: '/images/yozish ukki.png', title: t('card-1-title'), desc: t('card-1-desc') },
    { id: 2, image: '/images/organishkanji.png', title: t('card-2-title'), desc: t('card-2-desc') },
    { id: 3, image: '/images/canjicard.png', title: t('card-3-title'), desc: t('card-3-desc') },
    { id: 4, image: '/images/progress.png', title: t('card-4-title'), desc: t('card-4-desc') },
    { id: 5, image: '/images/kutubxona.png', title: t('card-5-title'), desc: t('card-5-desc') }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-20 px-4 sm:px-5 md:px-6 text-center" id="about">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] mb-2 sm:mb-2.5 md:mb-4">{t('about-title')}</h1>
      <br className="hidden sm:block" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6 md:gap-10 max-w-[1200px] w-full mx-auto justify-items-center mt-4 sm:mt-6">
        {cards.map((card, index) => (
          <div 
            key={card.id} 
            className={`max-w-[360px] w-full flex flex-col items-center text-center opacity-0 animate-[slideUp_0.6s_ease_forwards] transition-all duration-300 p-4 sm:p-5 md:p-7 rounded-lg sm:rounded-xl md:rounded-2xl hover:-translate-y-2 md:hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_10px_20px_rgba(14,165,233,0.2)] md:hover:shadow-[0_20px_40px_rgba(14,165,233,0.2)] hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 active:scale-[0.98] ${
              index < 2 ? 'md:col-span-3' : 'md:col-span-2'
            }`}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-12 sm:w-16 md:w-20 mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" 
            />
            <h3 className="text-lg sm:text-xl md:text-2xl mb-1.5 sm:mb-2">{card.title}</h3>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
