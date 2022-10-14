import styles from './styles.module.css';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from '../../utils/fetcher';
import Tags from '../Tags';
import type { IPost } from '../../utils/post';

import remarkGfm from 'remark-gfm';
import CodeBlock from '../CodeBlock';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const PostContent = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IPost>(id ? `/api/post/${id}` : null, fetcher, { dedupingInterval: 60000 });

  if (!data) return null;
  return (
    <div className={styles.postContent_container}>
      <h1 className={styles.title}>{data.meta.title}</h1>
      <p className={styles.date}>{data.meta.date}</p>
      <Tags tags={data.meta.tags} />
      <div className={styles.content}>
        <ReactMarkdown
          className={styles.markdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code: (props) => <CodeBlock {...props} />,
            tr({ children, className }) {
              return <tr>{children}</tr>;
            },
            blockquote({ children, className }) {
              return <blockquote className={[className, styles.blockquote].join(' ')}>{children}</blockquote>;
            },
            table({ children, className }) {
              return <table className={[className, styles.table].join(' ')}>{children}</table>;
            },
            ul({ children, className }) {
              return <ul className={className?.includes('contains-task-list') ? styles['contains-task-list'] : className}>{children}</ul>;
            },
            a({ className, children, href }) {
              return (
                <a className={[className, styles.link].join(' ')} href={href} rel="noreferrer" target="_blank">
                  {children}
                </a>
              );
            },
          }}
        >
          {data.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
