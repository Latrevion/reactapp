'use server';

import { getRandomInt } from '@/libs/random';
import fs, { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { v4 } from 'uuid';

import type { IPost } from './types';

import { faker } from './utils';

//Get the directory of the current file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Initial data, generate 22 articles
 */
const posts: IPost[] = [...Array.from({ length: 22 })].map(() => ({
    //generate uuid
    id: v4(),
    //random thumb
    thumb: `/uploads/thumb/post-${getRandomInt(1, 8)}.png`,
    //generate 1-3 title
    title: faker.lorem.paragraph({ min: 1, max: 3 }),
    //generate 3 -6 paragraphs
    body: faker.lorem.paragraphs(getRandomInt(3, 6), '\n'),
    //49% generate summary
    summary: Math.random() < 0.5 ? faker.lorem.text() : undefined,
}));

/**
 * Detects the database file ,creates and writes the initial data if it does not exist
 */
const checkDbFile = async () => {
    const dbPath = resolve(__dirname, 'db.json');
    if (!existsSync(dbPath)) {
        const json = JSON.stringify(posts);
        writeFileSync(dbPath, json);
    }
};

/**
 * Read the article data in the database file
 */
export const readDbFile = async (): Promise<IPost[]> => {
    //Check the database file first,and create and write the initial data if it  does not exist
    await checkDbFile();
    const dbPath = resolve(__dirname, 'db.json');
    const data = readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

/**
 * Rewrite the database file
 * @param data
 */
export const resetDbFile = async (data: IPost[]) => {
    //Check the database file first , and create and write the initial data if if does not exist
    await checkDbFile();
    const dbPath = resolve(__dirname, 'db.json');
    const json = JSON.stringify(data);
    fs.writeFileSync(dbPath, json);
};
