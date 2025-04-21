import type { FC } from 'react';

import { queryPostTotalPages } from '@/app/actions/post';

import { SimplePaginate } from '../paginate/simple';

export const PostListPaginate: FC<{ limit: number; page: number }> = async ({ limit, page }) => {
    const totalPages = await queryPostTotalPages(limit);
    return (
        <div className="tw-mb-5 tw-w-full tw-flex-none">
            <SimplePaginate currentPage={page} totalPages={totalPages}></SimplePaginate>
        </div>
    );
};
