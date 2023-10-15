---
title: '[구름 195702번] 연결 요소 제거하기 / JavaScript'
date: 2023-10-12
categories:
  - Coding Tests
tags:
  - 코딩테스트
---

![](images/Pasted%20image%2020231012050100.png)

# 📝 문제: 연결 요소 제거하기

[문제 링크](https://level.goorm.io/exam/195702/%EC%97%B0%EA%B2%B0-%EC%9A%94%EC%86%8C-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0/quiz/1)

## 🎯 문제 이해하기

$N$ : $N$x$N$ 배열의 크기 $K$ : 연결 요소가 될 최소 갯수 $Q$ : 배열에 추가될 문자 갯수

1. $N$ 크기의 Board 가 먼저 주어진다.
2. $Q$ 의 수 만큼 추가될 위치와 문자가 주어진다.
3. $K$ 개의 요소가 맞닿아 있으면, 연결 요소가 되며, 연결된 요소는 Board에서 제거된다.

- **조건**

  - 처음 주어지는 Board 에서는 연결 요소가 존재하지 않는다.
  - 배열에 추가될 문자 위치는 `.`(요소가 없는 빈 칸)이 보장된다.

- **예제 입력**

```
5 5 6
AB..C
BBAZZ
....A
BBB.B
CCBAB
3 4 A
3 1 A
3 3 A
3 2 B
3 2 A
1 2 D
```

- **예제 출력**

```
AD..C
...ZZ
.....
....B
CC.AB
```

## ✒️ 회고

- **풀이 시간** : 1시간 30분
- **시도 횟수** : 1번

기존 DFS 에 K개 이상이 라면, `.`으로 board에서 바꾸는 작업까지 해야 하기 때문에, `update`라는 배열을 만들어서 업데이트를 시켜주었습니다.

큰 특징이 없는 전형적인 DFS 문제였습니다.

중간 중간마다 작은 실수가 있어서 조금 오래 걸리긴 했지만, 자주 풀어서 시간 단축 할 수 있도록 해야 될 것 같습니다.

---

# 💡 나의 풀이

```js
const solution = (input) => {
  const [N, K, Q] = input[0].split(' ').map(Number);
  let board = input.slice(1, N + 1).map((val) => [...val]);
  const orders = input.splice(N + 1, Q).map((val) => val.split(' '));

  for (let i = 0; i < Q; i += 1) {
    const [x, y, d] = orders[i];
    const positionX = +x - 1;
    const positionY = +y - 1;

    board[positionX][positionY] = d;

    const stack = [[positionX, positionY]];
    const update = [[positionX, positionY]];
    const visited = Array.from(Array(N), () => Array(N).fill(true));
    visited[positionX][positionY] = false;

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      for (let i = 0; i < 4; i += 1) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (0 <= nx && nx < N && 0 <= ny && ny < N && board[nx][ny] === d && visited[nx][ny]) {
          visited[nx][ny] = false;
          update.push([nx, ny]);
          stack.push([nx, ny]);
        }
      }
    }

    if (update.length >= K) {
      update.forEach(([x, y]) => (board[x][y] = '.'));
    }
  }
  return board.map((val) => val.join('')).join('\n');
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
