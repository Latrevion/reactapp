'use server';

import { getRandomInt } from "@/libs/random";
import fs,{existsSync,readFileSync,writeFileSync}from 'node:fs';
import path ,{resolve} from 'node:path';
import { fileURLToPath } from "node:url";
import { v4 } from "uuid";
import type { IPost } from "./types";
import {faker}from './utils';

//Get the directory of the current file 
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initial data, generate 22 articles
const posts:Ipost[] = [...Array.from({length:22})].map(()=>({
  //generate uuid
  id:v4(),
  //random thumb 
  thumb:`/uploads/thumb/post-${getRandomInt(1,8).png}`,
  //generate 1-3 title
  title:faker.lorem.paragraph({min:1,max:3}),
  //generate 3 -6 paragraphs 
  body:faker.lorem.paragraphss(getRandomInt(3,6),'\n'),
  //49% generate summary
  summary:Math.random()<0.5?faker.lorem.text():undefined,
}));