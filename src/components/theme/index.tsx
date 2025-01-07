import { isNil } from 'lodash';
import { FC, PropsWithChildren, ReactNode, useRef } from 'react';
import { useLifecycles } from 'react-use';

import { ThemeContext } from './constants';
import { useThemeStore } from './hooks';
import { createThemeStore } from './store';
import { ThemeOptions, ThemeStoreType } from './types';

const ThemeSubscriber: FC<{ children?: ReactNode }> = ({ children }) => {
    const store = useThemeStore();
    let unSub: () => void;
    useLifecycles(
        () => {
            store.subscribe(
                (state) => state.mode,
                (m) => {
                    const body = document.getElementsByTagName('body');
                    if (body.length) {
                        body[0].classList.remove('light');
                        body[0].classList.remove('dark');
                        body[0].classList.add(m === 'dark' ? 'dark' : 'light');
                    }
                },
                {
                    fireImmediately: true,
                },
            );
        },
        () => {
            if (!isNil(unSub)) unSub();
        },
    );
    return <>{children}</>;
};

const Theme: FC<PropsWithChildren<Partial<ThemeOptions>>> = ({ children, ...props }) => {
    const storeRef = useRef<ThemeStoreType>();
    if (!storeRef.current) {
        storeRef.current = createThemeStore(props);
    }
    return (
        <ThemeContext.Provider value={storeRef.current}>
            <ThemeSubscriber>{children}</ThemeSubscriber>
        </ThemeContext.Provider>
    );
};
export default Theme;
