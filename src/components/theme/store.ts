import { produce } from 'immer';
import { Reducer } from 'react';

import { createPersistReduxStore } from '@/libs/store';

import { defaultThemeOptions } from './constants';
import { ThemeDispatchs, ThemeOptions } from './types';

/**
 * 创建reducer
 */
const ThemeReducer: Reducer<ThemeOptions, ThemeDispatchs> = produce((draft, action) => {
    switch (action.type) {
        case 'change_mode':
            draft.mode = action.value;
            break;
        case 'toggle_mode':
            draft.mode = draft.mode === 'dark' ? 'light' : 'dark';
            break;
        case 'change_compact':
            draft.compact = action.value;
            break;
        case 'toggle_compact':
            draft.compact = !draft.compact;
            break;
        default:
            break;
    }
});

/**
 * 状态池创建函数
 */
export const createThemeStore = (options: Partial<ThemeOptions> = {}) =>
    createPersistReduxStore(
        ThemeReducer,
        { ...defaultThemeOptions, ...options },
        {
            name: 'theme',
            partialize: (state) => ({ mode: state.mode, compact: state.compact }),
        },
    );
