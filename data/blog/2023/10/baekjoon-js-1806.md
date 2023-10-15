---
title: '[백준 1806번] 부분합 / JavaScript'
date: 2023-10-15
categories:
  - memo
tags:
  - 코딩테스트
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 부분합

[문제 링크](https://www.acmicpc.net/problem/1806)

## 🎯 문제 이해하기

젓가락 종류 $N$ 과 짝을 맞춰야 하는 갯수 $R$ 이 주어지고, 최악의 경우의 수를 구하면 되는 간단한 문제입니다.

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
