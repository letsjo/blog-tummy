---
title: '[백준 17144번] 미세먼지 안녕! / JavaScript'
date: 2023-10-07
categories:
  - Algorithm
tags:
  - BFS
  - 구현
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 미세먼지 안녕!

[문제 링크](https://www.acmicpc.net/problem/17144)

![](images/Pasted%20image%2020231007224536.png) ![](images/Pasted%20image%2020231007225202.png)

## 🎯 문제 이해하기

초마다 미세먼지(번호)가 4방향으로 `(중심 숫자)/5` 만큼 퍼지는데, 퍼지는 만큼 가운데 숫자도 `미세먼지 - (미세먼지/5)×(확산된 방향의 개수)` 만큼 떨어진다. 미세 먼지가 확산된 후에 공기청정기는 위 그림처럼 돌아가며, 공기청정기에 들어온 미세 먼지는 정화되어 사라집니다.

- **예제 입력**

```
7 8 1
0 0 0 0 0 0 0 9
0 0 0 0 3 0 0 8
-1 0 5 0 0 0 22 0
-1 8 0 0 0 0 0 0
0 0 0 0 0 10 43 0
0 0 5 0 15 0 0 0
0 0 40 0 0 0 20 0
```

- **예제 출력**

```
188
```

## ✒️ 회고

- **풀이 시간** : 약 1시간
- **틀린 횟수** : 3번

BFS 를 사용해서 풀었지만, 문제를 이해하고 구현하는데 초점이 맞춰진 문제인 거 같습니다.

오랜만에 코테하면서 코드도 길고, BFS를 많이 풀어봤지만 구현하는데 엄청 애먹었던 문제였습니다.

특히 **[추가 조건1 : 같은 거리에 있는 승객일 때는 행 번호가 더 작은 승객을 태우고 움직이게 됩니다.]** 을 잘못 해석해서 리스트에 입력된 순서의 행을 뜻하는 줄 알고, 승객마다 번호를 매겨서 번호가 낮은 순을 우선 순으로 잡는 방법으로 풀어서 틀린 횟수도 증가하고, 시간을 많이 잡아 먹었네요.

문제를 좀 더 꼼꼼하게 읽어보는 습관을 들여야 할 것 같습니다.

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [r, c, t] = input[0].split(' ').map(Number);
let board = input.slice(1).map((el) => el.split(' ').map(Number));
const cleaner = [];

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

// 공기청정기 위치 찾기
for (let i = 0; i < r; i++) {
  if (board[i][0] === -1) {
    cleaner.push([i, 0]);
    cleaner.push([i + 1, 0]);
    break;
  }
}

// 미세먼지 확산
const spreadDust = () => {
  const newBoard = Array.from(Array(r), () => Array(c).fill(0));
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      // 미세먼지가 있는 칸이라면
      if (board[i][j] > 0) {
        let dust = Math.floor(board[i][j] / 5);
        let count = 0;
        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];
          if (nx >= 0 && nx < r && ny >= 0 && ny < c && board[nx][ny] !== -1) {
            newBoard[nx][ny] += dust;
            count++;
          }
        }
        newBoard[i][j] += board[i][j] - dust * count;
      } else if (board[i][j] === -1) {
        newBoard[i][j] = -1;
      }
    }
  }
  return newBoard;
};

// 공기청정기 작동
const operateCleaner = (cleaner) => {
  let [topCleanerX, topCleanerY] = cleaner[0];
  const queue = [[topCleanerX, topCleanerY + 1, board[topCleanerX][topCleanerY + 1]]];
  board[topCleanerX][topCleanerY + 1] = 0;
  let prev = 0;
  while (queue.length > 0) {
    const [x, y, dust] = queue.shift();
    if (x === topCleanerX && y === topCleanerY) {
      board[x][y] = -1;
      break;
    }

    const nx = x + dx[prev];
    const ny = y + dy[prev];
    if (nx < 0 || nx >= r || ny < 0 || ny >= c) {
      prev = (prev + 1) % 4;
      queue.push([x, y, dust]);
      continue;
    }

    queue.push([nx, ny, board[nx][ny]]);

    board[nx][ny] = dust;
  }

  let [downCleanerX, downCleanerY] = cleaner[1];

  prev = 0;

  const queue2 = [[downCleanerX, downCleanerY + 1, board[downCleanerX][downCleanerY + 1]]];

  board[downCleanerX][downCleanerY + 1] = 0;

  while (queue2.length > 0) {
    const [x, y, dust] = queue2.shift();

    if (x === downCleanerX && y === downCleanerY) {
      board[x][y] = -1;

      break;
    }

    const nx = x + dx[prev];

    const ny = y + dy[prev];

    if (nx < 0 || nx >= r || ny < 0 || ny >= c) {
      prev = (prev + 3) % 4;

      queue2.push([x, y, dust]);

      continue;
    }

    queue2.push([nx, ny, board[nx][ny]]);

    board[nx][ny] = dust;
  }
};

for (let i = 0; i < t; i++) {
  board = spreadDust();

  operateCleaner(cleaner);
}

let answer = 0;

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (board[i][j] > 0) {
      answer += board[i][j];
    }
  }
}

console.log(answer);
```
