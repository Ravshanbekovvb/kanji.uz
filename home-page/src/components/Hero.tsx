import React, { useEffect, useState } from 'react';

interface HeroProps {
  t: (key: string) => string;
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ t, onContactClick }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const clouds = document.querySelectorAll('.cloud');

    const setRandomTop = (cloud: Element) => {
      const min = 200;
      const max = 500;
      const randomTop = Math.random() * (max - min) + min;
      (cloud as HTMLElement).style.top = randomTop + 'px';
    };

    clouds.forEach((cloud) => {
      setRandomTop(cloud);

      const handleAnimationIteration = () => {
        setRandomTop(cloud);
      };

      cloud.addEventListener('animationiteration', handleAnimationIteration);

      return () => {
        cloud.removeEventListener('animationiteration', handleAnimationIteration);
      };
    });
  }, []);

  return (
    <header 
      className="min-h-[100dvh] bg-cover bg-center bg-no-repeat relative pt-20 md:pt-24 overflow-hidden mb-0 pb-0" 
      style={{ 
        backgroundImage: 'url(/images/home.png)', 
        backgroundPosition: isMobile ? 'center top' : 'center -150px', 
        backgroundSize: isMobile ? 'cover' : 'auto' 
      }}
    >
      <div className="absolute inset-0 pointer-events-none max-md:hidden">
        <img src="/images/cloud-computing.png" className="cloud absolute -left-[300px] w-[200px] opacity-70 animate-[cloudMoveUp_22s_linear_infinite]" alt="Cloud" />
        <img src="/images/cloud (1).png" className="cloud absolute -left-[300px] w-[240px] opacity-60 animate-[cloudMoveUp_26s_linear_infinite]" alt="Cloud" />
        <img src="/images/cloudy.png" className="cloud absolute -left-[300px] w-[280px] opacity-50 animate-[cloudMoveUp_30s_linear_infinite]" alt="Cloud" />
      </div>

      <div className="mt-20 sm:mt-28 md:mt-40 ml-auto mr-4 sm:mr-8 md:mr-12 lg:mr-24 max-w-[500px] w-full px-4 sm:px-5 md:px-0 text-white">
        <h1 
          className="text-xl sm:text-2xl md:text-3xl lg:text-[42px] leading-relaxed mb-4 sm:mb-5 md:mb-7 opacity-0 animate-[fadeInUp_1s_ease_forwards]" 
          dangerouslySetInnerHTML={{ __html: t('home-title') }} 
        />
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-7">
          <a 
            href="#footer" 
            className="px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg text-white text-center no-underline font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-white hover:text-teal-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/30 opacity-0 animate-[fadeInUp_1s_ease_0.3s_forwards] active:scale-95"
          >
            {t('home-more')}
          </a>
          <button 
            className="px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 border-2 border-white rounded-lg bg-white text-teal-600 font-semibold text-sm sm:text-base cursor-pointer transition-all duration-300 hover:bg-transparent hover:text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 opacity-0 animate-[fadeInUp_1s_ease_0.5s_forwards] active:scale-95" 
            onClick={onContactClick}
          >
            {t('home-contact')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
