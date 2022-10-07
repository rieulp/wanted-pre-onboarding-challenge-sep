# 프리온보딩 프론트엔드 챌린지 과제1

## React와 History API 사용하여 SPA Router 기능 구현하기

### 요구사항

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```

**5) 아래 스크린샷을 참고하여 앱을 작성한다.**

- **TO-BE) Root 경로**
![image](https://user-images.githubusercontent.com/38723811/194463878-b34084ea-ce6f-44ed-b058-4c34b52802e5.png)

- **TO-BE) About 경로**
![image](https://user-images.githubusercontent.com/38723811/194463897-21afc566-7f45-42d6-8676-751581053e75.png)

<br>

### 구현 내용

**1) Router 컴포넌트에 window.onpopstate event 설정**

  ```tsx
  const Router = ({ children }: IRouterProps): React.ReactElement | null => {
    // ... 코드 생략

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

    // ... 코드 생략

  }
  ```
**2) useRouter Hook 구현**
- [`src/hooks/useRouter.ts`](https://github.com/rieulp/wanted-pre-onboarding-fe-challenge-sep/blob/34f1a008d10d758d1c3b02658461c541d51c50dd/assignment1/src/hooks/useRouter.ts) 파일
- `push` 메소드는 `history.putState`를 실행하고 부모 노드인 `Router`컴포넌트가 전달한 Context에서 받아온 path값을 가진 useState의 dispatch를 실행하여 새로운 경로로 값을 갱신한다.
