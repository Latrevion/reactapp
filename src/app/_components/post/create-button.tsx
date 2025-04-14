'use client';

import { isNil } from 'lodash';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { type FC, Suspense, useMemo } from 'react';

import { Button as CNButton } from '../shadcn/ui/button';

export const Button: FC = () => {
    const searchParams = useSearchParams();
    const getUrlQuery = useMemo(() => {
        const query = new URLSearchParams(searchParams.toString()).toString();
        //The URL query that retains the current pagination will not cause the page list on the homepage to reset the pagination after opening the created article
        return isNil(query) || query.length < 1 ? '' : `?${query}`;
    }, [searchParams]);
    return (
        <CNButton asChild className="ts-justify-end tw-ml-auto tw-rounded-sm" variant="outline">
            <Link href={`/posts/create${getUrlQuery}`}>
                <Plus />
                Create
            </Link>
        </CNButton>
    );
};

export const PostCreateButton: FC = () => {
    return (
        <Suspense>
            <Button></Button>
        </Suspense>
    );
};
