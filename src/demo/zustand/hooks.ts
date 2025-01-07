import { useContext } from 'react';

import { useStore } from 'zustand';

import { useShallow } from 'zustand/react/shallow';

import { LayoutContext } from './constants';
import { LayoutState } from './types';

export function useLayoutContext<T>(selector: (state: LayoutState) => T): T {
    const store = useContext(LayoutContext);
    if (!store) throw new Error('Missing LayoutContext.Provider in the tree');
    return useStore(store, useShallow(selector));
}
