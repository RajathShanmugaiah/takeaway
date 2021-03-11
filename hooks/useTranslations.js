import { useMemo } from 'react';

const useTranslations = (translations = {}, language = 'de') => {
  const translation = useMemo(() => {
    let t = translations;

    if (typeof t === 'string') {
      t = require(`../config/translations/${translations}.json`);
    }

    if (!t) {
      return {};
    } else if (t[language]) {
      return t[language];
    } else if (t.en) {
      return t.en;
    } else if (Object.keys(t).length) {
      return t[Object.keys(t)[0]];
    } else {
      return {};
    }
  }, [translations, language]);

  return translation;
};

export default useTranslations;
