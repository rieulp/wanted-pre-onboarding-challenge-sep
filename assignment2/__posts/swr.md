---
title: stale-while-revalidate이란?
date: '2022-10-16'
description: 요즘 많이 쓰는 SWR
id: swr
categories:
  - Development
  - Study
  - Frontend
tags:
  - swr
references:
  - https://web.dev/stale-while-revalidate/
---

# stale-while-revalidate

`stale-while-revalidate`는 **개발자가 캐싱된 콘텐츠를 즉시 로드**하는 `즉시성`과 **갱신된 최신 콘텐츠가 향후에 사용되도록 보장**하는 `최신성` 간의 균형을 유지하는데 도움을 주는 HTTP Cache-Control 확장 디렉티브입니다.

`stale-while-revalidate`는 `max-age`와 함께 **Cache-Control 응답 헤더**에 사용해야합니다.

- `max-age`
  캐싱된 응답이 최신 상태인지 오래된 것인지 여부를 결정합니다. 지정된 시간(초) **이내에 반복된 요청은 최신**, **이후의 요청은 오래된 것**으로 간주합니다.

- `stale-while-revalidate`
  캐싱된 응답이 오래된 경우, 캐싱된 응답의 재검증 요청을 수행할지 서버에 요청을 보내 새 응답을 받을지 여부를 결정합니다. 지정된 시간(초) 이내에 요청이 반복되면 오래된 캐싱 응답을 반환하고 백그라운드에서 재검증 요청을 보내 캐싱된 응답을 최신으로 갱신하고 `max-age`를 비교할 때 사용되는 최신성 타이머를 재설정 합니다. 이후의 요청엔 서버에 요청을 보내 새 응답을 반환하고 캐싱합니다.
  <br>

stale-while-revalidate의 메커니즘을 예를들어 다시 정리하자면,

```text
// HTTP Response Cache-Control Header
Cache-Control: max-age=1, stale-while-revalidate=59
```

1. **0-1초**에 요청이 반복되는 경우, 캐싱된 응답이 최신 상태이므로 재검증 없이 캐싱된 응답이 그대로 사용됩니다.
2. **1-60초**에 요청이 반복되는 경우, 캐싱된 응답이 오래된 상태이지만 캐싱된 응답을 사용합니다. 동시에 백그라운드에서 다음 요청 때 최신 응답 데이터가 사용될 수 있도록 재검증 요청을 수행해 최신 응답으로 갱신합니다.
3. **60초 이상** 지난 후 요청이 반복되는 경우, 캐싱된 응답을 사용하지 않습니다. 서버에 요청을 보내 새로운 응답을 사용하고 캐싱합니다.

<img src="https://velog.velcdn.com/images/rieulp/post/9bd9b150-a706-4ed1-920e-0cf8d61d5278/image.svg" alt="stale-while-revalidate 메커니즘" style="margin:0 auto; border-radius:5px; border:1px solid var(--prism-line-number);">

<br>

# SWR

`stale-while-revalidate` 전략을 사용한 서버 상태 관리 라이브러리입니다.

React 프로젝트에서 사용하는 **상태(state)** 를 크게 2가지로 구분할 수 있습니다.

- **Server State**
  서버에서 받아온 비동기적인 State로 빠른 접근을 위해 클라이언트에 저장된다.
- **Client State**
  컴포넌트에서만 사용되는 Local State와 프로젝트 어디에서나 접근할 수 있는 Global State이다.

Server State는 특정 시점에 서버에서 받아온 상태이므로 언제든지 서버에서 데이터가 변경될 수 있습니다. 클라이언트에 저장된 Server State가 서버 데이터와 일치하는지 지속적으로 재검증하고 최신 상태로 유지하는 작업이 필요합니다. Server State를 Context API 같은 전역상태관리 기능을 사용해 관리를 하기 위해서는 캐시, 동일한 데이터에대한 중복 요청 제거, 오래된 데이터 갱신, 데이터 변경 요청 후 업데이트 등 많은 기능을 구현해야합니다.
`SWR`과 같은 Server State 관리 라이브러리를 사용하면 이런 기능들을 직접 구현할 필요없이 짧은 코드로 서버 상태를 `stale-while-revalidate` 전략을 사용해서 지속적으로 최신 상태로 유지할 수 있습니다.

## SWR 설치

```bash
yarn add swr
```

## 사용 방법

`fetcher` 함수를 생성하고, `useSWR` hook을 사용하면 `stale-while-revalidate` 전략으로 서버 상태를 관리할 수 있습니다.

```js
import useSWR from 'swr';
import axios from 'axios';

// fetcher
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Profile() {
  // swr
  const { data, error } = useSWR('/api/user', fetcher);

  // error state
  if (error) return <div>failed to load</div>;
  // loading state
  if (!data) return <div>loading...</div>;
  // ready state
  return <div>hello {data.name}!</div>;
}
```

# reference

- [stale-while-revalidate로 최신 상태 유지](https://web.dev/i18n/ko/stale-while-revalidate/)
- [SWR 시작하기](https://swr.vercel.app/ko/docs/getting-started)
