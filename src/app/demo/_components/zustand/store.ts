/**
 * 状态池创建函数
 */
import type { DeepPartial } from 'utility-types';

import { deepMerge } from '@/libs/utils';
import { isNil } from 'lodash';
import { createStore } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { LayoutOptions, LayoutState } from './types';

export const createLayoutStore = (options: DeepPartial<LayoutOptions> = {}) =>
    createStore<LayoutState>()(
        subscribeWithSelector(
            immer(
                devtools(
                    persist(
                        (set) => ({
                            ...deepMerge<LayoutOptions, DeepPartial<LayoutOptions>>(
                                {
                                    mode: 'side',
                                    theme: {
                                        header: 'light',
                                        sidebar: 'dark',
                                    },
                                },
                                options,
                                'replace',
                            ),
                            changeMode: (value) => set(() => ({ mode: value })),
                            changeTheme: (value) =>
                                set((state) => {
                                    if (!isNil(value.sidebar)) {
                                        state.theme.sidebar = value.sidebar;
                                        state.theme.header =
                                            state.theme.sidebar === 'light' ? 'dark' : 'light';
                                    } else if (!isNil(value.header)) {
                                        state.theme.header = value.header;
                                        state.theme.sidebar =
                                            state.theme.header === 'light' ? 'dark' : 'light';
                                    }
                                }),
                        }),
                        {
                            name: 'zustand-demo',
                        },
                    ),
                    { name: 'zustandDemo' },
                ),
            ),
        ),
    );
/**
 * 创建布局状态池
 */
// const useLayoutStore = createLayoutStore();
// useLayoutStore.subscribe(
//     (state) => state.theme,
//     (value, _) => {
//         console.log(value);
//     },
//     {
//         equalityFn: shallow,
//         fireImmediately: true,
//     },
// );
// export { useLayoutStore };
