import { useMemo } from 'react';

import { localeData } from './data';
import { useLocaleStore } from './store';
// fetch language
export const useLocale = () => useLocaleStore((state) => state.lang);

// change language
export const useLocaleChange = () => useLocaleStore((state) => state.changeLang);

// fetch Antd language
export const useLocaleData = () => {
    const lang = useLocale();
    return useMemo(() => localeData[lang], [lang]);
};
