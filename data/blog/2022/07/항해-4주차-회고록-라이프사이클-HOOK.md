---
title: '[항해 4주차] 회고록 (라이프사이클/HOOK)'
date: 2023-10-04 23:47
categories:
  - WIL
tags:
  - 항해99
---

주특기 2주차가 지나고 나니까 리엑트와 어느 정도 많이 친해진 것 같다. 아직 더 배워야 할게 많이 남아 있다고 생각은 들지만, 그래도 리엑트를 베이스로 코딩을 생각하게 되어진 것 같다.

그래서 리엑트가 어떻게 돌아가는지 라이프사이클에 대해서와 리엑트의 hook 에 대해서 남겨보려고 한다.

## 리엑트 라이프 사이클

![](https://velog.velcdn.com/images/gusdh2/post/dd38e6ce-1702-4387-b9c6-7bc839c22d28/image.png)

컴포넌트는 **생성(mounting) -> 업데이트(updating) -> 제거(unmounting)**의 생명주기를 갖습니다.

**클래스 컴포넌트는 `라이프 사이클 메서드`를 사용**하고, **함수형 컴포넌트는 `Hook`을 사용**합니다.

### 클레스(Class) 컴포넌트 생명주기

> - 마운트(mount) - 컴포넌트가 생성 될때 발생하는 생명주기

- `constructor` : 마운트가 시작될 때 컴포넌트의 생성자가 맨 처음 호출되는 매서드 입니다. 생성자에서는 `state`를 초기화하거나 이벤트 바인딩을 처리합니다. 생성자에서 `setState()`를 호출해서는 안되며 필요한 경우 `state`에 직접 할당해야 합니다. 생성자 외에 메서드에서는 `setState()`를 호출하여 `state`를 변경해야 합니다. `this.props`, `this.state`에 접근이 가능하고 리액트 요소를 반환합니다.

- `getDerivedStateFromProps` : 해당 v16.3부터 생긴 메서드입니다. 해당 메서드는 마운트, 업데이트가 발생할 때 모두 발생합니다. `props`로부터 파생된 `state`를 가져옵니다. 즉 `props`로 받아온 것을 `state`에 넣어주고 싶을때 사용합니다. 해당 메서드는 자주 쓰이지는 않습니다.

- `render`: 컴포넌트를 렌더링하는 메서드이며, 마운트, 업데이트에서 모두 발생합니다. 브라우저에 보일 화면을 구성합니다. `props`와 `state`를 활용하여 엘리먼트를 반환하거나 문자, 숫자 또는 null이나 boolean, 배열, Fragment, 다른 컴포넌트를 반환해야 합니다.   `state`가 변경되지 않아야 하며 브라우저와 상호작용하는 작업을 하지 않아야 합니다.  브라우저와 상호작용 해야 한다면 `componentDidMount()`에서 하거나 다른 생명주기 메서드에서 해야 합니다.

- `componentDidMount` : 컴포넌트의 첫번째 렌더링이 마치면 호출되는 메서드입니다. 이 메서드가 호출되는 시점에는 화면에 컴포넌트가 나타난 상태입니다. DOM 노드가 만들어지고 필요한 작업이 있다면 해당 메서드에서 진행하면 됩니다. 외부 라이브러리 연동, 해당 컴포넌트에서 필요로하는 데이터를 ajax로 요청, 등의 행위를 합니다.

---

> - 업데이트(updating) - 컴포넌트가 업데이트되는 시점입니다. 즉, props, state가 변경될 때, 부모 컴포넌트가 리렌더링할 때와 this.forceUpdate로 강제로 리렌더링을 할 때 발생합니다.

- `getDerivedStateFromProps` : 마운트, 업데이트가 발생할 때 호출됩니다. 컴포넌트의 props나 state가 바뀌었을때도 이 메서드가 호출됩니다.

- `shouldComponentUpdate` : 컴포넌트가 리렌더링 할지 말지를 결정하는 메서드입니다. props, state가 변경될 때 getDerivedStateFromProps() 메서드가 호출된 후 호출됩니다. 컴포넌트를 리렌더링 할지 여부를 지정합니다. 컴포넌트에 정의되어있지 않으면 기본값 true를 반환합니다. 해당 메서드에서 false를 반환하면 리렌더링이 되지 않고 중지됩니다.

- `componentDidUpdate`: 리렌더링이 끝나면 호출됩니다. 컴포넌트가 업데이트되고 DOM을 조작하기 위해 메서드를 사용합니다. 메서드에서 인자로 이전 props, state를 사용할 수 있습니다. 세 번째 인자로 getSnapshotBeforeUpdate()에서 반환한 값이 snapshot 인자로 넘어옵니다.

---

> - 언마운트(unmount) - 언마운트라는 것은 컴포넌트가 화면에서 사라지는 것을 의미합니다. 언마운트에 관련된 생명주기 메서드는 componentWillUnmount 하나입니다.

- `componentWillUnmount` : 컴포넌트가 제거되기 직전에 호출됩니다. 해당 메서드에서는 DOM에 직접 등록했었던 이벤트를 제거하고, 만약에 setTimeout을 걸은 것이 있다면 clearTimeout을 통하여 제거를 합니다. 추가적으로, 외부 라이브러리를 사용한게 있고 해당 라이브러리에 dispose기능이 있다면 여기서 호출해주시면 됩니다.

### 함수(Functional) 컴포넌트 생명주기 (Hook)

리액트에서 Hook은 함수형 컴포넌트에서 React state와 생명주기 기능을 연동 할 수 있게 해주는 함수입니다. Hook은 class 안에서는 동작하지 않고, class없이 React를 사용할 수 있게 합니다.

> #### 리액트 Hook의 도입 목적

- 기존의 라이프사이클 메서드 기반이 아닌 로직 기반으로 나눌 수 있어서 컴포넌트를 함수 단위로 잘게 쪼갤 수 있다는 이점이 있다.
- 라이프사이클 메서드에는 관련 없는 로직이 자주 섞여 들어가는데, 이로인해 버그가 쉽게 발생하고, 무결성을 쉽게 해친다

> #### Hook 사용 규칙 두가지

- 최상위 에서만 Hook을 호출해야 한다.
  - 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하면 안된다.
  - 이 규칙을 따르면 컴포넌트가 렌더링될 때마다 항상 동일한 순서로 Hook이 호출되는 것이 보장된다.
- 리액트 함수 컴포넌트에서만 Hook을 호출해야 한다.

  - 일반 JS함수에서는 Hook을 호출해서는 안된다.

  - `useState` : 상태를 관리합니다. [state이름, setter이름] 순으로 반환 받아서 사용합니다.

```js
const [state, setState] = useState(initialState);
```

- `useEffect` : 화면에 렌더링이 완료된 후에 수행되며`componentDidMount`와 `componentDidUpdate`, `componentWillUnmount`가 합쳐진 것

  - ❗️만약 화면을 다 그리기 이전에 동기화 되어야 하는 경우에는,useLayoutEffect를 활용하여 컴포넌트 렌더링 - useLayoutEffect 실행 - 화면 업데이트 순으로 effect를 실행시킬 수 있다.

```js
useEffect(() => {}); // 렌더링 결과가 실제 돔에 반영된 후마다 호출
useEffect(() => {}, []); // 컴포넌트가 처음 나타날때 한 번 호출
useEffect(() => {}, [의존성1, 의존성2, ..]); // 조건부 effect 발생, 의존성 중 하나가 변경된다면 effect는 항상 재생성됩니다.
```

useEffect안 에서의 return은 정리 함수(clean-up)를 사용하기 위해 쓰여집니다.

메모리 누수 방지를 위해 UI에서 컴포넌트를 제거하기 전에 수행 컴포넌트가 여러 번 렌더링 된다면 다음 effect가 수행되기 전에 이전 effect가 정리됩니다.

- `useContext` : Context API를 통해 만들어진 Context에서 제공하는 Value를 가져올 수 있다

```js
const value = useContext(MyContext);
```

컴포넌트에서 가장 가까운 `<MyContext.Provider>`가 갱신되면 이 Hook은 그 MyContext provider에게 전달된 가장 최신의 context value를 사용하여 렌더러를 트리거 합니다.

- `useReducer` : useState의 대체 함수로 컴포넌트 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있습니다. 컴포넌트 바깥에 로직을 작성할 수 도 있고, 심지어 다른 파일에 작성한 후 불러와서 사용할 수도 있습니다. reducer란 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수 입니다.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

- `useRef` : 특정 DOM 선택할때 주로 쓰이며 .current 프로퍼티로 전달된 인자로 초기화된 변경 가능한 ref 객체를 반환합니다. 반환된 객체는 컴포넌트의 전 생애주기를 통해 유지됩니다.

```js
const refContainer = useRef(null);
```

- `useMemo` : 메모이제이션된 값을 반환합니다. 이미 연산 된 값을 리렌더링 시 다시 계산하지 않도록 한다. 의존성이 변경되었을 때에만 메모이제이션된 값만 다시 계산 합니다. 의존성 배열이 없는 경우 매 렌더링 때마다 새 값을 계산합니다.

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- `useCallback` : 메모이제이션 된 콜백을 반환합니다. useMemo와 유사하게 이용되며 '함수'에 적용해줍니다. 의존성이 변경되었을때만 변경됩니다. 때문에 특정 함수를 새로 만들지 않고 재사용가능하게 합니다.

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

---

## 정리 및 코멘트

조사하면서 자주 사용하던 hook이 아닌 다른 종류의 hook이 이렇게 더 있었다는 것에 놀랐고, 아직 써보지 않은 hook들은 다음에 사용해보도록 해야겠다.

이번에 주특기 3주차가 시작되어, redux 툴킷에 대해서 좀 더 자세하게 공부하는 중인데, 이번 과제에는 툴킷으로 프로젝트를 작성해보도록 해야겠다!
