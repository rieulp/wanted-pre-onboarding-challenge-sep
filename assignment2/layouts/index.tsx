import Link from 'next/link';
import styles from './styles.module.css';
import { BsGithub, BsFillHeartFill } from 'react-icons/bs';

interface IProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: IProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <Link href="/">
            <a>Blog</a>
          </Link>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.icons}>
          <a href="https://github.com/rieulp" target="_blank" rel="noreferrer">
            <BsGithub />
          </a>
        </div>
        <p>Rieul</p>
        {/* </div> */}
      </footer>
    </div>
  );
};

export default Layout;
