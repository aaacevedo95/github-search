import { useState } from 'react';

import i18n from '../../i18n';

import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const [lang, setLang] = useState(
    window.localStorage.getItem('lang') || i18n.language
  );

  const handleLangChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
    window.localStorage.setItem('lang', newLang);
  };

  return (
    <span>
      <button
        onClick={() => handleLangChange('en')}
        className={lang !== 'en' ? 'unselected-button' : ''}
        style={{
          borderRadius: '4px 0px 0px 4px',
        }}
      >
        EN
      </button>
      <button
        className={lang !== 'ja' ? 'unselected-button' : ''}
        onClick={() => handleLangChange('ja')}
        style={{ borderRadius: '0px 4px 4px 0px' }}
      >
        JA
      </button>
    </span>
  );
};

export default LanguageSwitcher;
