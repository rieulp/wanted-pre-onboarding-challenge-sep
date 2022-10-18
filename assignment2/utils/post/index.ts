import path from 'path';
import { promises as fs } from 'fs';
import fm from 'front-matter';

export interface IPostMeta {
  title: string;
  date: string;
  description: string;
  id: string;
  tags: string[];
  categories: string[];
}

export interface IPost {
  fileName: string;
  meta: IPostMeta;
  content: string;
}

let cachePosts: IPost[] | null;

export const getPostIds = async (): Promise<string[]> => {
  const postDirectory = path.join(process.cwd(), '__posts');
  const fileNames = await fs.readdir(postDirectory);
  const ids = fileNames.map((name) => name.replace(/.md$/, ''));
  return ids;
};

export const getPosts = async (): Promise<IPost[]> => {
  if (cachePosts) return cachePosts;
  const postDirectory = path.join(process.cwd(), '__posts');
  const fileNames = await fs.readdir(postDirectory);

  const posts = fileNames.map(async (fileName) => {
    const filePath = path.join(postDirectory, fileName);
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const content = fm<IPostMeta>(fileContents);
    return { fileName, meta: content.attributes, content: content.body };
  });

  cachePosts = (await Promise.all(posts)).sort(({ meta: meta1 }, { meta: meta2 }) => (new Date(meta1.date) < new Date(meta2.date) ? -1 : 1));
  return cachePosts;
};

export const getPost = async (id: string): Promise<IPost> => {
  const posts = await getPosts();
  // const postDirectory = path.join(process.cwd(), '__posts');
  // const fileName = `${id}.md`;
  // const filePath = path.join(postDirectory, fileName);
  // const fileContent = await fs.readFile(filePath, 'utf-8');
  // const content = fm<IPostMeta>(fileContent);

  return posts.find(({ meta }) => meta.id === id)!;
};
