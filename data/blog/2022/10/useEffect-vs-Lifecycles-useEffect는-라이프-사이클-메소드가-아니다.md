---
title: 'useEffect vs Lifecycles : useEffect는 라이프 사이클 메소드가 아니다.'
date: 2022-10-21
categories:
  - Study
tags:
  - React
---

![](https://velog.velcdn.com/images/gusdh2/post/81df27bb-d3b3-468d-ae2e-cd1c9cfd5124/image.png)

## useEffect vs Lifecycles

과거 리액트 클래스 컴포넌트에는 `constructor`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 와 같이 리액트 라이프 사이클에 대응할 수 있는 각각의 메소드가 존재했다.

- componentDidMount() — useEffect(…, [])
- componentDidUpdate() — useEffect(…, [someState])
- componentWillUnmount() — useEffect(() => { return() => .. }, [])

그러나 함수형 컴포넌트의 훅으로 넘어오면서, 이러한 라이프 사이클 메소드를 훅으로 각각 대체하려고 하지만 이는 큰 실수다.

> 결론부터 말하자면, `useEffect`는 라이프 사이클 훅이 아니다. `useEffect`는 app 의 state값을 활용하여 동기적으로 부수효과를 만들 수 있는 메커니즘이다.

## useEffect 사용시 주의할 점

#### 1. 하나의 큰 useEffect를 만들지 마라.

각각의 useEffect는 관심사를 따로 분리해 두어야 한다. 하나의 큰 useEffect보다는, 각각의 로직을 분리해두는 것이 훨씬 좋다.

#### 2. 불필요한 외부 함수를 만들지 마라.

아래와 같은 코드는, useEffect에 두가지 deps를 추가해야 된다.

```js
// before. Don't do this!
function DogInfo({ dogId }) {
  const [dog, setDog] = React.useState(null);
  const controllerRef = React.useRef(null);
  const fetchDog = React.useCallback((dogId) => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    return getDog(dogId, { signal: controller.signal }).then(
      (d) => setDog(d),
      (error) => {
        // handle the error
      },
    );
  }, []);
  React.useEffect(() => {
    fetchDog(dogId);
    return () => controller.current?.abort();
  }, [dogId, fetchDog]);
  return <div>{/* render dog's info */}</div>;
}
```

위의 코드를 다음과 같이 바꿨다.

```js
function DogInfo({ dogId }) {
  const [dog, setDog] = React.useState(null);
  React.useEffect(() => {
    const controller = new AbortController();
    getDog(dogId, { signal: controller.signal }).then(
      (d) => setDog(d),
      (error) => {
        // handle the error
      },
    );
    return () => controller.abort();
  }, [dogId]);
  return <div>{/* render dog's info */}</div>;
}
```

useEffect 밖에서 정의되어 있던 fetchDog 함수를 useEffect 내부로 가지고 왔다. 이전에는 이것이 외부에 정의되어 있었기 때문에, deps 배열에 추가해야 했다. 또한 이 때문에 무한 루프에 빠지는 것을 방지하기 위하여 memoize를 해야 했다. 또한, controller를 위해 ref도 사용했다.

반드시 effect내에서 사용할 함수는 외부가 아닌 내부에서 정의 해야 한다.
