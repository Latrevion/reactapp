import type { FC } from 'react';

import { PostCreateForm } from './form';
import $styles from './style.module.css';

//Add dynamic marker to force SSR rendering
export const dynamic = 'force-dynamic';
//export const fetchCache = 'force-no-store';

const PostCreatePage: FC = async () => {
    return (
        <div className="tw-page-container">
            <div className={$styles.item}>
                <PostCreateForm></PostCreateForm>
            </div>
        </div>
    );
};

export default PostCreatePage;
