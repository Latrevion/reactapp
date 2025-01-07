import { Calendar, Select, Switch } from 'antd';
import { FC } from 'react';

import { langs } from '../i18n/constants';
import { localeData } from '../i18n/data';
import { useLocale, useLocaleChange } from '../i18n/hooks';
import { useTheme, useThemeActions } from '../theme/hooks';

import $styles from './style.module.css';

const ThemeSetting: FC = () => {
    const { mode, compact } = useTheme();
    const { toggleMode, toggleCompact } = useThemeActions();
    return (
        <>
            <Switch
                checkedChildren="🌛"
                unCheckedChildren="☀️"
                onChange={toggleMode}
                checked={mode === 'dark'}
                defaultChecked={mode === 'dark'}
            />
            <Switch
                checkedChildren="紧凑"
                unCheckedChildren="正常"
                onChange={toggleCompact}
                checked={compact}
                defaultChecked={compact}
            />
        </>
    );
};

export const LocaleSetting: FC = () => {
    const locale = useLocale();
    const changeLocale = useLocaleChange();
    return (
        <Select defaultValue={locale} style={{ width: 120 }} onChange={changeLocale}>
            {langs.map((name) => (
                <Select.Option key={name} value={name}>
                    {localeData[name].label}
                </Select.Option>
            ))}
        </Select>
    );
};

const Setting: FC = () => (
    <div className={$styles.container}>
        <h2 className="tw-text-center">Setting Demo</h2>
        <div className="tw-flex tw-items-center tw-flex-col">
            <div className="tw-flex-auto tw-mb-5">
                <ThemeSetting />
            </div>
            <div className="tw-flex-auto tw-mb-5">
                <LocaleSetting />
            </div>
            <div className="tw-max-w-md">
                <Calendar fullscreen={false} />
            </div>
        </div>
    </div>
);
export default Setting;
