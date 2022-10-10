import path from 'path';
import { promises as fs } from 'fs';
import fm from 'front-matter';

export interface IPostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
  categories: string[];
}

export interface IPost {
  fileName: string;
  meta: IPostMeta;
  content: string;
}

export const getPosts = async (): Promise<IPost[]> => {
  const postDirectory = path.join(process.cwd(), '__posts');
  const fileNames = await fs.readdir(postDirectory);

  const posts = fileNames.map(async (fileName) => {
    const filePath = path.join(postDirectory, fileName);
    const fileContents = await fs.readFile(filePath, 'utf-8');

    const content = fm<IPostMeta>(fileContents);

    return { fileName, meta: content.attributes, content: content.body };
  });

  return await Promise.all(posts);
};

export const getPost = async (id: string) => {
  const posts = await getPosts();
  return posts.find(({ meta }) => meta.slug === id)!;
};
