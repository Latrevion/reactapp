/**
 * APi for data pagination query conditions
 */

export type IPaginateQueryProps<T extends Record<string, any> = Record<never, never>> = {
    page?: number;
    limit?: number;
} & T;
