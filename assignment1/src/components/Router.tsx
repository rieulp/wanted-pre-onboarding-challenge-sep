import React, { useCallback, useEffect, useState } from 'react';
import Route, { IRouteProps } from './Route';

// Router component interface
export interface IRouterProps {
  children: React.ReactNode;
}

// RouterContext Context value interface
export interface IRouterContext {
  setPath: React.Dispatch<React.SetStateAction<string>>;
}

// Router component의 'curPath'의 값을 변경하는 'setPath' dispath를 가지고 있는 Context
export const RouterContext = React.createContext<IRouterContext | null>(null);

/**
 * Router의 자식들중 Route의 props를 array로 리턴
 * @param children Router Component의 자식 노드들
 * @returns Route Component들의 props array
 */
const getRoutes = (children: React.ReactNode): IRouteProps[] => {
  const routes: IRouteProps[] = [];
  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;
    if (element.type !== Route) return;
    const { path, component } = element.props;
    const route = {
      path,
      component,
    };
    routes.push(route);
  });
  return routes;
};

/**
 * useRouter에 현재 경로를 바꾸는 dispatch 전달하기위해 Context.Provider로 감싸서
 * 현재 경로에 맞는 route component를 리턴
 * @param props Router props
 * @param props.children Router가 가지는 자식 노드
 * @returns 현재 경로에 맞는 Route의 component를 리턴
 */
const Router = ({ children }: IRouterProps): React.ReactElement | null => {
  const [curPath, setPath] = useState(window.location.pathname);
  const [routes, setRoutes] = useState<IRouteProps[]>();

  // 뒤로가기 이벤트
  const onPopState = useCallback(() => {
    setPath(window.location.pathname);
  }, []);

  // 이벤드 설정/해제
  useEffect(() => {
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // children 값이 변경되면 routes값 변경
  useEffect(() => {
    setRoutes(getRoutes(children));
  }, [children]);

  /**
   * Context API를 사용해 하위 Component에 현재 경로를 바꾸는 dispatch 전달
   * 현재 경로에 맞는 route component 리턴
   */
  return <RouterContext.Provider value={{ setPath }}>{routes?.find(({ path }) => path === curPath)?.component}</RouterContext.Provider>;
};

export default Router;

/**
 * 1. 라우터의 자식인 라우트의 pops값을 확인해서 라우터 데이터를 만든다.
 * 2. 주소변화 감지를 한다.
 * 3. 주소가 변경되면 라우트는 일을 안해야해 실행이 안돼야 해
 * 4. 라우트는 오로지 라우터의 자식으로 ! 주소값과 컴포넌트를 가지고있는 데이터라고 본다.
 * 5. 주소가 변경되면 라우터가 라우트의 패스값이 일치하는 컴포넌트를 렌더링한다.
 * 6. 더 나아가 하위 하위 라우터도 가능하게?..?
 * 7. 아이디값?
 */
