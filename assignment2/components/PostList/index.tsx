import { IPost } from '../../utils/post';
import PostListItem from '../PostListItem';
import styles from './styles.module.css';

interface IPostListProps {
  posts: IPost[];
}
const PostList = ({ posts }: IPostListProps) => {
  return (
    <div className={styles.postItemContainer}>
      {posts.map(({ meta, content }, index) => {
        return <PostListItem {...meta} key={index} />;
      })}
    </div>
  );
};

export default PostList;
