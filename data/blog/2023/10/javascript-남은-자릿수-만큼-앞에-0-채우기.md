---
title: '[javascript] 자릿수 만큼 남는 공간 0으로 채우는 방법 (0 채우기)'
date: 2023-10-09
categories:
  - Coding Tests
tags:
  - JavaScript
---

# 목차

- [Array.join('0') 활용](#arrayjoin0-활용)
- [String.slice() 활용](#stringslice-활용)
- [String.padStart() 활용](#stringpadstart자리수-덧붙힐문자열-활용)

코딩 테스트를 풀거나, 날짜나 시간을 표현해야 할 때, 앞에 남은 자릿수만큼 0을 붙여서 출력 해야 하는 경우가 발생한다.

> `2 -> 002` 와 같은 경우이다.

남은 자릿수 만큼 앞에 0을 채우려면 어떤 방법이 있을까요?

# `Array.join('0')` 활용

```js
const fillZero1 = (width, number) => {
  const strNumber = '' + number;
  return strNumber.length >= width ? strNumber : new Array(width - strNumber.length + 1).join('0') + strNumber;
};
console.log(fillZero1(5, 10)); // '00010'
```

- [Array.prototype.join() 자세히 보기](#arrayprototypejoin)

# `String.slice()` 활용

```js
const fillZero2 = (width, number) => {
  const strNumber = '0'.repeat(width) + number;
  return strNumber.slice(-width);
};
console.log(fillZero2(5, 10)); // '00010'
```

- [String.prototype.slice() 자세히 보기](#stringprototypeslice)

# `String.padStart(자리수, 덧붙힐문자열)` 활용

```js
const fillZero3 = (width, number) => {
  return number.toString().padStart(width, '0');
};
console.log(fillZero3(5, 10));
```

- [String.prototype.padStart() 자세히 보기](#stringprototypepadStart)

# 번외

숫자를 뒤에 덧붙여야 할 경우에는 `String.padEnd(자리수, 덧붙힐문자열)`를 활용할 수도 있다.

```js
'abc'.padEnd(10); // "abc       "
'abc'.padEnd(10, 'foo'); // "abcfoofoof"
'abc'.padEnd(6, '123456'); // "abc123"
'abc'.padEnd(1); // "abc"
'abc'.padEnd(9, '123'); // "abc123123"
'주석문'.padStart(6, '*').padEnd(9, '*'); // "***주석문***"
```

### String.prototype.padEnd()

**`padEnd()`** 메서드는 현재 문자열에 다른 문자열을 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다. 채워넣기는 대상 문자열의 끝(우측)부터 적용됩니다.

```js
str.padEnd(targetLength [, padString])
```

#### 매개변수

- `targetLength` 목표 문자열 길이. 현재 문자열의 길이보다 작다면 채워넣지 않고 그대로 반환.

- `padString` (Optional) 현재 문자열에 채워 넣을 다른 문자열. 문자열이 너무 길어 목표 문자열 길이를 초과한다면 좌측 일부를 잘라서 넣음. 기본값은 " ". (U+0020)

#### 반환값

끝부터 주어진 문자열로 채워 목표 길이를 만족하는 `String`

# 추가 설명

---

### Array.prototype.join()

**`join()`** 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.

```js
arr.join([separator]);
```

#### 매개변수

- `separator` (Optional) 배열의 각 요소를 구분할 문자열을 지정합니다. 이 구분자는 필요한 경우 문자열로 변환됩니다. 생략하면 배열의 요소들이 쉼표로 구분됩니다. `separator`가 빈 문자열이면 모든 요소들이 사이에 아무 문자도 없이 연결됩니다.

#### 반환 값

배열의 모든 요소들을 연결한 하나의 문자열을 반환합니다. 만약 `arr.length` 가 `0`이라면, 빈 문자열을 반환합니다.

---

### String.prototype.slice()

**`slice()`** 메소드는 문자열의 일부를 추출하면서 새로운 문자열을 반환합니다.

```js
str.slice(beginIndex[, endIndex])
```

#### 매개변수

- `beginIndex` 추출 시작점인 0부터 시작하는 인덱스입니다. 만약 음수라면, beginIndex는 `strLength(문자열 길이) + beginIndex`로 취급됩니다. (예를 들어 `beginIndex`가 -3이면 시작점은 `strLength - 3`).

  만약 `beginIndex`가 `strLength` 보다 크거나 같은 경우, `slice()`는 빈 문자열을 반환합니다.

- `endIndex`(Optional) 0부터 시작하는 추출 종료점 인덱스로 그 직전까지 추출됩니다. 인덱스 위치의 문자는 추출에 포함되지 않습니다.

  만약 `endIndex`가 생략된다면, `slice()`는 문자열 마지막까지 추출합니다. 만약 음수라면, endIndex는 `strLength(문자열 길이) + endIndex` 로 취급됩니다(예를 들어 `endIndex`가 -3이면 종료 점은 `strLength - 3`).

#### 반환 값

문자열의 추출된 부분을 담는 새로운 문자열이 반환됩니다.

---

### String.prototype.padStart()

**`padStart()`** 메서드는 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다. 채워넣기는 대상 문자열의 시작(좌측)부터 적용됩니다.

```js
str.padStart(targetLength [, padString])
```

#### 매개변수

- `targetLength` 목표 문자열 길이. 현재 문자열의 길이보다 작다면 채워넣지 않고 그대로 반환.

- `padString` (Optional) 현재 문자열에 채워넣을 다른 문자열. 문자열이 너무 길어 목표 문자열 길이를 초과한다면 좌측 일부를 잘라서 넣음. 기본값은 " ". (U+0020)

#### 반환값

시작점부터 주어진 문자열로 채워 목표 길이를 만족하는 `String`
