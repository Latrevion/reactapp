'use client';

import type { FC } from 'react';

import { PostCreateButton } from '../post/create-button';
import { BackButton } from './back-button';
import $style from './tools.module.css';

export const Tools: FC<{ back?: boolean }> = ({ back }) => {
    return (
        <div className={$style.tools}>
            {back && <BackButton></BackButton>}
            <PostCreateButton />
        </div>
    );
};
