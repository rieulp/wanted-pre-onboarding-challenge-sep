import useSWR from 'swr';
import type { IPost } from '../utils/post';

const usePosts = () => {
  const { data, mutate } = useSWR<IPost[]>('/api/post');
  return { posts: data, mutate };
};

export default usePosts;
