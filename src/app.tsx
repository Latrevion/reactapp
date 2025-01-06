import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { FC, useMemo } from 'react';

import $styles from './app.module.css';
import { CallbackDemo } from './demo/callback';
import { localeData } from './demo/constants';
import ContextDemo, { Locale } from './demo/context';
import CustomDemo from './demo/custom';
import EffectDemo from './demo/effect';
import { useLocale, useTheme } from './demo/hooks';
import MemoDemo from './demo/memo';
import ReducerDemo, { Theme } from './demo/reducer';
import RefDemo from './demo/ref';
import StateDemo from './demo/state';
import { Counter1 } from './demo/zustand_demo';

const px2rem = px2remTransformer();
const Wrapper: FC = () => {
    const locale = useLocale();
    const antdLocaleData = useMemo(() => {
        if (!Object.keys(localeData).find((v) => v === locale.name)) {
            return localeData[0];
        }
        return localeData[locale.name];
    }, [locale.name]);
    const themeState = useTheme();
    const algorithm = useMemo(() => {
        const result = [themeState.compact ? theme.compactAlgorithm : theme.defaultAlgorithm];
        if (themeState.mode === 'dark') result.push(theme.darkAlgorithm);
        return result;
    }, [themeState]);
    return (
        <ConfigProvider
            locale={antdLocaleData}
            theme={{
                algorithm,
                // 启用css变量
                cssVar: true,
                hashed: false,
                token: {},
            }}
        >
            <StyleProvider layer transformers={[px2rem]}>
                <AntdApp>
                    <div className={$styles.app}>
                        <StateDemo />
                        <EffectDemo />
                        <RefDemo />
                        <MemoDemo />
                        <CallbackDemo />
                        <ContextDemo />
                        <ReducerDemo />
                        <CustomDemo />
                        <Counter1 />
                    </div>
                </AntdApp>
            </StyleProvider>
        </ConfigProvider>
    );
};
const App: FC = () => (
    <Locale>
        <Theme>
            <Wrapper />
        </Theme>
    </Locale>
);
export default App;
