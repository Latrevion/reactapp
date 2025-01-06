import { create, StateCreator } from 'zustand';
import {
    subscribeWithSelector,
    devtools,
    persist,
    PersistOptions,
    DevtoolsOptions,
    redux,
} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
}

export const useStore1 = create<CounterState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));

/**
 * 创建包含订阅，immer以及devtoools功能的普通状态商店
 * @param creator
 * @param devtoolsOptions
 */
export const createStore = <T extends object>(
    creator: StateCreator<
        T,
        [
            ['zustand/subscribeWithSelector', never],
            ['zustand/immer', never],
            ['zustand/devtools', never],
        ]
    >,
    devtoolsOptions?: DevtoolsOptions,
) => {
    return create<T>()(subscribeWithSelector(immer(devtools(creator, devtoolsOptions))));
};

/**
 * 创建包含订阅，immer以及devtoools功能的普通状态商店
 * 同时支持自动存储到客户端，默认存储到localstorage
 * @param creator
 * @param persistOptions
 * @param devtoolsOptions
 */
export const createPersistStore = <T extends object, P = T>(
    creator: StateCreator<
        T,
        [
            ['zustand/subscribeWithSelector', never],
            ['zustand/immer', never],
            ['zustand/devtools', never],
            ['zustand/persist', P],
        ]
    >,
    persistOptions: PersistOptions<T, P>,
    devtoolsOptions?: DevtoolsOptions,
) => {
    return create<T>()(
        subscribeWithSelector(
            immer(devtools(persist(creator as unknown as any, persistOptions), devtoolsOptions)),
        ),
    );
};

/**
 * 创建包含订阅，immer以及devtoools功能的reducer状态商店
 * 同时支持自动存储到客户端，默认存储到localstorage
 * @param reducer
 * @param initialState
 * @param devtoolsOptions
 */
export const createReduxStore = <
    T extends object,
    A extends {
        type: string;
    },
>(
    reducer: (state: T, action: A) => T,
    initialState: T,
    devtoolsOptions?: DevtoolsOptions,
) => create(subscribeWithSelector(immer(devtools(redux(reducer, initialState), devtoolsOptions))));

/**
 * 创建包含订阅，immer以及devtoools功能的reducer状态商店
 * @param reducer
 * @param initialState
 * @param persistOptions
 * @param devtoolsOptions
 */
export const createPersistReduxStore = <
    T extends object,
    A extends {
        type: string;
    },
    P = T,
>(
    reducer: (state: T, action: A) => T,
    initialState: T,
    persistOptions: PersistOptions<T, P>,
    devtoolsOptions?: DevtoolsOptions,
) =>
    create(
        subscribeWithSelector(
            immer(
                devtools(
                    persist(redux(reducer, initialState), persistOptions as any),
                    devtoolsOptions,
                ),
            ),
        ),
    );
