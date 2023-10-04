---
title: 호이스팅과 TDZ는 무엇일까요?
date: 2022-07-06
categories:
  - Study
tags:
  - JavaScript
---

## 🔎 호이스팅?

함수 안에 있는 선언들을 모두 끌어 올려서 해당 함수 유효 스코프의 최상단에 선언하는 것을 말합니다.

즉, 자바스크립트는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅합니다. **(단, 함수 표현식에서의 let/const 변수 선언은 호이스팅이 발생하지 않습니다.)**

중요한 점은 **선언된 것을 끌어올린다**는 것이지, **선언된 변수의 할당된 값을 전부 끌어올리는 것은 아니다.**

---

## 💀 TDZ (Temporal Dead Zone)

호이스팅을 설명하면 빠질 수 없는 키워드가 TDZ(Temporal Dead Zone) 이다. TDZ 는 선언 단계부터 초기화 시작 전까지의 구간을 의미한다.

![](https://velog.velcdn.com/images/gusdh2/post/cfba324a-7e79-4cfb-adf0-3de3df8d03b9/image.png)

자바스크립트에서 변수는 기본적으로 다음 3단계를 거쳐 생성이 된다.

**- 선언 단계 (Declaration phase) ** 변수를 실행 컨텍스트의 변수 객체에 등록하는 단계를 의미이 변수 객체는 스코프가 참조하는 대상이 된다.

**- 초기화 단계 (Initialization phase)** 실행 컨텍스트에 존재 하는 변수 객체에 선언 단계의 변수를 위한 메모리를 만드는 단계이 단계에서 할당된 메모리에는 undefined로 초기화된다.

**- 할당 단계 (Assignment phase)** 사용자가 undefined로 초기화된 메모리의 다른 값을 할당하는 단계

- 실행 컨텍스트 : 코드가 실행되기 위해 필요한 환경
- 스코프 : 변수가 값을 참조할 때 접근할 범위

### ❓그렇다면 var, let은 어떤 차이가 있을까?

- var

![](https://velog.velcdn.com/images/gusdh2/post/1bde22d8-b591-4682-b95a-2702a1a9c0fb/image.png)

☝️1. var 키워드 변수는 선언 시 선언과 초기화를 동시에 진행

☝️2. 실행 컨텍스트 변수 객체의 변수를 등록하고 메모리를 undefined로 만듦

☝️3. 변수에 값을 할당, 변수는 값을 가지게 된다.

☝️4. [2번 과정] 을 보면 선언과 동시에 초기화를 진행하며 메모리를 할당해주기 때문에 호이스팅이 될 때 참조가 가능해서 오류가 발생하지 않는 것이다!

- let, const

![](https://velog.velcdn.com/images/gusdh2/post/61333f58-34da-4539-9f62-3a50c4038646/image.png)

var와 달리, ☝️1. let (+ const)의 변수는 선언 부터 먼저된다. (단, 메모리 할당이 아직 되지않음)

☝️2. TDZ 안에서 머무르는데, 이때 값을 부르게되면, 메모리가 할당되어 있지않아, 접근할 수 없기 때문에, ReferenceError가 발생한다.

☝️3. let이나 const를 만나면 값이 초기화 된다.

☝️4. 객체의 변수를 등록하고, 메모리를 undefined로 만듦.

☝️5. 변수에 값을 할당, 변수는 값을 가지게 된다.

- 함수 선언식

![](https://velog.velcdn.com/images/gusdh2/post/407deb6f-71cd-4e56-ad48-69c5535dc2ff/image.png)

함수 선언식의 경우에는 선언,초기화, 할당이 동시에 진행된다. 그래서 호이스팅도 가능하며, 실행도 바로 가능하다.

- 함수 표현식

```jsx
// 실행 전
logMessage();
sumNumbers();

function logMessage() {
  return 'worked';
}

var sumNumbers = function () {
  return 10 + 20;
};
```

호이스팅에 의해 자바스크립트 해석기는 코드를 아래와 같이 인식한다.

```jsx
// 실행 시
function logMessage() {
  return 'worked';
}

var sumNumbers;

logMessage(); // 'worked'
sumNumbers(); // Uncaught TypeError: sumNumbers is not a function

sumNumbers = function () {
  return 10 + 20;
};
```

위 코드 결과는 아래와 같다.

![](https://velog.velcdn.com/images/gusdh2/post/1ce54934-34dc-43ba-8ece-f0c59bd807ad/image.png)

함수 표현식 sumNumbers 에서 var 도 호이스팅이 적용되어 위치가 상단으로 끌어올려졌다.

```jsx
var sumNumbers;

logMessage();
sumNumbers();
```

하지만 실제 sumNumbers 에 할당될 function 로직은 호출된 이후에 선언되므로, sumNumbers 는 함수로 인식하지 않고 변수로 인식한다.

> 호이스팅을 제대로 모르더라도 함수와 변수를 가급적 코드 상단부에서 선언하면, 호이스팅으로 인한 스코프 꼬임 현상은 방지할 수 있다.
