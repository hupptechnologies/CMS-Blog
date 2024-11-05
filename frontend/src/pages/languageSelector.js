import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTranslationAsync } from '../redux/translation';
import { getAllTranslateDetail } from '../redux/translation/slice';
import { getFlagURl } from '../utils/configs';
import '../styles/language.css';

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode) ? getFlagURl(countryCode) : '';
}

const LocaleDropdown = () => {
  const dispatch = useDispatch();
  const { languageTypes } = useSelector(getAllTranslateDetail);
  const [selectedLocale, setSelectedLocale] = useState('en-GB');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (languageTypes.length > 0) {
      const browserLang = new Intl.Locale(navigator.language).language;
      for (const locale of languageTypes) {
        const localeLang = new Intl.Locale(locale).language;
        if (localeLang === browserLang) {
          setSelectedLocale(locale);
          break;
        }
      }
    }
  }, [languageTypes]);

  const handleLocaleChange = (locale) => {
    localStorage.setItem('lan', locale);
    setSelectedLocale(locale);
    dispatch(fetchTranslationAsync({ data: { language: locale }}));
    setDropdownOpen(false);
  };

  const intlLocale = new Intl.Locale(selectedLocale);
  const langName = new Intl.DisplayNames([selectedLocale], { type: 'language' }).of(
    intlLocale.language
  );

  const otherLocales = languageTypes.filter((loc) => loc !== selectedLocale);

  return (
    <div className="dropdown mr-10 language-selection" data-tooltip-id="lan-tooltip">
      <button
        id="dropdown-btn"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="dropdown-btn"
      >
        <img src={getFlagSrc(intlLocale.region)} alt="" />
        {langName}
        <span className="arrow-down"></span>
      </button>
      {dropdownOpen && (
        <ul id="dropdown-content" className="dropdown-content">
          {otherLocales.map((otherLocale) => {
            const otherIntlLocale = new Intl.Locale(otherLocale);
            const otherLangName = new Intl.DisplayNames([otherLocale], { type: 'language' }).of(
              otherIntlLocale.language
            );

            return (
              <li key={otherLocale} onMouseDown={() => handleLocaleChange(otherLocale)}>
                {otherLangName}
                <img src={getFlagSrc(otherIntlLocale.region)} alt="" />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocaleDropdown;
