---
title: '[javascript] float타입을 int타입으로 변경하는 여러가지 방법 (소수점 버림)'
date: 2023-10-08
categories:
  - coding-tests
tags:
  - JavaScript
---

# 목차

1. [Math.floor() 활용](#첫-번째-mathfloor를-활용)
2. [parseInt() 활용](#두-번째-parseint를-활용)
3. [비트 OR(|) 연산자 활용](#세-번째-비트-or-연산자-를-활용)
4. [비트 NOT(~) 연산자 활용](#네-번째-비트-not-연산자-를-활용)

`1.123 -> 1`

자바스크립트( #JavaScript)에서는 float 타입을 int 타입으로 바꾸는 방법이 몇 가지 있을지 궁금해졌다.

# 첫 번째, `Math.floor()`를 활용

```js
let a = 1.123;
console.log(Math.floor(a));
```

- [Math.floor() 자세히 보기](#mathfloor)

# 두 번째, `parseInt()`를 활용

```js
let a = 1.123;
console.log(parseInt(a));
```

- [parseInt() 자세히 보기](#parseint)

# 세 번째, `비트 OR(|) 연산자` 를 활용

```js
let a = 1.123;
console.log(a | 0);
```

# 네 번째, `비트 NOT(~) 연산자` 를 활용

```js
let a = 1.123;
console.log(~~a);
```

## ⚠️ 비트 연산자 사용시 주의 사항

> 비트 연산자를 사용하게 되면, 피연산자는 32비트 정수로 변환되며 일련의 비트(0과 1)로 표현됩니다. 32비트 이상인 숫자는 최상위 비트가 삭제됩니다.
>
> - 출처: MDN

아래 그림을 확인하면, 이해가 좀 더 쉬울 것 같습니다. `2^31`값을 넘어가는 순간 32비트가 표현할 수 있는 int 형이 끝이기 때문에 마이너스(`-`)값으로 나오게 됩니다.

참고: `2^31 = 2147483648`

![](images/Pasted%20image%2020231008233233.png)

# 추가 설명

---

### Math.floor()

**`Math.floor()`** 함수는 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환합니다.

```js
Math.floor(x);
```

#### 매개변수

- `x` 숫자

#### 반환 값

주어진 수 이하의 가장 큰 정수.

---

### parseInt()

**`parseInt()`** 함수는 문자열 인자를 파싱하여 특정 진수(수의 진법 체계에서 기준이 되는 값)의 정수를 반환합니다.

```js
parseInt(string);
parseInt(string, radix);
```

#### 매개변수

- `string` 파싱할 값입니다. 문자열이 아닐 경우 `ToString` 추상 연산을 사용해 문자열로 변환합니다. 문자열의 선행 공백은 무시합니다.

- `radix` (Optional) `string`의 진수를 나타내는 `2`부터 `36`까지의 정수입니다. 주의하세요. 기본 값이 `10`이 **아닙니다!** `Number` 자료형이 아닌 경우 `Number`로 변환합니다.

#### 반환 값

주어진 `string`에서 파싱한 정수입니다.

다음과 같은 경우에는 `NaN`을 반환합니다.

- `radix`가 2보다 작거나 36보다 큰 경우.
- 공백이 아닌 첫 문자를 숫자로 변환할 수 없는 경우.
