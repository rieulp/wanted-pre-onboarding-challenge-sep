// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../../utils/post';
import type { IPost } from '../../../utils/post';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IPost[]>) {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(200).json([]);
  }
}
