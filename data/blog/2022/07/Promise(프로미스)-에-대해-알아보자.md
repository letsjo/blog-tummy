---
title: Promise(프로미스) 에 대해 알아보자!
date: 2022-07-15
categories:
  - Study
tags:
  - JavaScript
---

## Promise

Promise를 사용하려면 먼저 Promise객체를 생성해야 한다.

```js
const promise = new Promise(function(resolve, reject){
    ...
});

// Arrow Function
const promise = new Promise((resolve, reject) => {
    ...
});
```

- `resolve` : **함수 안의 처리가 끝났을 때 호출해야하는 콜백함수.** 어떠한 값도 인수로 넘길 수 있다. 다음 처리를 실행하는 함수에 전달된다.

- `reject` : **함수 안의 처리가 실패했을 때 호출해야하는 콜백함수.** 어떠한 값도 인수로 넘길수 있다. 주로 오류 메시지 문자열을 인수로 사용한다.

![](https://velog.velcdn.com/images/gusdh2/post/0bf043f3-e5ac-4f3f-bcd6-e46590324b7e/image.png)

### then/catch 메서드

```js
promise.then(ouFulfilled);

promise.catch(onRejected);
```

프로미스(promise) 내부에서 `resolve` 가 호출되면 `then` 이 실행되고, `reject` 가 호출되면 `catch` 가 실행된다. `resolve` 와 `reject` 에 넣어준 인자는 각각 `then` 과 `catch` 의 매개변수에서 받을 수 있다.

아래 코드를 살펴보자!

```js
// 2의 거듭제곱을 구하는 예시

// 1. 코드를 입력하면 2초뒤 “10미만 숫자를 입력하시오”라는 입력창이 뜬다.

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const input = parseInt(prompt('10미만 숫자를 입력하시오'));
    if (input < 10) {
      resolve(input);
    } else {
      reject(`오류: ${input}은 10 이상이거나 숫자가 아닙니다.`);
    }
  }, 2000);
});

// 2. 입력한 숫자가 10미만이면 then 으로 넘긴 함수가 실행되고, 그렇지 않으면 catch 에 넘긴 함수가 실행된다.

promise
  .then((num) => {
    console.log(`2^${num} = ${Math.pow(2, num)}`);
  })
  .catch((error) => {
    console.log(error);
  });

//Promise {<pending>}
// 2^7(입력) = 128
```

### then의 두번째 인수

```js
promise.then(onFulfilled, onRejected);
```

then 메서드에 두 번째 인수로 실패 콜백함수를 지정할 수 있다. 그러면 then 메서드에서 처리할 내용과 catch 메서드에서 처리할 내용을 then 메서드 하나로 담을 수 있다.

위의 then/catch 예시를 아래와 같이 수정할 수 있다.

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const input = parseInt(prompt('10미만 숫자를 입력하시오'));
    if (input < 10) {
      resolve(input);
    } else {
      reject(`오류: ${input}은 10 이상이거나 숫자가 아닙니다.`);
    }
  }, 2000);
});

promise.then(
  (num) => {
    console.log(`2^${num} = ${Math.pow(2, num)}`);
  }, // 처리가 성공으로 끝날때 호출
  (error) => {
    console.log(error);
  }, //처리가 실패로 끝날때 호출
);
```

### Promise가 실행하는 콜백함수에 인수 넘기기

buySomething 함수에 넘긴 인수를 Promise 객체가 실행하는 익명 함수 안에서 사용하는 예제이다.

```js
// 1. 현재금액(nowMoney)을 인수로 넘겨 실행하면 지불할 금액을 2초후 입력할 수 있다.

function buySomething(nowMoney) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pay = parseInt(prompt('금액 입력'));
      const remain = nowMoney - pay;
      if (remain >= 0) {
        console.log(`${pay}원 지불`);
        resolve(remain);
      } else {
        reject(`잔액부족: 현재 잔액${nowMoney}원`);
      }
    }, 2000);
  });
}

// 2. 차액이 0이상이면 then 에 넘긴 함수가 “잔액”을 표시,
//    0미만으로 부족하면 catch 에 넘긴 함수가 “잔액부족” 오류 메세지를 표시한다.

buySomething(1000)
  .then((remain) => {
    console.log(`잔액: ${remain}원`);
  })
  .catch((error) => {
    console.log(error);
  });

// 금액 입력: 200(입력)
// 200원 지불
// 잔액: 800원
```

### Promise로 비동기 처리 연결하기

then 이나 catch 에서 다시 다른 then 이나 catch 를 붙일 수 있다. 이전 then 의 return값을 다음 then 의 매개변수로 넘긴다. 프로미스를 return한 경우 프로미스가 수행된 후 다음 then 또는 catch 가 호출된다.

```js
function buySomething(nowMoney) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pay = parseInt(prompt('금액 입력'));
      const remain = nowMoney - pay;
      if (remain >= 0) {
        console.log(`${pay}원 지불`);
        resolve(remain);
      } else {
        reject(`잔액부족: 현재 잔액${nowMoney}원`);
      }
    }, 2000);
  });
}

buySomething(1000)
  .then((remain) => {
    console.log(`잔액: ${remain}원`);
    return buySomething(remain);
  })
  .then((remain) => {
    console.log(`잔액: ${remain}원`);
    return buySomething(remain);
  })
  .then((remain) => {
    console.log(`잔액: ${remain}원`);
    return buySomething(remain);
  })
  .catch((error) => {
    console.log(error);
  });

//100원 지불
//잔액: 900원
//200원 지불
//잔액: 700원
//400원 지불
//잔액: 300원
//100원 지불
```

금액 입력을 여러번 받게 수정했다.

> #### 위에서는 then이 모두 같은 Promise객체를 반환하지만, then마다 다른 Promise객체를 반환해서 다른 비동기 처리를 연결하여 순차적으로 실행하게 할 수도 있다.

### Promise.all

프로미스 여러 개를 한번에 실행할 수 있는 방법이 있다. 지금까지는 비동기 처리 여러 개를 직렬로 연결해서 순차적으로 실행 했지만 Promise객체의 all 메서드를 이용하면 비동기 처리 여러 개를 병렬로 할 수 있다.

```js
Promise.all(iterable);
```

- iterable : Array와 같이 순회(반복) 가능한(iterable) 객체. 예를 들어 Promise객체가 요소로 들어있는 배열을 넘기면 Promise.all 메서드는 그 안의 요소로 들어있는 모든 Promise 객체를 병렬로 실행한다.

```js
function buySomething(name, nowMoney) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pay = parseInt(prompt(`${name} : 금액 입력`));
      const remain = nowMoney - pay;
      if (remain >= 0) {
        console.log(`${name} : ${pay}원 지불`);
        resolve(remain);
      } else {
        reject(`${name} : 잔액부족: 현재 잔액${nowMoney}원`);
      }
    }, 2000);
  });
}

Promise.all([buySomething('John', 500), buySomething('Mary', 1000), buySomething('Bill', 1500)])
  .then((remain) => {
    console.log(remain);
  })
  .catch((error) => {
    console.log(error);
  });

//John : 200원 지불
//Mary : 600원 지불
//Bill : 1000원 지불
//▶︎(3) [300, 400, 500]
```

### Promise.race

Promise.race 메서드는 가장 먼저 종료한 Promise객체 결과만 다음 작업으로 보낸다. 먼저 종료한 작업이 성공하면 성공 콜백을 호출하고 실패하면 실패 콜백을 호출한다.

```js
function buySomething(name, nowMoney) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pay = parseInt(prompt(`${name} : 금액 입력`));
      const remain = nowMoney - pay;
      if (remain >= 0) {
        console.log(`${name} : ${pay}원 지불`);
        resolve(remain);
      } else {
        reject(`${name} : 잔액부족: 현재 잔액${nowMoney}원`);
      }
    }, 2000);
  });
}

Promise.race([buySomething('John', 500), buySomething('Mary', 1000), buySomething('Bill', 1500)])
  .then((remain) => {
    console.log(remain);
  })
  .catch((error) => {
    console.log(error);
  });

// John : 200원 지불
// 300 (성공 콜백함수가 출력한 값)
// Mary : 600원 지불
// Bill : 1000원 지불
```

나머지 작업도 실행되긴하지만 가장 먼저 종료한 작업의 결과값만 반환한다.

## async/await

### async 개념

async 키워드는 function 앞에 사용한다. function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환한다. 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환되도록 한다.

아래 예시의 함수를 호출하면 result가 1인 이행 프라미스가 반환된다.

```js
async function f() {
  return 1;
}

f().then(alert); // 1
```

위 함수에서 1을 Promise.resolve로 감싸도 같은 결과를 반환한다.

```js
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

즉, async가 붙은 함수는 반드시 프라미스를 반환하고, 프라미스가 아닌 것은 프라미스로 감싸 반환한다.

### await 개념

await는 async 함수 안에서만 동작한다. await는 ‘기다리다'라는 뜻을 가진 영단어 인데, 프라미스가 처리될 때 까지 기다리는 역할을 한다. 그리고 결과는 그 이후 반환된다.

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('완료!'), 1000);
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();
```

함수를 호출하고, 함수 본문이 실행되는 도중에 (\*)로 표시한 줄에서 실행이 잠시 '중단’되었다가 프라미스가 처리되면 실행이 재개된다. 이때 프라미스 객체의 result 값이 변수 result에 할당된다. 따라서 위 예시를 실행하면 1초 뒤에 '완료!'가 출력된다.

> `await`는 말 그대로 프라미스가 처리될 때까지 함수 실행을 기다리게 만든다. 프라미스가 처리되면 그 결과와 함께 실행이 재개된다. 프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.

> `await`를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백 함수나 `.then()` 등을 사용해야 했을 것이다. 하지만 `async`/`await` 문법덕에 비동기에 대한 사고를 하지 않아도 된다. 또한, `await`은 `promise.then`보다 좀 더 세련되게 프라미스의 result 값을 얻을 수 있도록 해주는 문법이다. `promise.then`보다 가독성 좋고 쓰기도 쉽다.

프로미스가 콜백 지옥을 해결했다지만, 아직 장황한 코드는 여전하다. `async`/`await` 문법은 프로미스를 사용한 코드를 한번 더 깔끔하게 해준다.

```js
async function 함수명() {
  await 비동기처리_메서드명();
}
```

위에서 했던 지불 금액을 입력하고 잔액을 반환하는 Promise예제를 async/await 문법으로 바꿔보자.

```js
function buySomething(nowMoney) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pay = parseInt(prompt('금액 입력'));
      const remain = nowMoney - pay;
      if (remain >= 0) {
        console.log(`${pay}원 지불`);
        resolve(remain);
      } else {
        reject(`잔액부족: 현재 잔액${nowMoney}원`);
      }
    }, 2000);
  });
}

async function testAsync() {
  try {
    const remain = await buySomething(1000);
    console.log(`잔액: ${remain}원`);
  } catch (error) {
    console.log(error);
  }
}
testAsync();

// 금액 입력: 200(입력)
// 200원 지불
// 잔액: 800원
```

`try/catch` 문으로 로직을 감쌌다. `async`/`await` 문법에서는 프로미스의 `.catch` 메서드와 같이 `try/catch` 문의 `catch{}` 가 에러를 처리한다.

```js
// 금액 입력: 2000(입력)
// 잔액부족: 현재 잔액1000원
```

화살표 함수도 `async` 와 같이 사용할 수 있다.

```js
const testAsync = async () => {
  try {
    const remain = await buySomething(1000);
    console.log(`잔액: ${remain}원`);
  } catch (error) {
    console.log(error);
  }
};
testAsync();
```
