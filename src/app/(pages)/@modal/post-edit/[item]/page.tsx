import type { FC } from 'react';

import { PageModal } from '@/app/_components/modal/page-modal';
import { isNil } from 'lodash';
import { notFound } from 'next/navigation';

import { PostEditForm } from './form';

const PostEditPage: FC<{ params: Promise<{ item: string }> }> = async ({ params }) => {
    const { item } = await params;
    if (isNil(item)) return notFound();

    return (
        <PageModal
            title="edit post"
            match={['/post-edit/*']}
            className="tw-min-w-full lg:tw-min-w-[60%]"
        >
            <PostEditForm id={item}></PostEditForm>
        </PageModal>
    );
};

export default PostEditPage;
