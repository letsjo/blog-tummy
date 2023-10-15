---
title: '[구름 195684번] 프로젝트 매니징 / JavaScript'
date: 2023-10-13
categories:
  - coding-tests
tags:
  - 코딩테스트
---

![](images/Pasted%20image%2020231012050100.png)

# 📝 문제: 프로젝트 매니징

[문제 링크](https://level.goorm.io/exam/195684/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A7%A4%EB%8B%88%EC%A7%95/quiz/1)

## 🎯 문제 이해하기

$N$ : 업무 갯수 $T$ : 현재 시(hour) $M$ : 현재 분(minute) $C_i$ : $i$ 의 업무를 수행하는데 걸리는 시간(단위: 분)

주어진 업무를 모두 수행 후, 현재 시간($T$시 $M$분)을 출력하시오.

- **예제 입력**

```
3
10 10
50
22
23
```

- **예제 출력**

```
11 45
```

## ✒️ 회고

- **풀이 시간** : 15분
- **시도 횟수** : 1번

$T$ 는 $0 \le T < 24$ 이고, $M$ 는 $0 \le M < 60$ 이라는 조건만 생각하고 풀면 될 것 같다.

1. 현재 분($M$)과 업무 시간($C_i$)을 더해서 `60`으로 나눠준 후, 몫을 현재 시($T$) 에 더 해주고, 나머지로 현재 분($M$)의 값을 확정 시킨다.
2. 현재 시($T$) 가 24가 넘을 수도 있기 때문에 24를 나눈 나머지를 현재 시($T$)로 값을 확정 시킨다.
3. 위 1번 과 2번 과정을 $N$번 반복 시킨 후에 마지막 현재 시($T$)와 현재 분($M$)을 출력한다.

---

# 💡 나의 풀이 1번

```js
const solution = (input) => {
  const N = Number(input[0]);
  const [T, M] = input[1].split(' ').map(Number);
  const tasks = input.slice(2).map(Number);

  let currHour = T;
  let currMinute = M;

  for (let i = 0; i < tasks.length; i += 1) {
    const task = tasks[i];
    currMinute += task;

    currHour += Math.floor(currMinute / 60);
    currMinute %= 60;

    if (currHour >= 24) currHour %= 24;
  }
  return [currHour, currMinute].join(' ');
};

const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on('line', (line) => {
  input.push(line);
  // rl.close();
});

rl.on('close', () => {
  console.log(solution(input));
  process.exit();
});
```
