import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import ReactMarkdown from 'react-markdown';
import Tags from '../components/Tags';
import Layout from '../layouts';
import { getPost, getPosts, IPost } from '../utils/post';
import styles from './styles.module.css';

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IPostProps {
  post: IPost;
}
const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <h1 className={styles.title}>{post.meta.title}</h1>
      <p className={styles.date}>{post.meta.date}</p>
      <Tags tags={post.meta.tags} />
      <ReactMarkdown className={styles.markdown}>{post.content}</ReactMarkdown>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<IPostProps, IParams> = async ({ params }) => {
  const post = await getPost(params!.id);
  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const paths = posts.map(({ meta }) => ({ params: { id: meta.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default Post;
