import Link from 'next/link';
import styles from './styles.module.css';

interface IProps {
  children?: React.ReactNode;
}
const Layout = ({ children }: IProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <a>Blog</a>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
