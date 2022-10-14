# 프리온보딩 프론트엔드 챌린지 과제2
## Next.js로 마크다운 블로그 만들기 (1/2)
[보러가기](https://wanted-pre-onboarding-fe-challenge-sep-2.vercel.app/)
<aside>
💡 Next.js로 마크다운으로 작성한 블로그를 정적 페이지(SSG)로 작성해주세요.

</aside>

### **폴더 구조 및 라우팅**
- 사용자는 루트 경로의 `__posts` 폴더에 작성된 마크다운 파일(`.md`)를 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다.
- 블로그에 작성된 게시물을 렌더링하는 `목록 페이지`와 개별 게시물을 렌더링하는 `상세 페이지`로 나누어 작성해주세요.
    - `/` - 목록 페이지
    - `/[id]` - 상세 페이지
    - 마크다운을 JavaScript로 변환해주는 도구는 `remark`(마크다운 Parser), `remark-html`(remark로 파싱한 데이터를 html로 변환) 을 참고
    - 각 마크다운의 meta data는 `gray-matter`, `frontmatter` 참고
    - 마크다운을 React에 삽입할 때는 `dangerouslySetInnerHTML` 을 사용 ([참고 링크](https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml))
    - (추가 구현) 코드 하이라이터는 `highlight.js`, `prism.js` 를 참고

### **Next.js에서 지원하는 Prefetching 메서드를 적절히 사용해주세요.**
- 정적 페이지를 생성할 때 필요한 데이터 생성 → `getStaticProps`
- 각 포스트를 그려줄 상세 페이지 경로를 생성  → `getStaticPaths`

