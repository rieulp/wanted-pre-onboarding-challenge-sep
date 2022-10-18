import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { SWRConfig } from 'swr';
import PostContent from '../components/PostContent';
import SiblingContent from '../components/SiblingContent';
import Layout from '../layouts';
import { getPostIds, getPosts, IPost } from '../utils/post';
import { useCallback, useState } from 'react';

interface ISWRFallback {
  fallback: {
    [key: string]: IPost[];
  };
}

const Post = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [isLoading, setLoading] = useState(true);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);
  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <PostContent onLoad={onLoad} />
        {!isLoading && <SiblingContent />}
      </Layout>
    </SWRConfig>
  );
};

export const getStaticProps: GetStaticProps<ISWRFallback> = async () => {
  const posts = await getPosts();
  return {
    props: { fallback: { '/api/post': posts } },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostIds();
  const paths = ids.map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export default Post;
