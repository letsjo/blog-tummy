---
title: '[JS] float타입을 int타입으로 변경하는 여러가지 방법'
date: 2023-10-08
categories:
  - memo
tags:
  - JavaScript
---

자바스크립트(JavaScript)에서는 float 타입을 int 타입으로 바꾸는 방법이 몇 가지 있을지 궁금해졌다.

즉, 아래와 같이 1.123 값이 있다면, 소수점은 버리고 1로 만드는 방법 말이다. `1.123 -> 1`

## 첫 번째 방법,

`Math.floor()`

```js
let a = 1.123;
console.log(Math.floor(a));
```

## 두 번째 방법,

`parseInt()`

```js
let a = 1.123;
console.log(parseInt(a));
```

## 세 번째 방법,

`비트 OR(|) 연산자 사용`

```js
let a = 1.123;
console.log(a | 0);
```

## 네 번째 방법,

`비트 NOT(~) 연산자 사용`

```js
let a = 1.123;
console.log(~~a);
```
