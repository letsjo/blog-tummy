---
title: '[백준 15312번] 이름 궁합 / JavaScript'
date: 2023-10-09
categories:
  - Coding Tests
tags:
  - 구현
  - 문자열
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 이름 궁합

[문제 링크](https://www.acmicpc.net/problem/15312)

![](images/Pasted%20image%2020231009151536.png)

## 🎯 문제 이해하기

1. 알파벳 대문자로 주어진 A와 B의 이름을 한글자씩 교차합니다.
2. 교차한 단어의 알파벳을 주어진 조건에 따라 숫자로 변경합니다.
3. 위 사진과 같이 2자리씩 더해 일의 자릿수만 남깁니다.
4. 최종 남은 숫자 2개 남을 때까지 3번을 반복해줍니다.

`const alphabet = [3, 2, 1, 2, 3, 3, 2, 3, 3, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1]`

주어진 알파벳은 `String.charCodeAt(index)` 내장 함수를 사용해 유니코드로 변경해준다.

```js
// 참고: 대문자 'A' Unicode 값은 65
'A'.charCodeAt(0); // 65

// 참고: 소문자 'a' Unicode 값은 97
'a'.charCodeAt(0); // 97
```

- **예제 입력**

```
CJM
HER
```

- **예제 출력**

```
99
```

## ✒️ 회고

- **풀이 시간** : 10분
- **시도 횟수** : 1번

문자를 유니코드로 바꾸는 내장 함수만 알면, 쉽게 풀 수 있는 문제였습니다.

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const alphabet = [3, 2, 1, 2, 3, 3, 2, 3, 3, 2, 2, 1, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1];

const A = input[0];
const B = input[1];

let result = [];
const len = A.length > B.length ? A.length : B.length;

for (let i = 0; i < len; i++) {
  if (A[i]) result.push(alphabet[A.charCodeAt(i) - 65]);
  if (B[i]) result.push(alphabet[B.charCodeAt(i) - 65]);
}

while (result.length > 2) {
  const temp = [];
  for (let i = 0; i < result.length - 1; i++) {
    temp.push((result[i] + result[i + 1]) % 10);
  }
  result = [...temp];
}

console.log(`${result[0]}${result[1]}`);
```
