'use client';

import type { PostCreateFormRef } from '@/app/_components/post/types';
import type { FC, MouseEventHandler } from 'react';

import { BackButton } from '@/app/_components/home/back-button';
import { PostActionForm } from '@/app/_components/post/action-form';
import { Button } from '@/app/_components/shadcn/ui/button';
import { Save } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import $styles from './style.module.css';

export const PostCreateForm: FC = () => {
    const ref = useRef<PostCreateFormRef | null>(null);
    const [pending, setPending] = useState(false);
    const changePending = useCallback((value: boolean) => {
        setPending(value);
    }, []);
    const createPost = useCallback<MouseEventHandler<HTMLButtonElement>>(async (e) => {
        e.preventDefault();
        ref.current?.create && (await ref.current?.create());
    }, []);
    return (
        <>
            <div className={$styles.actions}>
                <BackButton></BackButton>
                <Button onClick={createPost} disabled={pending}>
                    {pending ? 'Saving...' : 'Save'}
                    <Save></Save>
                </Button>
            </div>
            <PostActionForm ref={ref} type="create" setPedding={changePending}></PostActionForm>
        </>
    );
};
