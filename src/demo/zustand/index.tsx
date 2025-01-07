import { Layout as AntdLayout, Menu as AntdMenu, Select, Switch, theme } from 'antd';
import { default as AntdSider } from 'antd/es/layout/Sider';
import {
    Content as AntdContent,
    Footer as AntdFooter,
    Header as AntdHeader,
} from 'antd/es/layout/layout';
import clsx from 'clsx';
import { FC, PropsWithChildren, useCallback, useRef } from 'react';

import { DeepPartial } from 'utility-types';

import $styles from '../style.module.css';

import { LayoutContext, LayoutMode } from './constants';
import { useLayoutContext } from './hooks';
import { createLayoutStore } from './store';
import { LayoutOptions, LayoutStoreType } from './types';

/**
 * 生成一些菜单数据
 */
const items = new Array(15).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));

/**
 * 菜单组件
 */
const Menu: FC = () => {
    const mode = useLayoutContext((s) => s.mode);
    const { header, sidebar } = useLayoutContext((s) => ({ ...s.theme }));
    return (
        <AntdMenu
            // 当顶栏菜单时，菜单颜色跟随header，否则跟随sidebar
            theme={mode === 'top' ? header : sidebar}
            mode={mode === 'top' ? 'horizontal' : 'inline'}
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
        />
    );
};

/**
 * 侧边栏组件
 */
const Sider: FC = () => {
    const mode = useLayoutContext((s) => s.mode);
    const { sidebar } = useLayoutContext((s) => ({ ...s.theme }));
    const {
        // colorBgContainer 就是白色
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <AntdSider style={{ background: sidebar === 'dark' ? '' : colorBgContainer }}>
            {mode === 'side' && (
                <div className="tw-bg-slate-500 tw-w-3/4 tw-h-10 tw-mx-auto tw-my-7" />
            )}
            <Menu />
        </AntdSider>
    );
};

const Header: FC = () => {
    const mode = useLayoutContext((s) => s.mode);
    const { header } = useLayoutContext((s) => ({ ...s.theme }));
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <AntdHeader
            style={{ background: header === 'dark' ? '' : colorBgContainer }}
            className="tw-flex tw-items-center tw-px-0"
        >
            {mode !== 'side' && <div className="tw-bg-slate-500 tw-w-44 tw-h-10 tw-mx-3" />}
            {mode === 'top' && <Menu />}
        </AntdHeader>
    );
};

/**
 * 内容组件
 */
const Content: FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <AntdLayout className="tw-p-6">
            <AntdContent
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                Content
            </AntdContent>
        </AntdLayout>
    );
};

/**
 * 底部组件
 */
const Footer: FC = () => (
    <AntdFooter style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </AntdFooter>
);

/**
 * 布局模式控制组件
 */
const ModeCtrol: FC = () => {
    const mode = useLayoutContext((s) => s.mode);
    const changeMode = useLayoutContext((s) => s.changeMode);
    return (
        <Select defaultValue={mode} style={{ width: 300 }} onChange={changeMode}>
            <Select.Option value={LayoutMode.SIDE}>左栏菜单【LOGO在边栏】</Select.Option>
            <Select.Option value={LayoutMode.CONTENT}>左栏菜单【LOGO在顶栏】</Select.Option>
            <Select.Option value={LayoutMode.TOP}>顶栏菜单</Select.Option>
        </Select>
    );
};

/**
 * 顶栏和侧边栏控制组件
 */
const ThemeCtrol: FC = () => {
    const { header, sidebar } = useLayoutContext((s) => ({ ...s.theme }));
    const changeTheme = useLayoutContext((s) => s.changeTheme);
    const changeSidebarTheme = useCallback(
        (value: boolean) => changeTheme({ sidebar: value ? 'dark' : 'light' }),
        [],
    );
    const changeHeaderTheme = useCallback(
        (value: boolean) => changeTheme({ header: value ? 'dark' : 'light' }),
        [],
    );
    return (
        <>
            <div>
                <span>切换侧边栏主题：</span>
                <Switch
                    checkedChildren="🌛"
                    unCheckedChildren="☀️"
                    onChange={changeSidebarTheme}
                    checked={sidebar === 'dark'}
                    defaultChecked={sidebar === 'dark'}
                />
            </div>
            <span>切换顶栏主题：</span>
            <Switch
                checkedChildren="🌛"
                unCheckedChildren="☀️"
                onChange={changeHeaderTheme}
                checked={header === 'dark'}
                defaultChecked={header === 'dark'}
            />
        </>
    );
};

export const LayoutProvider: FC<PropsWithChildren<DeepPartial<LayoutOptions>>> = ({
    children,
    ...props
}) => {
    const storeRef = useRef<LayoutStoreType>();
    if (!storeRef.current) {
        storeRef.current = createLayoutStore(props);
    }
    return <LayoutContext.Provider value={storeRef.current}>{children}</LayoutContext.Provider>;
};
/**
 * 布局组件
 */
export const ZustandDemo: FC = () => {
    const mode = useLayoutContext((s) => s.mode);

    return (
        <div className="tw-flex tw-flex-auto tw-justify-center tw-items-center tw-flex-col">
            <div className={clsx($styles.container, 'tw-w-[100rem] tw-flex tw-justify-between')}>
                <ModeCtrol />
                <ThemeCtrol />
            </div>
            <div className={clsx($styles.container, 'tw-w-[100rem]')}>
                <AntdLayout>
                    {mode !== 'side' && <Header />}
                    {mode === 'side' && <Sider />}
                    <AntdLayout>
                        {mode === 'side' && <Header />}
                        {mode === 'content' && <Sider />}
                        {mode !== 'content' && <Content />}
                        {mode !== 'content' && <Footer />}
                        {mode === 'content' && (
                            <AntdLayout>
                                <Content />
                                <Footer />
                            </AntdLayout>
                        )}
                    </AntdLayout>
                </AntdLayout>
            </div>
        </div>
    );
};

export const ZustandDemoProvider: FC<PropsWithChildren<DeepPartial<LayoutOptions>>> = ({
    children,
    ...props
}) => {
    const storeRef = useRef<LayoutStoreType>();
    if (!storeRef.current) {
        storeRef.current = createLayoutStore(props);
    }
    return <LayoutContext.Provider value={storeRef.current}>{children}</LayoutContext.Provider>;
};
