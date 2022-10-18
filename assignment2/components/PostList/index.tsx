import PostListItem from '../PostListItem';
import styles from './styles.module.css';
import usePosts from '../../hooks/usePosts';

const PostList = () => {
  const { posts } = usePosts();

  if (!posts) return null;
  return (
    <div className={styles.postItemContainer}>
      {posts.map(({ meta }, index) => {
        return <PostListItem {...meta} key={index} />;
      })}
    </div>
  );
};

export default PostList;
