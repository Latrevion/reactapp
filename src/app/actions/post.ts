'use server';
import type { IPost, PaginateOptions, PaginateReturn } from '@/database/types';

import { readDbFile, resetDbFile } from '@/database/generator';
import { paginate } from '@/database/utils';
import { getRandomInt } from '@/libs/random';
import { isNil } from 'lodash';
import { v4 } from 'uuid';

/**
 *Query the information for the paginated article list
 * @param options
 */
export const queryPostPaginate = async (
    options?: PaginateOptions,
): Promise<PaginateReturn<IPost>> => {
    //Reverse order is used here so that new articles can be ranked first
    const posts = (await readDbFile()).reverse();
    return paginate(posts, { page: 1, limit: 8, ...options });
};

/**
 * Obtain the total number of pages of an article based on the query criteria
 * @param limit
 */
export const queryPostTotalPages = async (limit = 8): Promise<number> => {
    const data = await queryPostPaginate({ page: 1, limit });
    return data.meta.totalPages ?? 0;
};

/**
 * Query article information based on ID
 * @param id
 */
export const queryPostItem = async (id: string): Promise<IPost | null> => {
    const posts = await readDbFile();
    const item = posts.find((post) => post.id === id);
    if (isNil(item)) throw new Error('post not exists!');
    return item;
};

/**
 * Query article information based on ID
 * @param id
 */
export const queryPostItemById = async (id: string): Promise<IPost | null> => {
    const posts = await readDbFile();
    const item = posts.find((post) => post.id === id);
    if (isNil(item)) throw new Error('post not exists！');
    return item;
};

/**
 * New articles
 * @param data
 */
export const createPostItem = async (data: Omit<IPost, 'id'>): Promise<IPost> => {
    const posts = await readDbFile();
    const item: IPost = {
        ...data,
        id: v4(),
        thumb: `/uploads/thumb/post-${getRandomInt(1, 8)}.png`,
    };
    posts.push(item);
    await resetDbFile(posts);
    return item;
};

/**
 * update articles
 * @param id
 * @param data
 */
export const updatePostItem = async (
    id: string,
    data: Partial<Omit<IPost, 'id'>>,
): Promise<IPost | null> => {
    let posts = await readDbFile();
    const item = await queryPostItemById(id);
    if (isNil(item)) return null;
    const result = {
        ...(await queryPostItemById(id)),
        ...data,
    } as IPost;
    posts = posts.map((post) => (post.id === id ? result : post));
    await resetDbFile(posts);
    return result;
};

/**
 * delete article
 * @param id
 */
export const deletePostItem = async (id: string): Promise<IPost | null> => {
    let posts = await readDbFile();
    const item = await queryPostItemById(id);
    if (isNil(item)) return null;
    posts = posts.filter((post) => post.id !== id);
    await resetDbFile(posts);
    return item;
};
