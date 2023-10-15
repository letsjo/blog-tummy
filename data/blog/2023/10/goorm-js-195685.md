---
title: '[구름 195685번] 합 계산기 / JavaScript'
date: 2023-10-13
categories:
  - Coding Tests
tags:
  - 구현
---

![](images/Pasted%20image%2020231012050100.png)

# 📝 문제: 합 계산기

[문제 링크](https://level.goorm.io/exam/195685/%ED%95%A9-%EA%B3%84%EC%82%B0%EA%B8%B0/quiz/1)

## 🎯 문제 이해하기

$T$ : 연산 횟수

$T$ 만큼의 연산 식이 입력되는데, `<정수> <연산기호> <정수>` 로 입력 된다. 연산 기호 는 `+`,`-`,`*`, `/` 중 하나의 문자이다.

연산 식의 답을 모두 합한 값을 출력하라. (단, 나누기는 나머지를 버리고 몫만 더한다.)

- **예제 입력**

```
3
1 + 3
4 / 3
3 - 2
```

- **예제 출력**

```
6
```

## ✒️ 회고

- **풀이 시간** : 10분
- **시도 횟수** : 1번

계산기 전체 총 합을 `sum` 변수에 모으고, 연산 기호에 따라 계산 후 `sum` 에 더해서 출력하면 된다.

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
