// src/libs/random.ts
/**
 * Get a random integer less than N
 * @param count
 */
export const getRandomMin = (count: number) => Math.floor(Math.random() * count);

/**
 * Get a random integer between min and max
 * @param min
 * @param max
 */
export const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

/**
 * Generate a fixed-length string containing only letters
 * @param length
 */
export const getRandomCharString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

/**
 * Get a random item from the list
 * @param list
 */
export const getRandItemData = <T>(list: T[]) => {
    return list[getRandomMin(list.length)];
};

/**
 *  Get multiple random items from a list form a new list
 * @param list
 */
export const getRandListData = <T>(list: T[]) => {
    const result: T[] = [];
    for (let i = 0; i < getRandomMin(list.length); i++) {
        const random = getRandItemData<T>(list);
        const canPush = !result.find((item) => {
            if ('id' in (random as Record<string, any>)) {
                const check = random as Record<string, any>;
                const current = item as Record<string, any>;
                return current.id === check.id;
            }
            return item === random;
        });
        if (canPush) result.push(random);
    }
    return result;
};
