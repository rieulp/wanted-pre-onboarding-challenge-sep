import { useContext } from 'react';
import { RouterContext } from '../components/Router';

const useRouter = () => {
  const routerContext = useContext(RouterContext);
  const push = (url?: string) => {
    if (window.location.pathname === url) return;
    history.pushState(null, '', url);
    routerContext?.setPath(window.location.pathname);
  };
  return { push };
};

export default useRouter;
