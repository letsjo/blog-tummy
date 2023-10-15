---
title: '[구름 195688번] 문자열 나누기/ JavaScript'
date: 2023-10-13
categories:
  - Coding Tests
tags:
  - 코딩테스트
---

![](images/Pasted%20image%2020231012050100.png)

# 📝 문제: 문자열 나누기

[문제 링크](https://level.goorm.io/exam/195688/%EB%AC%B8%EC%9E%90%EC%97%B4-%EB%82%98%EB%88%84%EA%B8%B0/quiz/1)

## 🎯 문제 이해하기

길이 $N$인 문자열을 3등분 한다.

예를 들어, 문자열 `{abcd}` 인 경우,

- `{ab,c,d}`
- `{a,bc,d}`
- `{a,b,cd}` 가 있을 것이다.

여기서 부분 문자열을 $P$ 라고 하는데, 3등분의 경우의 수를 모두 모아 사전 순서로 나열한 배열을 뜻한다.

$P$ = [`a`,`ab`,`b`,`bc`,`c`,`cd`,`d`]

이 때, `{ab,c,d}`의 점수는 $2 + 5 + 7 = 14$ 가 된다.

이렇게 문자열 $S$ 를 3등분 했을 때, 최고 점수를 출력하라.

- **예제 입력**

```
4
abcd
```

- **예제 출력**

```
14
```

## ✒️ 회고

- **풀이 시간** : 50분
- **시도 횟수** : 1번

오랜만에 완탐 문제를 만나서, 많이 고민했었던 것 같다.

모든 경우의 수의 문자열을 쪼갠 다음, 3등분 시키고 배열에 저장해 놓는다.

이후 `flat()` 메서드를 이용해 배열을 분리시킨 후, `new Set()` 함수로 중복 요소를 제거 시킨다. 이후 다시 배열 타입으로 돌려 놓는다.

그리고 위에 3등분으로 나눠 놓은 경우의 수를 돌면서, 최고점을 찾아 출력하는 로직으로 풀었다.

---

# 💡 나의 풀이

```js
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on('line', (line) => {
  input.push(line);
});

rl.on('close', () => {
  console.log(solution(input));
  process.exit();
});

function solution(input) {
  const N = Number(input[0]);
  const S = input[1];
  const sub = [];

  for (let i = 1; i < N - 1; i += 1) {
    for (let j = i + 1; j < N; j += 1) {
      sub.push([S.slice(0, i), S.slice(i, j), S.slice(j)]);
    }
  }

  const P = [...new Set(sub.flat(Infinity))];
  P.sort();
  let maxScore = 0;

  for (let i = 0; i < sub.length; i += 1) {
    const [first, second, third] = sub[i];
    let score = 0;
    score += P.indexOf(first) + 1;
    score += P.indexOf(second) + 1;
    score += P.indexOf(third) + 1;

    maxScore = Math.max(maxScore, score);
  }

  return maxScore;
}
```
