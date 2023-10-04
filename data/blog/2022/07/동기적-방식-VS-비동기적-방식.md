---
title: 동기적 방식 VS 비동기적 방식
date: 2022-07-15
categories:
  - Study
tags:
  - JavaScript
---

## 동기(synchronous) vs 비동기(asynchronous)

**동기와 비동기를 나누는 큰 차이점**은 **[ 실행 순서 ]**입니다.

동기는 요청을 보낸 후 해당하는 응답을 받아야만 다음으로 넘어갈 수 있는 실행방식이고반대로 비동기는 요청을 보낸 후에 응답과 관계없이 다음 동작을 실행할 수 있는 방식입니다.

간단하게 동기와 비동기방식을 생활에 적용한 예를 들어보도록 하겠습니다.

### 동기적 방식

![](https://velog.velcdn.com/images/gusdh2/post/2e63892c-c773-4c75-b883-8aef8db504a6/image.jpg)

병원 진료를 볼때에 창구에 접수를 하기 위해서 번호표를 뽑습니다. 저의 번호표는 3번으로 저의 앞에는 1번 2번 번호표를 가진 분이 존재합니다.

1번 손님 접수요청 -> 창구에서 응답 -> 접수완료 -> 2번 손님 접수요청 -> 창구에서 응답 -> 접수완료 -> 3번 손님 접수요청 ....

위의 예시와 같이 동기적 방식은 순서가 확실히 정해져있습니다.

### 비동기적 방식

![](https://velog.velcdn.com/images/gusdh2/post/a28b9864-4b5a-436f-b62a-2eac4b99af3a/image.jpg)

식당을 가서 음식을 주문할 때에 음식이 조리중이라서 주문 접수가 안되는 식당은 없을 것 입니다. 그리고 만일 1번째 손님이 30분 걸리는 음식을 주문하고, 2번째 손님이 5분 걸리는 음식을 주문했을 때 2번째 손님의 음식이 먼저 나올 것 입니다. 이러한 것이 비동기적 방식입니다.

> 만일 위의 예시에서 동기적 방식이라면, 2번째 손님은 30분을 기다려 음식을 주문해야하고 5분이라는 시간이 걸려서야 밥을 먹을 수 있게됩니다.

## 자바스크립트(JavaScript)는 [ _동기식 언어_ ] 이다.

그래서 자바스크립트는 한 번에 하나의 작업을 수행한다. 한 작업이 실행되는 동안 다른 작업은 멈춘 상태를 유지하고 자신의 차례를 기다리는 것을 말한다.

마치 음식점에 여러 사람들과 갔을 때, 키오스크를 이용하여 한 사람씩 결제하는 것과 유사하다. 이러한 동작을 **단일 스레드(싱글 스레드), 동기(Synchronous)**라고 부른다.

```js
console.log('hi');
console.log('hello');
console.log('bye');
```

이렇게 console.log()를 세 개를 입력하고, 출력 결과를 확인해보면,

![](https://velog.velcdn.com/images/gusdh2/post/622dce22-b8a8-46a2-8401-3bd2387d8861/image.png)

당연하게도 이렇게 순서대로 "hi", "hello", "bye"가 찍히는 것을 확인할 수 있다.

### 그렇다면 왜 이렇게 나오는 것일까?

그것은 바로 Javascript의 Engine 열어보면 알 수 있다. ![](https://velog.velcdn.com/images/gusdh2/post/df64a93f-bb47-41e5-a1fb-aef598df429c/image.png)

일단 Memory Heap과 Call Stack은 자바스크립트의 엔진의 주요 구성 요소이다.

> - Memory Heap이란? 변수와 객체의 메모리 할당을 담당하는 곳을 말한다.

> - Call Stack이란? 함수가 호출이 되면 쌓이는 곳이다. 단, 함수가 쌓이는 순서와는 반대로 실행된다.

자바스크립트에서 함수를 호출하면 Call Stack이라는 곳에 호출 순서대로 차곡차곡 쌓인다. 그러고 나서, Stack은 맨 마지막에 호출된 함수가 맨 먼저 반환한다. **List in First Out**, 먼저 들어온 것이 먼저 나간다라는 의미로, **LIFO 구조**라고 부른다.

![](https://velog.velcdn.com/images/gusdh2/post/9e595be4-f822-4666-86a9-d279823d8aff/image.png)

이렇게 순서대로 처음에 console.log("hi")가 호출되면서 Call Stack에 먼저 쌓이고, hi를 반환하면 console.log("hi")는 Call Stack에서 사라진다. 하지만, hi를 반환하기 전까지 다음 작업은 수행할 수 없다. 이 순서대로 console.log("hi")가 사라지고 hi를 반환한다.

![](https://velog.velcdn.com/images/gusdh2/post/e63a443d-c0de-4c8d-ad22-ea0fa6bf4653/image.png)

그러고 나서, console.log("hello")가 쌓이고 hello를 반환하면, console.log("hello")가 사라진다.

![](https://velog.velcdn.com/images/gusdh2/post/057844c2-f4d1-4bd6-85ce-2d6a6addb9fd/image.png)

또, 그러고 나서 console.log("bye")가 쌓이고 bye를 반환하면 console.log("bye")가 마지막으로 사라진다.

이러한 방식으로 진행되기 때문에 콘솔 창에 순서대로 "hi", "hello", "bye"가 찍히는 것이다.

### 그럼 자바스크립트의 비동기적 방식의 작동 원리가 어떻게 될까?

자바스크립트 엔진 밖에서도 자바스크립트에 관여하는 요소들이 있다. `Wep API`, `Task Queue`, `Event Loop` 등 이다. 런타임은 특정 언어로 만든 프로그램들을 실행할 수 있는 환경이다. Node.js나 크롬등의 브라우저들은 자바스크립트가 구동되는 환경이기 때문에, 이를 자바스크립트 런타임이라고 한다.

![](https://velog.velcdn.com/images/gusdh2/post/f22fbf51-bd0e-4b94-b4e7-3292c5c7b0e5/image.svg)

- `Web API` : Web API는 브라우저에서 제공되는 API이다. 자바스크립트 엔진에서 정의되지 않았던 `setTimeout`이나 `HTTP 요청(ajax)` 메소드, `DOM 이벤트` 등의 메소드를 지원한다.
- `Task Queue` : **이벤트 발생 후 호출되어야 할 콜백 함수들이 기다리는 공간**. 이벤트 루프가 정한 순서대로 줄을 서 있으므로 콜백 큐(Callback Queue) 라고도 한다.
- `Event Loop` : 이벤트 발생 시 **호출할 콜백 함수들을 관리**하고, 호출된 콜백 함수의 실행 순서를 결정한다.

#### Task Queue

자바스크립트에서 비동기로 호출되는 함수들은 호출 스택(Call Stack)에 쌓이지 않고 태스크 큐(Task Queue)로 보내진다.

```js
console.log('A');
setTimeout(function () {
  console.log('B');
}, 0);
console.log('C');
// 결과창
// A
// C
// B
```

위 코드는 “A”, “B”, “C” 순으로 콘솔에 표시될 것 같지만 그렇지 않다. 실행 결과는 “A”, “C”, “B” 순으로 콘솔에 찍힌다. ***setTimeout함수로는 인수로 받은 콜백 함수를 일정 시간이 지난 후 실행하도록 예약하는 처리***만 하고, 그다음 바로 다음 코드가 실행되기 때문이다.

이번에는 아래의 코드가 어떻게 비동기로 작동하는지 자세히 알아보자.

```js
console.log('시작');

setTimeout(function () {
  console.log('3초후 실행');
}, 3000);

console.log('끝');

// 시작
// 끝
// 3초후 실행
```

1. 우선 아래와 같이 전역 컨텍스트 main() 함수가 Call Stack에 쌓이고 console.log(“시작”) 이 Call Stack에 쌓인다. “시작”이 콘솔에 찍힌다. ![](https://velog.velcdn.com/images/gusdh2/post/ce5d8e09-85a5-4667-ac95-5e7143e2bed3/image.svg)

2. console.log(“시작”) 이 리턴되며 Call Stack에서 제거된다. ![](https://velog.velcdn.com/images/gusdh2/post/010622ca-30ca-481c-904d-758a6f0e7103/image.svg)

3. setTimeout함수가 실행되면서 Call Stack에 setTimeout함수가 들어간다. ![](https://velog.velcdn.com/images/gusdh2/post/56c028fa-2530-45ee-8f6c-9826e584ac9b/image.svg)

4. setTimeout함수는 자바스크립트 엔진이 처리하지않고 Web API가 처리하므로 Callback함수를 전달하고, setTimeout작업을 요청한다. ![](https://velog.velcdn.com/images/gusdh2/post/0cd78ea4-6d07-425c-9abd-13b04003b1b9/image.svg)

5. Call Stack에서는 setTimeout작업이 제거된다. ![](https://velog.velcdn.com/images/gusdh2/post/f5451de0-beda-4bf6-8d04-e597ba24c8a3/image.svg)

6. console.log(“끝”) 이 호출되어 Call Stack에 쌓인다. “끝”이 콘솔에 찍힌다. ![](https://velog.velcdn.com/images/gusdh2/post/9eb161a4-7b4d-4621-89c1-2fd1e48108c8/image.svg)

7. console.log(“끝”) 이 리턴되며 Call Stack에서 제거된다. ![](https://velog.velcdn.com/images/gusdh2/post/1c0f921f-936f-4ad4-accd-81197e125468/image.svg)

8. main() 함수가 리턴되며 Call Stack에서 제거된다. ![](https://velog.velcdn.com/images/gusdh2/post/51ce4227-e801-4150-af5f-43ceea2a9baf/image.svg)

9. Web API는 setTimeout 작업을 실행한다. 3초를 센 후 Task Queue로 Callback 함수를 보낸다. ![](https://velog.velcdn.com/images/gusdh2/post/d58dc5fb-c6cc-4af9-a613-1d0d73d21696/image.svg)

10. Event Loop는 Call Stack이 비어있으면 Task Queue에서 함수를 하나씩 꺼내 Call Stack에 넣고 실행한다. ![](https://velog.velcdn.com/images/gusdh2/post/29e3791c-7042-4697-8693-0adff721be4f/image.svg)

11. console.log(“3초후 실행”) 이 호출되고 Call Stack에 쌓인다. “3초후 실행”이 콘솔에 찍힌다. ![](https://velog.velcdn.com/images/gusdh2/post/3cef8217-7a1a-44b1-8090-c30cd2d39234/image.svg)

12. console.log(“3초 후 실행”) 이 리턴되고 Call Stack에서 제거된다. 차레로 Callback 함수도 제거된다. Event Loop는 Task Queue에 콜백 함수가 들어올 때까지 계속 대기한다. ![](https://velog.velcdn.com/images/gusdh2/post/b6bbb566-5cc1-4ea9-8327-16274ca5dccc/image.svg)

만약 Call Stack에 함수들이 너무 많이 차있으면 3초후 실행되지 않을 수도 있다. Event Loop는 Call Stack이 비어있을 때만 Task Queue의 함수를 Call Stack으로 가져오기 때문이다. 이게 setTimeout() 시간이 정확하지 않을 수도 있는 이유이다.

#### 자바스크립트에서 비동기처리가 필요한 이유는 뭘까?

화면에서 서버로 데이터를 요청했을 때 서버가 언제 그 요청에 대한 응답을 할지도 모르는 상태에서 다른 코드를 실행 안하고 기다릴 수는 없기 때문이다.

## 콜백함수

하지만 실행 순서가 중요한 상황도 있다. 이런 상황에서 코드를 실행 순서에 따라 실행하려고 할때 주로 콜백함수를 중첩하는 방법을 사용한다.

예를 들어 위에서와 같이 setTimeout을 사용하거나, api요청을 보낸 후 응답을 받아오는 경우 등 바로 실행될 수 없는 조건이 담긴 함수가 있는 상황이 있다. 이런 문제를 해결하기 위한 방법 중 하나가 콜백함수다. 다른 함수의 실행이 끝날 때까지 특정 코드가 실행되지 않게 기다려 주므로 비동기 작업을 순차적으로 실행할 수 있는 것이다.

```js
function f(callback, ...){
    ...
    callback();
    ...
}
f(a, ...);
//이 코드에서 함수 f의 인자로 넘겨진 함수 a가 콜백함수이다.
```

콜백함수란 위와같이 다른 함수에 인수로 넘겨지는 함수이다. 함수의 실행이 끝나면 지정한 콜백함수를 실행해 주도록 함수에 요청할 때 사용한다.

### callback 예시

```js
function first(callback) {
  setTimeout(function () {
    console.log('첫번째');
    callback();
  }, 3000);
}

function second() {
  console.log('두번째');
}

first(function () {
  second();
});

// 첫번째
// 두번째
```

first 함수가 실행되고 3초후에 “첫번째”를 콘솔에 찍고, 인수로 받은 콜백함수를 실행하면서 second 함수가 실행되어 “두번째”가 콘솔에 찍힌다.

아래 코드를 보자!

```js
function say(callback) {
  setTimeout(function () {
    callback();
  }, 3000);
}
say(function () {
  console.log('A');
  say(function () {
    console.log('B');
    say(function () {
      console.log('C');
    });
  });
});

// A
// B
// C
// 3초후에 "A"를 표시하고, 3초후에 "B"를 표시하고, 마지막으로 3초후에 "C"를 표시한다.
```

이렇게 콜백함수를 여러 개 중첩하면 작업내용을 이해하기 어려워진다. 이것을 콜백 지옥(Callback Hell)이라고도 한다.

**Promise를 이용하면 콜백 헬을 극복하고 비동기 처리도 간결하게 작성할 수 있다.**

다음 번에 Promise에 대해서 알아보자~!
