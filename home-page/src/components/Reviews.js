import React, { useState, useRef } from 'react';

const Reviews = ({ t }) => {
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);

  const reviews = [
    { id: 1, text: t('review-1'), author: t('author-1') },
    { id: 2, text: t('review-2'), author: t('author-2') },
    { id: 3, text: t('review-3'), author: t('author-3') },
    { id: 4, text: t('review-4'), author: t('author-4'), hidden: !expanded },
    { id: 5, text: t('review-5'), author: t('author-5'), hidden: !expanded }
  ];

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
    <div className="Review" id="review">
      <div className="reviews-list" ref={listRef}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`card ${review.hidden ? 'hidden' : ''}`}
          >
            <div className="avatar"></div>
            <div className="content">
              <p>{review.text}</p>
              <span className="author">{review.author}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="more-btn" onClick={toggleReviews}>
        {expanded ? t('toggle-btn-less') : t('toggle-btn-more')}
      </button>
    </div>
  );
};

export default Reviews;
