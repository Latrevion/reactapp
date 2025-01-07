import { isNil } from 'lodash';

import { createPersistStore } from '@/libs/store';

import { langs, LangType } from './constants';

export const useLocaleStore = createPersistStore<{
    lang: `${LangType}`;
    changeLang: (name: `${LangType}`) => void;
}>(
    (set) => ({
        lang: langs[0],
        changeLang: (name: `${LangType}`) =>
            set((state) => {
                const item = langs.find((n) => n === name);
                if (!isNil(item)) state.lang = item;
            }),
    }),
    { name: 'locale' },
);
