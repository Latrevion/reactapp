'use client';
import type { FC, MouseEventHandler } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/app/_components/shadcn/ui/alert-dialog';
import { Button } from '@/app/_components/shadcn/ui/button';
import { deletePostItem } from '@/app/actions/post';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const PostDelete: FC<{ id: string }> = ({ id }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const changeOpen = useCallback((value: boolean) => {
        setOpen(value);
    }, []);

    const close: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        e.preventDefault();
        if (!pending) {
            setOpen(false);
        }
    }, []);

    const deleteItem: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (e) => {
            try {
                e.preventDefault();
                setPending(true);
                await deletePostItem(id);
                setPending(false);
                setOpen(false);
            } catch (error) {
                console.error(error);
            }

            //Refresh the page after deleting the article
            router.refresh();
        },
        [id],
    );

    return (
        <AlertDialog open={open} onOpenChange={changeOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <Trash2></Trash2>
                    delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onEscapeKeyDown={(event) => event.preventDefault()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this article?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Permanent deletion only. This action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending} onClick={close}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={deleteItem} disabled={pending}>
                        {pending ? 'Deleting' : 'Confirm'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
