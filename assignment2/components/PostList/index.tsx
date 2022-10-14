import { IPost } from '../../utils/post';
import PostListItem from '../PostListItem';
import styles from './styles.module.css';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

const PostList = () => {
  const { data } = useSWR<IPost[]>('/api/post', fetcher, { dedupingInterval: 60000 });
  if (!data) return null;
  return (
    <div className={styles.postItemContainer}>
      {data.map(({ meta }, index) => {
        return <PostListItem {...meta} key={index} />;
      })}
    </div>
  );
};

export default PostList;
