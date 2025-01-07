import { isNil } from 'lodash';
import { FC, PropsWithChildren } from 'react';

import { LangType } from './constants';
import { useLocaleChange } from './hooks';

const Locale: FC<PropsWithChildren & { lang: `${LangType}` }> = ({ children, lang }) => {
    const changeLocale = useLocaleChange();
    if (!isNil(changeLocale)) changeLocale(lang);
    return <>{children}</>;
};
export default Locale;
