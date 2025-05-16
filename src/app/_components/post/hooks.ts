'use client';

import type { IPost } from '@/database/types';
import type { DeepNonNullable } from 'utility-types';

import { createPostItem, updatePostItem } from '@/app/actions/post';
import { isNil, trim } from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import type { PostCreateData, PostFormData, PostUpdateData } from './types';

/**
 * Generate react-hook-form state
 * Currently,only default data is passed to useForm.In the future, I will add zod validation and other parameters
 * @param params
 */
export const usePostActionForm = (params: { type: 'create' } | { type: 'update'; item: IPost }) => {
    //Define default data
    const defaultValues = useMemo(() => {
        if (params.type === 'create') {
            return {
                title: 'Article Title',
                body: 'Article Content',
                summary: '',
            } as DeepNonNullable<PostCreateData>;
        }

        return {
            title: params.item.title,
            body: params.item.body,
            summary: isNil(params.item.summary) ? '' : params.item.summary,
        } as DeepNonNullable<PostUpdateData>;
    }, [params.type]);
    return useForm<DeepNonNullable<PostFormData>>({ defaultValues });
};

/**
 * Generate a form submit handler hook for data operations
 * @param params
 */
export const usePostFormSubmitHandler = (
    params: { type: 'create' } | { type: 'update'; id: string },
) => {
    const router = useRouter();
    return useCallback(
        async (data: PostFormData) => {
            let post: IPost | null;

            //Remove empty string fields from data
            for (const key of Object.keys(data) as Array<keyof PostFormData>) {
                const value = data[key];

                if (typeof value === 'string' && !trim(value, '')) {
                    delete data[key];
                }
            }

            try {
                //Update post
                if (params.type === 'update') {
                    post = await updatePostItem(params.id, data as PostUpdateData);
                } else {
                    //Create post
                    post = await createPostItem(data as PostCreateData);
                }
                //After creating or updating,redirect to the post detail page
                //Note:Do not use push here, to prevent returning to the create/edit modal when going back from the detail page.
                if (!isNil(post)) router.replace(`/posts/${post.id}`);
            } catch (error) {
                console.log('error', error);
            }
        },
        [{ ...params }],
    );
};
