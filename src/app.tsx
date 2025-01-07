import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, App as AntdApp } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { FC } from 'react';

import $styles from './app.module.css';
import Locale from './components/i18n';
import { useLocaleData } from './components/i18n/hooks';
import Setting from './components/setting';
import Theme from './components/theme';
import { useAntdAlgorithm } from './components/theme/hooks';

const px2rem = px2remTransformer();
const Wrapper: FC = () => {
    const locale = useLocaleData();
    const algorithm = useAntdAlgorithm();
    dayjs.locale('zh-cn');
    return (
        <ConfigProvider
            locale={locale.antd}
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
                        <Setting />
                    </div>
                </AntdApp>
            </StyleProvider>
        </ConfigProvider>
    );
};
const App: FC = () => (
    <Locale lang="zh_CN">
        <Theme>
            <Wrapper />
        </Theme>
    </Locale>
);
export default App;
