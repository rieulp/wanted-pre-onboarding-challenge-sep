import useRouter from '../hooks/useRouter';

const Root = () => {
  const { push } = useRouter();

  return (
    <div>
      <h2>root</h2>
      <button onClick={() => push('/about')}>about</button>
    </div>
  );
};

export default Root;
