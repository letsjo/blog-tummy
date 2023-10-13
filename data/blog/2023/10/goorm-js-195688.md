---
title: '[구름 195688번] 문자열 나누기/ JavaScript'
date: 2023-10-13
categories:
  - memo
tags:
  - 코딩테스트
---

![](images/Pasted%20image%2020231012050100.png)

# 📝 문제: 문자열 나누기

[문제 링크](https://level.goorm.io/exam/195688/%EB%AC%B8%EC%9E%90%EC%97%B4-%EB%82%98%EB%88%84%EA%B8%B0/quiz/1)

## 🎯 문제 이해하기

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

- **풀이 시간** : 40분
- **시도 횟수** : 1번

---

# 💡 나의 풀이 1번

```js
const solution = (input) => {
  const T = Number(input[0]);
  const calcs = input.slice(1);
  let sum = 0;

  for (let i = 0; i < T; i += 1) {
    const [number1, operation, number2] = calcs[i].split(' ');

    if (operation === '+') {
      sum += Number(number1) + Number(number2);
    } else if (operation === '-') {
      sum += Number(number1) - Number(number2);
    } else if (operation === '*') {
      sum += Number(number1) * Number(number2);
    } else {
      sum += Math.floor(Number(number1) / Number(number2));
    }
  }

  return sum;
};

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
```
