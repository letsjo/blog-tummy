---
title: '[백준 1806번] 부분합 / JavaScript'
date: 2023-10-15
categories:
  - Coding Tests
tags:
  - 투포인터
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 부분합

[문제 링크](https://www.acmicpc.net/problem/1806)

## 🎯 문제 이해하기

$N$ : 수열의 길이 $S$ : 합의 최소 크기

구간 합 중 $S$ 가 넘지만 구간이 가장 짧은 길이를 출력해주세요.

만약, $S$ 이상을 넘는 구간이 없다면, `0` 을 출력하세요.

- **예제 입력**

```
10 15
5 1 3 5 10 7 4 9 2 8
```

- **예제 출력**

```
2
```

## ✒️ 회고

- **풀이 시간** : 20분
- **시도 횟수** : 2번 이상

구간 합이기 때문에 투 포인터를 사용하여, 풀어야 겠다고 생각했습니다.

1. `start`와 `end`를 `0`으로 초기화 시킵니다.
2. 전체 합을 다시 계산하지 않도록 `sum`에 현재 구간 합을 기록합니다.
3. 그리고 $S$ 가 넘는 구간 때의 길이와 현재 `min` 값 중 작은 값을 `min`에 업데이트 시켜줍니다.

마지막에 `min` 이 `Infinity`라면, `min`이 업데이트 된 적이 없기 때문에 `0`을 출력하고 아니라면 `min` 값을 출력합니다.

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, s] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let start = 0;
let end = 0;
let sum = 0;
let min = Infinity;

while (start <= end && end <= n) {
  if (sum >= s) {
    min = Math.min(min, end - start);
    sum -= arr[start];
    start++;
  } else {
    sum += arr[end];
    end++;
  }
}

console.log(min === Infinity ? 0 : min);
```
