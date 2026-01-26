import React from 'react';

const About = ({ t }) => {
  const cards = [
    { id: 1, image: '/images/yozish ukki.png', title: t('card-1-title'), desc: t('card-1-desc') },
    { id: 2, image: '/images/organishkanji.png', title: t('card-2-title'), desc: t('card-2-desc') },
    { id: 3, image: '/images/canjicard.png', title: t('card-3-title'), desc: t('card-3-desc') },
    { id: 4, image: '/images/progress.png', title: t('card-4-title'), desc: t('card-4-desc') },
    { id: 5, image: '/images/kutubxona.png', title: t('card-5-title'), desc: t('card-5-desc') }
  ];

  return (
    <div className="aboutUS" id="about">
      <h1>{t('about-title')}</h1>
      <br />
      <div className="about-grid">
        {cards.map((card) => (
          <div key={card.id} className="cardAboutUs">
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
