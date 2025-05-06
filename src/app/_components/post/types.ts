import type { IPost } from '@/database/types';
import type { BaseSyntheticEvent } from 'react';

/**
 * Props for the post creation from component
 */
export interface PostCreateFormProps {
    type: 'create';
    /**
     * Execute animations while the post is being created
     * @param value - The loading state boolean value
     */
    setPedding?: (value: boolean) => void;
}

/**
 * Props for the post update form component
 */
export interface PostUpdateFormProps {
    type: 'update';
    //Original post data ,used as default values to merge with new edited data before updating
    item: IPost;
}

/**
 * Form submission data type for creating a new post
 * Excludes the 'id' field from IPost
 */
export type PostCreateData = Omit<IPost, 'id'>;

/**
 * Form submission data type for updating an existing post
 * Makes all fields optional except 'id'
 */
export type PostUpdateData = Partial<Omit<IPost, 'id'>> & { id: string };

/**
 * Combined type for post action form props(create or update)
 */
export type PostActionFormProps = PostCreateFormProps | PostUpdateFormProps;

/**
 * Combined type for form submission data(create or update)
 */
export type PostFormData = PostCreateData | PostUpdateData;

/**
 * Ref type for the post creation form
 * Used with useImperativeHandle to allow form actions from the parent component
 */
export interface PostCreateFormRef {
    create?: (e?: BaseSyntheticEvent) => Promise<void>;
}
