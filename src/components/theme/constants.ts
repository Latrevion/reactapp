import { createContext } from 'react';

import { ThemeOptions, ThemeStoreType } from './types';

/**
 * 主题模式
 */
export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
}

/**
 * 主题操作类型
 */
export enum ThemeActions {
    // 切换主题黑亮
    CHANGE_MODE = 'change_mode',
    // 反转主题黑亮
    TOOGLE_MODE = 'toggle_mode',
    // 切换紧凑主题
    CHANGE_COMPACT = 'change_compact',
    // 反转紧凑主题
    TOOGLE_COMPACT = 'toggle_compact',
}

/**
 * 默认配置
 */
export const defaultThemeOptions: ThemeOptions = {
    mode: 'light',
    compact: false,
};

export const ThemeContext = createContext<ThemeStoreType>(null);
