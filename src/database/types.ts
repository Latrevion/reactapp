/**
 * paginate  the raw data
 */

export interface PaginateMeta {
    /**
     * The numbers of items on the current page
     */
    itemCount: number;

    /**
     * The total numbers of projects
     */
    totalItems?: number;

    /**
     * The numbers of displays per page
     */
    perPage: number;

    /**
     * Total number of pages
     */
    totalPages?: number;

    /**
     * The current number of pages
     */
    currentPage: number;
}

/**
 * Pagination options
 */
export interface PaginateOptions {
    /**
     * The current number of pages
     */
    page?: number;

    /**
     * The numbers of displays per page
     */
    limit?: number;
}

/**
 * Pagination returns data
 */
export interface PaginateReturn<E extends Record<string, any>> {
    meta: PaginateMeta;
    items: E[];
}

/**
 * Article Type
 */
export interface IPost {
    /**
     * Article ID
     */
    id: string;

    /**
     * Article title
     */
    title: string;

    /**
     * Article content
     */
    body: string;

    /**
     * Article thumb
     */
    thumb: string;

    /**
     * Article summary
     */
    summary?: string;
}
