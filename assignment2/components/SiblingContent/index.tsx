import { useRouter } from 'next/router';
import type { IPost } from '../../utils/post';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import usePosts from '../../hooks/usePosts';

const SiblingContent = () => {
  const { posts } = usePosts();
  const { id } = useRouter().query;
  const [prevPost, setPrevPost] = useState<IPost>();
  const [nextPost, setNextPost] = useState<IPost>();

  useEffect(() => {
    setPrevPost(undefined);
    setNextPost(undefined);
    const idx = posts?.findIndex(({ meta }) => meta.id === id);
    if (idx != undefined && posts) {
      if (idx > 0) setPrevPost(posts[idx - 1]);
      if (idx < posts.length - 1) setNextPost(posts[idx + 1]);
    }
  }, [posts, id]);

  if (!posts || !id) return null;
  return (
    <div className={styles.container}>
      {/* <p className={styles.label}>✨ 다른 포스트</p> */}
      <div className={styles.sibling_container}>
        {prevPost ? (
          <Link href={`/${prevPost.meta.id}`} prefetch={false}>
            <a className={styles.sibling}>
              <p className={styles.label}>이전 글</p>
              <h3 className={styles.title}>{prevPost.meta.title}</h3>
              {/* <p className={styles.description}>{prevPost.meta.description}</p> */}
            </a>
          </Link>
        ) : (
          <div style={{ width: '49%' }}></div>
        )}
        {nextPost ? (
          <Link href={`/${nextPost.meta.id}`} prefetch={false}>
            <a className={styles.sibling}>
              <p className={styles.label}>다음 글</p>
              <h3 className={styles.title}>{nextPost.meta.title}</h3>
              {/* <p className={styles.description}>{nextPost.meta.description}</p> */}
            </a>
          </Link>
        ) : (
          <div style={{ width: '49%' }}></div>
        )}
      </div>
    </div>
  );
};

export default SiblingContent;
