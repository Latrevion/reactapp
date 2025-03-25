import { base, en, Faker, zh_CN } from '@faker-js/faker';
import { isNil } from 'lodash';

import type { PaginateOptions, PaginateReturn } from './types';

/**
 * Data pagination functions
 * @param data
 * @param options
 */

export const paginate = async <T extends Record<string, any>>(
    data: T[],
    options: PaginateOptions,
): Promise<PaginateReturn<T>> => {
    //if the amount of data per page is less than 1,set to one piece of data per page
    const limit = isNil(options.limit) || options.limit < 1 ? 1 : options.limit;
    //if the current page is less than 1,set the current page as the first page
    const page = isNil(options.page) || options.page < 1 ? 1 : options.page;
    //The starting data cursor starts from the first data if the page is the first page ,and starts from the first data on the current page if it is larger than the first page
    const start = page > 1 ? (page - 1) * limit + 1 : 0;
    const items = data.slice(start, start + limit);
    //Total pages
    const totalPages =
        data.length % limit === 0
            ? Math.floor(data.length / limit)
            : Math.floor(data.length / limit) + 1;
    //Calculate the amount of data on the last page
    const remainder = data.length % limit !== 0 ? data.length % limit : limit;
    //The amount of data on the current page is derived from the amount of data on the last page
    const itemCount = page < totalPages ? limit : remainder;
    return {
        items,
        meta: {
            totalItems: data.length,
            itemCount,
            perPage: limit,
            totalPages,
            currentPage: page,
        },
    };
};

/**
 * create faker instance
 */
export const faker = new Faker({
    locale: [zh_CN, en, base],
});
