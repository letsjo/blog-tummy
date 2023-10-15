---
title: '[javascript] 문자를 숫자로, 숫자를 문자로 변경하는 방법 (아스키코드)'
date: 2023-10-09
categories:
  - Coding Tests
tags:
  - JavaScript
---

# 목차

1. [숫자를-문자로-변환하기](#숫자를-문자로-변환하기)
2. [문자를 숫자로 변환하기](#문자를-숫자로-변환하기)

## 숫자를 문자로 변환하기

```js
const a = String.fromCharCode(65);
console.log(a); // A
```

- [String.fromCharCode() 자세히 보기](#stringfromcharcode)

## 문자를 숫자로 변환하기

```js
const a = 'A';
console.log(a.charCodeAt(0)); // 65
```

- [String.prototype.charCodeAt() 자세히 보기](#stringprototypecharcodeat)

# 추가 설명

---

## String.fromCharCode()

**`String.fromCharCode()`** 메서드는 UTF-16 코드 유닛의 시퀀스로 부터 문자열을 생성해 반환합니다.

```js
String.fromCharCode(num1[, ...[, numN]])
```

### 매개변수

`num1, ..., numN`

UTF-16 코드 유닛인 숫자 뭉치. 가능한 값의 범위는 0부터 65535(0xFFFF)까지 입니다. 0xFFFF를 초과하는 값은 잘립니다. 유효성 검사는 하지 않습니다.

### 반환 값

주어진 UTF-16 코드 유닛 N개로 이루어진 문자열.

---

## String.prototype.charCodeAt()

String 값의 `charCodeAt()` 메서드는 지정된 인덱스의 UTF-16 코드 단위를 나타내는 **`0`에서 `65535` 사이의 정수**를 반환합니다.

`charCodeAt()`는 항상 문자열을 **UTF-16 코드 단위**의 시퀀스로 인덱싱하므로 단일 서로게이트를 반환할 수 있습니다.

더 넓은 범위의 유니코드 코드를 얻으려면, [String.prototype.codePointAt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) 를 참조해주세요.

```js
charCodeAt(index);
```

### 매개변수

- `index` 반환할 문자의 0기반 인덱스입니다.

### 반환 값

지정된 인덱스에 있는 문자의 UTF-16 코드 단위 값을 나타내는 0에서 65535 사이의 정수입니다. 인덱스가 0 ~ (str.length - 1) 범위를 벗어나면 `charCodeAt()`는 `NaN`을 반환합니다.
