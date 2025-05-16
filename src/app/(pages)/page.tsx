import type { FC } from 'react';

import { isNil } from 'lodash';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import type { IPaginateQueryProps } from '../_components/paginate/types';

import { Tools } from '../_components/home/tools';
import { PostActionButtons } from '../_components/post/list';
import { PostListPaginate } from '../_components/post/paginate';
import { queryPostPaginate } from '../actions/post';
import $styles from './page.module.css';

const HomePage: FC<{ searchParams: Promise<IPaginateQueryProps> }> = async ({ searchParams }) => {
    const { page: currentPage, limit = 8 } = await searchParams;
    //if no current page is passed in or the current page is less than 1,set to page 1;
    const page = isNil(currentPage) || Number(currentPage) < 1 ? 1 : Number(currentPage);
    const { items, meta } = await queryPostPaginate({ page: Number(page), limit });

    if (meta.totalPages && meta.totalPages > 0 && page > meta.totalPages) {
        return redirect('/');
    }

    return (
        <div className="tw-page-container">
            <Tools></Tools>
            <div className={$styles.list}>
                {items.map((item) => (
                    <div
                        className={$styles.item}
                        style={{ '--bg-img': `url(${item.thumb})` } as any}
                        key={item.id}
                    >
                        <Link className={$styles.thumb} href={`/posts/${item.id}`}>
                            <Image
                                src={item.thumb}
                                alt={item.title}
                                fill
                                priority
                                sizes="100%"
                                unoptimized
                            ></Image>
                        </Link>
                        <div className={$styles.content}>
                            <div className={$styles.title}>
                                <Link href={`/posts/${item.id}`}>
                                    <h2 className="tw-ellips tw-animate-decoration tw-animate-decoration-lg">
                                        {item.title}
                                    </h2>
                                </Link>
                            </div>
                            <div className={$styles.summary}>
                                {isNil(item.summary) ? item.body.substring(0, 99) : item.summary}
                            </div>
                            <div className={$styles.footer}>
                                <div className={$styles.meta}>
                                    <span>
                                        <Calendar />
                                    </span>
                                    <time className="tw-ellips">2025-4-20</time>
                                </div>
                                <PostActionButtons id={item.id} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {meta.totalPages! > 1 && <PostListPaginate limit={8} page={page}></PostListPaginate>}
        </div>
    );
};

export default HomePage;
