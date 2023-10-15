---
title: '[백준 1052번] 물병 / JavaScript'
date: 2023-10-11
categories:
  - Coding Tests
tags:
  - 비트마스킹
  - 그리디
  - 1시간
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 물병

[문제 링크](https://www.acmicpc.net/problem/1052)

## 🎯 문제 이해하기

N : 소유한 물병 갯수 K : 한 번에 옮길 수 있는 물병 갯수

물병에는 1L의 물이 담겨 있고, 아래 조건에 의해서 물병에 물을 합칠 수 있다.

> 1. 먼저 같은 양의 물이 들어있는 물병 두 개를 고른다.
> 2. 한 개의 물병에 다른 한 쪽에 있는 물을 모두 붓는다.
> 3. 이 방법을 필요한 만큼 계속 한다.

그래서 2개의 물병에 같은 물이 담겨 있어야 물병에 물을 옮겨 물병 수를 줄일 수 있다.

필요 시, 물병은 상점에서 구매할 수 있다.

상점에서 물병을 몇 병 사야 한 번에 옮길 수 있을까요?

- **예제 입력**

```
3 1
```

- **예제 출력**

```
1
```

## ✒️ 회고

- **풀이 시간** : 30분(1번 풀이) / 40분 (2번 풀이)
- **시도 횟수** : 1번 / 2번

물병이 홀수 개라면 물을 합칠 수 없기 때문에 들고 옮겨야 할 물병에 갯수가 증가 해야한다. 그래서 홀수 개일 경우, 우선 따로 빼놓고 짝수 개로 꽃병을 합쳐서 반으로 쪼개는 작업을 계속 진행한다.

만약 들고 가야할 물병의 갯수가 K보다 크다면, 상점에서 물병을 구매(`count++`)하고 다시 위 작업을 진행한다. 그러다가 K보다 작아지는 경우가 생긴다면, 그 `count` 값을 출력한다.

이번 문제는 간단하게 풀면 1번 문제처럼 풀 수 있었다. 하지만 2번처럼 풀기 위해서는 [비트 마스킹](https://blog-tummy.vercel.app/blog/2023/10/javascript-bitmask)을 공부하고 풀어야 했습니다.

코딩 테스트를 꾸준히 풀었던 이유는 이러한 코딩 기법들을 배우기 위해서 푸는 것이기 때문에 비트 마스킹을 사용해서도 풀어보고 싶었습니다.

1번 풀이와 2번 풀이 모두 아래에서 확인하실 수 있습니다.

---

# 💡 나의 풀이 1번

```js
let input = require('fs').readFileSync(0, { encoding: 'utf-8' }).split('\n');

let [N, K] = input[0].split(' ').map((v) => +v);
let answer = 0;

while (true) {
  let count = 0;
  let temp = N;
  while (temp > 0) {
    if (temp % 2 === 1) {
      count += 1;
    }
    temp = Math.floor(temp / 2);
  }

  if (count <= K) {
    break;
  }
  N += 1;
  answer += 1;
}

console.log(answer);
```

---

# 💡 나의 풀이 2번 (비트 마스킹)

```js
let input = require('fs').readFileSync(0, { encoding: 'utf-8' }).split('\n');

let [N, K] = input[0].split(' ').map((v) => +v);
let answer = 0;

while (true) {
  let count = 0;
  let temp = N;
  while (temp > 0) {
    if (temp & 1) {
      count += 1;
    }
    temp >>= 1;
  }
  if (count <= K) {
    break;
  }
  N += 1;
  answer += 1;
}

console.log(answer);
```
