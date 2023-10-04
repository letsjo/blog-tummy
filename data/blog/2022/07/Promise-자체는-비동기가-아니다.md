---
title: Promise 자체는 비동기가 아니다
date: 2022-07-15
categories:
  - Study
tags:
  - JavaScript
---

Promise 패턴이 생겨난 가장 중요한 원인은 '콜백 지옥'을 해결하기 위해서이다. 비동기 작업을 도와주는 synthetic sugar라고 볼 수 있다.

#### _**따라서 Promise 객체 자체는 비동기 / 동기 동작을 나누는 기준이 되지 않는다.**_

다음과 같은 코드에서 A는 Promise 객체이지만 resolve 혹은 reject가 동기적으로 처리됩니다.

```js
function doSyncWork() {
  return !!Math.round(Math.random());
  // true, false를 랜덤으로 반환함
}

let A = new Promise((resolve, reject) => {
  let work = doSyncWork();
  console.log(work);
  if (work) resolve(work);
  else reject('invalid work');
});

//A.then(() => console.log('async')).catch(() => console.log('async'));
console.log(A);

// 결과 :
// Promise <Fullfilled> or <rejected>
// 이미 fullfilled 혹은 reject 처리가 되어 있다
```

resolve나 reject를 다른 비동기 API의 콜백 내부 에 집어넣어야 비동기로 동작함 e.g. resolve를 setTimeout 콜백 함수에 집어넣는 경우

#### 주의: then / catch 핸들러는 비동기로 동작한다

```js
function doSyncWork() {
  return !!Math.round(Math.random());
  // true, false를 랜덤으로 반환함
}

let A = new Promise((resolve, reject) => {
  let work = doSyncWork();
  if (work) resolve(work);
  else reject('invalid work');
});

A.then(() => console.log('async')).catch(() => console.log('async'));
console.log(A);

//결과 :
//Promise <Fullfilled> or <rejected>
//'async'

// then과 catch는 먼저 작성되었음에도 불구하고, console.log(A) 가 먼저 실행되었다
// Promise의 Resolve와 Reject는 microtask queue에 담기기 때문에
// 콜 스택에 담긴 자바스크립트가 전부 실행되고 나서 바로 실행됨
```
