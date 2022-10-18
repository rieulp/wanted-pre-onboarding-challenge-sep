import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPosts, IPost } from '../utils/post';
import PostList from '../components/PostList';
import Layout from '../layouts';
import { SWRConfig } from 'swr';

interface ISWRFallback {
  fallback: {
    [key: string]: IPost[];
  };
}

const Home = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <PostList />
      </Layout>
    </SWRConfig>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<ISWRFallback> = async () => {
  const posts = await getPosts();

  return {
    props: { fallback: { '/api/post': posts } },
  };
};
