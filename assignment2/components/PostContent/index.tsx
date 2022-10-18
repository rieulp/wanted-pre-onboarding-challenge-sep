import styles from './styles.module.css';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Tags from '../Tags';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../CodeBlock';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { fetchWithId } from '../../utils/fetcher';
import { useEffect } from 'react';
interface IPostContentProps {
  onLoad?: () => void;
}

const PostContent = ({ onLoad }: IPostContentProps) => {
  const { data: content } = useSWR(['/api/post', useRouter().query.id], fetchWithId, { dedupingInterval: 60000, revalidateOnFocus: false });

  useEffect(() => {
    if (content && onLoad) onLoad();
  }, [content, onLoad]);

  if (!content) return null;

  return (
    <div className={styles.postContent_container}>
      <h1 className={styles.title}>{content.meta.title}</h1>
      <p className={styles.date}>{content.meta.date}</p>
      <Tags tags={content.meta.tags} />
      <div className={styles.content}>
        <ReactMarkdown
          className={styles.markdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code: (props) => <CodeBlock {...props} />,
            tr({ children }) {
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
          {content.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
