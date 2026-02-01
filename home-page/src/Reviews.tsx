import React, { useState, useRef } from 'react';

interface ReviewsProps {
  t: (key: string) => string;
}

const Reviews: React.FC<ReviewsProps> = ({ t }) => {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const reviews = [
    { id: 1, text: t('review-1'), author: t('author-1') },
    { id: 2, text: t('review-2'), author: t('author-2') },
    { id: 3, text: t('review-3'), author: t('author-3') },
    { id: 4, text: t('review-4'), author: t('author-4'), hidden: !expanded },
    { id: 5, text: t('review-5'), author: t('author-5'), hidden: !expanded }
  ];

  const visibleReviews = reviews.filter(r => !r.hidden);

  const toggleReviews = () => {
    if (!expanded) {
      setExpanded(true);
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      setExpanded(false);
      if (listRef.current) {
        listRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="h-auto bg-primary flex flex-col items-center gap-6 sm:gap-8 md:gap-10 pt-[100px] lg:pt-48 pb-16 sm:pb-24 md:pb-32 lg:-mt-32 lg:[clip-path:polygon(0_12%,100%_0,100%_100%,0_100%)] px-4 sm:px-6 md:px-8" id="review">
      <div 
        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-10 max-h-[400px] sm:max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2 md:pr-2.5 scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent scrollbar-thumb-rounded-lg w-full" 
        ref={listRef}
      >
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="relative flex gap-2.5 sm:gap-3 md:gap-5 w-full max-w-[900px] p-4 sm:p-5 md:p-10 bg-white/15 rounded-lg sm:rounded-xl md:rounded-2xl text-white shadow-[0_10px_20px_rgba(0,0,0,0.15)] md:shadow-[0_20px_40px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 border-2 border-transparent hover:translate-x-1 md:hover:translate-x-2.5 hover:bg-white/25 hover:border-white/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] md:hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] mx-auto active:scale-[0.98]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 rounded-full bg-gradient-to-br from-white to-sky-100 flex-shrink-0 shadow-lg shadow-black/20"></div>
            <div className="flex-1 flex flex-col gap-1 sm:gap-1.5 md:gap-2.5">
              <p className="text-xs sm:text-sm md:text-base leading-relaxed m-0">{review.text}</p>
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold opacity-90 mt-0.5 sm:mt-1 md:mt-2">{review.author}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-2 sm:mt-5 md:mt-10">
        <button 
          className="mt-3 sm:mt-5 md:mt-10 px-4 sm:px-5 md:px-7 py-2 sm:py-2.5 md:py-3 bg-white text-primary font-semibold border-none rounded-lg cursor-pointer transition-all duration-300 animate-[pulse_2s_ease-in-out_infinite] hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white hover:scale-110 hover:shadow-[0_10px_30px_rgba(14,165,233,0.4)] hover:animate-none active:scale-95 text-xs sm:text-sm md:text-base"
          onClick={toggleReviews}
        >
          {expanded ? t('toggle-btn-less') : t('toggle-btn-more')}
        </button>
      </div>
    </div>
  );
};

export default Reviews;
