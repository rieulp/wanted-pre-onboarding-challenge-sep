import Link from 'next/link';
import Tags from '../Tags';
import styles from './styles.module.css';

export interface IPostListItemProps {
  title: string;
  date: string;
  description: string;
  id: string;
  tags: string[];
  categories: string[];
}
const PostListItem = ({ title, date, description, id, tags }: IPostListItemProps) => {
  return (
    <Link href={`/${id}`} prefetch={false}>
      <a>
        <div className={styles.itemWrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <Tags tags={tags} />
          <p className={styles.date}>{date}</p>
        </div>
      </a>
    </Link>
  );
};

export default PostListItem;
