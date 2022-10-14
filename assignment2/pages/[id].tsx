import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { SWRConfig } from 'swr';
import PostContent from '../components/PostContent';
import SiblingContent from '../components/SiblingContent';
import Layout from '../layouts';
import { getPost, getPosts, IPost } from '../utils/post';

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface ISWRFallback {
  fallback: {
    [key: string]: IPost;
  };
}

const Post = ({ fallback }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <SWRConfig value={fallback}>
        <PostContent />
        <SiblingContent />
      </SWRConfig>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<ISWRFallback, IParams> = async ({ params }) => {
  const post = await getPost(params!.id);
  return {
    props: { fallback: { [`/api/post/${params!.id}`]: post } },
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
