---
title: '[Warning: Each child in a list should have a unique "key" prop.] 에러 이유 및 해결'
date: 2022-07-07
categories:
  - Error
tags:
  - React
---

### 문제점

아래와 같이 자바스크립트의 map 함수를 사용한 경우 콘솔에서 " Warning: Each child in a list should have a unique "key" prop "이라는 주의 문구를 확인할 수 있다.

```js
{
  ['AAA', 'BBB', 'CCC'].map((item) => <div>{item}</div>);
}

//<div>"AAA"</div>
//<div>"BBB"</div>
//<div>"CCC"</div>
```

React는 key prop을 사용하여 컴포넌트와 DOM 요소 간의 관계를 생성한다. 리액트 라이브러리는 이 관계를 이용해 컴포넌트 리렌더링 여부를 결정한다. 불필요한 리렌더링을 방지하기 위해서는 각 자식 컴포넌트마다 독립적인 key값을 넣어줘야 한다.

### 해결 방법

배열로 map 함수를 사용해 JSX 리스트를 구현할 때 key prop을 자식 컴포넌트마다 넣어줘야 한다.

```js
Ex: <div key='uniqueId1'>Item1</div>;
```

자바스크립트의 배열은 정적이지 않다.즉, 배열의 길이나 원소 등이 변할 수 있다는 의미이다. 따라서 배열의 index를 key prop으로 사용하는 것을 지양해야 한다.

배열의 원소의 순서가 바뀌면 index도 바뀌고 컴포넌트마다 고유해야 하는 key값도 같이 바뀌기 때문이다. 이렇게 되면 리액트는 리렌더링 해야하는 컴포넌트를 헷갈려 잘못된 컴포넌트를 리렌더링할 수 있다.

key가 전역적으로 고유할 필요는 없다. 형제 요소에서 고유해야 한다.

```js
// BAD :(

{
  ['AAA', 'BBB', 'CCC'].map((item, index) => <div key={index}>{item}</div>);
}

// GOOD :)

{
  ['AAA', 'BBB', 'CCC'].map((item) => <div key='{item}'>{item}</div>);
}
```
