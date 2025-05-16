'use client';

import { isNil } from 'lodash';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

import type { PostActionFormProps, PostCreateFormRef } from './types';

import { Details } from '../collapsible/details';
import { Button } from '../shadcn/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../shadcn/ui/form';
import { Input } from '../shadcn/ui/input';
import { Textarea } from '../shadcn/ui/textarea';
import { usePostActionForm, usePostFormSubmitHandler } from './hooks';
export const PostActionForm = forwardRef<PostCreateFormRef, PostActionFormProps>((props, ref) => {
    const form = usePostActionForm(
        props.type === 'create' ? { type: props.type } : { type: props.type, item: props.item },
    );

    const submitHandler = usePostFormSubmitHandler(
        props.type === 'create' ? { type: 'create' } : { type: 'update', id: props.item.id },
    );

    useEffect(() => {
        if (props.type === 'create' && !isNil(props.setPedding))
            props.setPedding(form.formState.isSubmitting);
    }, [form.formState.isSubmitting]);

    useImperativeHandle(
        ref,
        () => (props.type === 'create' ? { create: form.handleSubmit(submitHandler) } : {}),
        [props.type],
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="tw-space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Article title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="please enter a title"
                                    disabled={form.formState.isSubmitting}
                                ></Input>
                            </FormControl>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                ></FormField>

                <Details summary="Optional fields" defaultOpen>
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem className="tw-mt-2 tw-border-b tw-border-dashed tw-pb-1">
                                <FormLabel>Summary</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="please enter a summary"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormDescription>
                                    The summary appears on the article list page
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                </Details>
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Article Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="please enter a content"
                                    {...field}
                                    className="tw-min-h-80"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {props.type === 'update' && (
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Updating...' : 'Save'}
                    </Button>
                )}
            </form>
        </Form>
    );
});
