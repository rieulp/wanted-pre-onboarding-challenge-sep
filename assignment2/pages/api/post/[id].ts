import type { NextApiRequest, NextApiResponse } from 'next';
import { getPost } from '../../../utils/post';
import type { IPost } from '../../../utils/post';

interface ErrorResponse {
  error: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<IPost | ErrorResponse>) {
  const { id } = req.query;
  try {
    const post = await getPost(id as string);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: '포스팅된 글이 없습니다.' });
  }
}
