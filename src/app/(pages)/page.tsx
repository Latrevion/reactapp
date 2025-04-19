import type { FC } from 'react';

import Link from 'next/link';

import $styles from './page.module.css';

const HomePage: FC = async () => {
    return (
        <div className="tw-page-container">
            <div className={$styles.block}>
                <span>Welcome,this is Next.js</span>
                <Button asChild>
                    <Link href="https://nextjs.org/" target="_blank">
                        <ArrowBigRight /> nextjs.org
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
