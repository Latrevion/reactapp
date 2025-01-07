import { theme } from 'antd';
import { debounce } from 'lodash';
import { useCallback, useContext, useMemo } from 'react';

import { useStore } from 'zustand';

import { useShallow } from 'zustand/react/shallow';

import { ThemeContext, ThemeMode } from './constants';
import { ThemeState } from './types';

export function useThemeStore() {
    const store = useContext(ThemeContext);
    if (!store) throw new Error('Missing Theme Component in the tree');
    return store;
}

export function useThemeState<T>(selector: (state: ThemeState) => T): T {
    const store = useThemeStore();
    return useStore(store, useShallow(selector));
}

export const useTheme = () =>
    useThemeState((state) => ({ mode: state.mode, compact: state.compact }));

/**
 * 获取Antd主题算法
 */
export const useAntdAlgorithm = () => {
    const { mode, compact } = useTheme();
    return useMemo(() => {
        const result = [compact ? theme.compactAlgorithm : theme.defaultAlgorithm];
        if (mode === 'dark') result.push(theme.darkAlgorithm);
        return result;
    }, [mode, compact]);
};

/**
 * 主题操作函数
 */
export const useThemeActions = () => {
    const dispatch = useThemeState((state) => state.dispatch);
    return {
        changeMode: useCallback(
            // 防抖限制，防止快速操作
            debounce(
                (v: `${ThemeMode}`) => () => dispatch({ type: 'change_mode', value: v }),
                100,
                {},
            ),
            [],
        ),
        toggleMode: useCallback(
            debounce(() => dispatch({ type: 'toggle_mode' }), 100, {}),
            [],
        ),
        changeCompact: useCallback(
            (v: boolean) => dispatch({ type: 'change_compact', value: v }),
            [],
        ),
        toggleCompact: useCallback(() => dispatch({ type: 'toggle_compact' }), []),
    };
};
