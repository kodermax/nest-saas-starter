import { useTranslation } from 'react-i18next';
// components
import { useSettingsContext } from '../components/settings';
//
import { allLangs, defaultLang } from './config';

// ----------------------------------------------------------------------

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();

  const { onChangeDirectionByLang } = useSettingsContext();

  const langStorage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : '';

  const currentLang = allLangs.find((_lang) => _lang.value === langStorage) || defaultLang;

  const handleChangeLanguage = (newlang: string) => {
    i18n.changeLanguage(newlang);
    onChangeDirectionByLang(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text: any, options?: any) => translate(text, options),
    currentLang,
    allLangs,
  };
}
