import React from 'react';

const Footer = ({ t }) => {
  return (
    <div className="footer" id="footer">
      <h1>{t('footer-title')}</h1>
      <p>{t('footer-desc')}</p>

      <div className="footer-links">
        <a href="#">{t('footer-join')}</a>
        <a href="#">{t('footer-contact')}</a>
      </div>
    </div>
  );
};

export default Footer;
