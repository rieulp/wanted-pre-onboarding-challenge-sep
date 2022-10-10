import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPosts, IPost } from '../utils/post';
import PostList from '../components/PostList';
import Layout from '../layouts';

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{ posts: IPost[] }> = async () => {
  const posts = await getPosts();

  return {
    props: { posts },
  };
};
