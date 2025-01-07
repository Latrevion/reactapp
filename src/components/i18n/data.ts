import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

import { LangType } from './constants';
import { LocaleItem } from './types';

export const localeData: Record<`${LangType}`, LocaleItem> = {
    en_US: {
        label: 'us english(US)',
        antd: enUS,
    },
    zh_CN: {
        label: 'cn 简体中文',
        antd: zhCN,
    },
};
