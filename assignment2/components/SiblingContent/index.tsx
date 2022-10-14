import { fetcher } from '../../utils/fetcher';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import type { IPost } from '../../utils/post';
import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

const SiblingContent = () => {
  const { data } = useSWR<IPost[]>('/api/post', fetcher, { dedupingInterval: 60000 });
  const { id } = useRouter().query;
  const [prevPost, setPrevPost] = useState<IPost>();
  const [nextPost, setNextPost] = useState<IPost>();

  useEffect(() => {
    setPrevPost(undefined);
    setNextPost(undefined);
    const idx = data?.findIndex(({ meta }) => meta.slug === id);
    if (idx != undefined && data) {
      if (idx > 0) setPrevPost(data[idx - 1]);
      if (idx < data.length - 1) setNextPost(data[idx + 1]);
    }
  }, [data, id]);

  if (!data || !id) return null;
  return (
    <div className={styles.container}>
      <p className={styles.label}>✨ 다른 포스트</p>
      <div className={styles.sibling_container}>
        {prevPost ? (
          <Link href={`/${prevPost.meta.slug}`}>
            <a className={styles.sibling}>
              <p className={styles.label}>이전 글</p>
              <h3 className={styles.title}>{prevPost.meta.title}</h3>
              <p className={styles.description}>{prevPost.meta.description}</p>
            </a>
          </Link>
        ) : (
          <div style={{ width: '49%' }}></div>
        )}
        {nextPost ? (
          <Link href={`/${nextPost.meta.slug}`}>
            <a className={styles.sibling}>
              <p className={styles.label}>다음 글</p>
              <h3 className={styles.title}>{nextPost.meta.title}</h3>
              <p className={styles.description}>{nextPost.meta.description}</p>
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
