import styles from './styles.module.css';

interface Props {
  tags: string[];
}
const Tags = ({ tags }: Props) => {
  return (
    <ul className={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <li key={index} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
