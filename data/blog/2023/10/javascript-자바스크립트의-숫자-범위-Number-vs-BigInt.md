---
title: '[javascript] 자바스크립트의 숫자 범위 (Number vs BigInt)'
date: 2023-10-11
categories:
  - Coding Tests
tags:
  - JavaScript
---

얼마 전, 코딩 테스트를 풀었는데, 아무리 IDE에 돌려봐도 정답임에도 불구하고, 백준(Baekjoon) 에 제출했을 때 `[틀렸습니다]`라는 결과를 받은 적이 있다.

(코드 체크를 위해서 Python으로 동일하게 코드를 짜서 돌려봤었다. 그 떈 정답!)

![](images/Pasted%20image%2020231011150118.png)

틀린 원인을 알 수 가 없어, 많은 시간을 허비한 적이 있었는데, 원인은 `Number` 에 있었다.

# Number vs BigInt

자바스크립트 숫자(`Number`)가 표현 할 수 있는 범위는 +-`2^53 - 1`까지 표현할 수 있다.

![](images/Pasted%20image%2020231011151011.png)

```js
Number.MAX_SAFE_INTEGER ~ Number.MIN_SAFE_INTEGER
= -9007199254740991 ~ 9007199254740991
= -(2의 53승 - 1) ~ (2의 53승 - 1)
```

하지만 그 때 주어지는 수의 범위는 (10의 18승) 이기 때문에, 최대 수를 넘어가 틀렸습니다 라는 결과가 나오게 된 것이였다.

![](images/Pasted%20image%2020231011150731.png)

이 때, 바로 `BigInt`를 사용하면 된다.

# BigInt 에 대해서 알아보자

1. 정수 리터럴 뒤에 'n' 붙이기

```js
let x = 3;
console.log(typeof x); // number

x = 3n;
console.log(typeof x); // bigint
```

2. BigInt() 생성자 함수

```js
let x = 3;
console.log(typeof x); // number

x = BigInt(x);
console.log(typeof x); // bigint
```

- BigInt vs number 값 비교

```js
1234567890123456789 * 123;
// → 151851850485185200000 ❌

1234567890123456789n * 123n;
// → 151851850485185185047n 🟢
```

위 코드를 보면 일의 자리 수를 곱했을 때 9 \* 3 이므로 마지막 자리 수가 7 이 나와야 정확한 값으로 계산되는 값인데 BigInt 처리를 안 해주고 계산하였을 때는 마지막 자리 수가 0으로 정확한 값이 출력이 안됨을 알 수 있습니다.

즉, BigInt 는 BigInt 형 끼리만 연산이 가능합니다.

- BigInt 판별 방법

```js
typeof 1n === 'bigint'; // true
typeof BigInt('1') === 'bigint'; // true
```

- 사용 가능 연산자 : `+`, `*`, `-`, `**`, `% `

```js
const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER);
// ↪ 9007199254740991

const maxPlusOne = previousMaxSafe + 1n;
// ↪ 9007199254740992n

const theFuture = previousMaxSafe + 2n;
// ↪ 9007199254740993n, this works now!

const multi = previousMaxSafe * 2n;
// ↪ 18014398509481982n

const subtr = multi – 10n;
// ↪ 18014398509481972n

const mod = multi % 10n;
// ↪ 2n

const bigN = 2n ** 54n;
// ↪ 18014398509481984n

bigN * -1n
// ↪ –18014398509481984n
```

❗ 소수점 결과를 포함하는 연산을 BigInt와 사용하면 소수점 이하는 사라집니다.

```js
const rounded = 5n / 2n;
// ↪ 2.5n이 아니라 2n
```

❗ BigInt는 내장 Math 객체의 메서드와 함께 사용할 수 없습니다.

```js
const x = BigInt(100);
const y = BigInt(200);

// ❌ TypeError: Cannot convert a BigInt value to a number at Math.max (<anonymous>)
console.log(Math.max(x, y));
```

✔ BigInt는 Number와 일치하지 않지만 동등합니다.

```js
0n === 0;
// ↪ false

0n == 0;
// ↪ true
```

✔ Number와 BigInt는 일반적인 방법으로 비교할 수 있습니다

```js
1n < 2;
// ↪ true
```

✔ if, &&, || 또는 Boolean (int)를 사용할 때, BigInt는 Number와 같은 논리를 따릅니다.

```js
if (0n) {
  console.log('if에서 안녕!');
} else {
  console.log('else에서 안녕!');
}

// ↪ "else에서 안녕!"

0n || 12n;
// ↪ 12n

0n && 12n;
// ↪ 0n

Boolean(0n);
// ↪ false
```

# ⚠️ 참고 사항

현재 Number 데이터 타입의 값이 안전한 값인지 아닌지 확인하기 위해 `Number.isSafeInteger` 메서드를 통해 확인할 수 있습니다.

```js
let max = Number.MAX_SAFE_INTEGER;

console.log(Number.isSafeInteger(max)); // true
console.log(Number.isSafeInteger(++max)); // false
```
