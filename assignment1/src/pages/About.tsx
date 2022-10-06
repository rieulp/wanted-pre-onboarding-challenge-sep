import useRouter from '../hooks/useRouter';

const About = () => {
  const { push } = useRouter();

  return (
    <div>
      <h2>about</h2>
      <button onClick={() => push('/')}>go main</button>
    </div>
  );
};

export default About;
