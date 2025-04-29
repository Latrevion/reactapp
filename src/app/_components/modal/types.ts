import type { PropsWithChildren } from 'react';

/**
 * The parameter type of the page pop-up box
 */
export type PageModalProps = PropsWithChildren<{
    /**
     * Pop-up box title
     */
    title: string;
    /**
     * Matching routes (pop-ups are only possible if the current route is included in this option)
     */
    match: string[];
    /**
     * Custom DialogContent style class
     */
    className?: string;
}>;

export interface EditorModalState {
    editorFullScreen?: (value: boolean) => void;
}
