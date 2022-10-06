export interface IRouteProps {
  path: string;
  component: JSX.Element;
}

/**
 * Router 하위 Component. 경로에서 보여줄 Component를 props로 가지고 있다.
 * @param props Route props
 * @param props.path 경로
 * @param props.component 경로에서 보여줄 Component
 * @returns component
 */
const Route = ({ path, component }: IRouteProps) => {
  if (path !== window.location.pathname) return <></>;
  return component;
};

export default Route;
