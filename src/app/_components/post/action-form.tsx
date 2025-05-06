'use client';

import { forwardRef } from 'react';

import type { PostActionFormProps, PostCreateFormRef } from './types';

export const PostActionForm = forwardRef<PostCreateFormRef, PostActionFormProps>(
    (props, ref) => {},
);
