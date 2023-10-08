---
title: useState vs useRef 란?
date: 2022-10-20
categories:
  - Study
tags:
  - React
---

![](https://velog.velcdn.com/images/gusdh2/post/bffba945-db09-4639-b971-bc4a414fb7a2/image.png)

## 🥸 useState / useRef 는 무엇일까?

### ☝️ useState 란?

`useState` 는 리렌더링이 될 때 새로운 함수를 만들어주며, 각각의 함수는 고유의 state와 props를 기억하고 있습니다. 그래서 상태 유지 값과 그 값을 갱신하는 함수를 반환하며, setState 함수는 새로운 state를 받아 Components Rerendering Queue에 등록합니다.

그리고 Components는 다음 렌더링 시에 useState를 통해 반환받은 첫번째 값은 항상 갱신된 최신 state가 됩니다.

> const [state, setState] = useState(초기값)

### ☝️ useRef 란?

`useRef`는 render 메서드에서 생성된 DOM 노드나 React 엘리먼트에 접근하는 방법을 제공합니다.

- ref의 바람직한 사용 사례

1. 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때
2. 애니메이션을 직접적으로 실행시킬 때
3. 서드 파티 DOM 라이브러리를 React와 같이 사용할 때

결국 React에서 ref는 DOM을 조작하기 위해 사용됩니다.

> const refContainer = useRef(initialValue);

`useRef`는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환합니다.

`useRef`는 순수 자바스크립트 객체를 생성합니다. 또한 `useRef`로 만든 객체를 수정하는 것은 컴포넌트의 렌더링과 무관합니다. 다시 말하면, `.current` 프로퍼티를 변형하는 것이 리렌더링을 발생시키지 않습니다.

본질적으로 `useRef`는 `.current` 프로퍼티에 변경 가능한 값을 담고 있는 상자와 같습니다. `useRef`는 상자와 같으므로 `useState`처럼 컴포넌트 내의 변수 값을 조회, 수정하는 방법으로도 사용할 수 있습니다.

위 두 사례에 의하면, `useRef`는 일반적으로 특정 DOM을 지정하여 해당 돔의 속성값을 파악하거나 속성값을 변화시키는 용도로 사용할 수도 있고, 순수 자바스크립트 객체를 반환하기 때문에 값을 저장하는 상자로 사용할 수도 있습니다.

## 🥸 State vs Ref 뭐가 다른가요?

- `useRef` 는 단순 DOM 엘리먼트를 지정하는데만 사용되지 않는다.
- `useRef` 를 통해 클래스의 멤버 변수와 비슷한 역할을 하게 만들 수 있다.
- `state` 와 달리 값의 변화로 인한 리렌더링이 발생하지 않는다.
- `.current` 라는 속성을 통해 어느 값이든 보유할 수 있는 일종의 컨테이너 역할을 할 수 있다.

## 👨‍💻 정리

- `state` : 컴포넌트의 생명 주기와 밀접한 연관이 있는 요소이므로 렌더링과 관련 있는 값을 저장
- `ref` :
  - setTimeout, setInterval이 반환하는 ID 값
  - state의 이전 값
  - 이 외 렌더링과 무관한 가변값
