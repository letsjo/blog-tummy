---
title: '[백준 17144번] 미세먼지 안녕! / JavaScript'
date: 2023-10-07
categories:
  - coding-tests
tags:
  - 코딩테스트
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

- **풀이 시간** : 1시간 30분
- **시도 횟수** : 3번

BFS를 사용해서 풀었으며, 이번 문제는 공기청정기 작동 시, 바람의 방향 조절하는 부분이 까다로웠던 것 같습니다.

문제의 키 포인트는 아래와 같았던 것 같습니다.

- 미세 먼지가 확산될 때, 초마다 동시에 확산되는 것이기 때문에 순서대로 확산을 반영할 때 이전 확산된 내용이 반영되면 안된다.
- 공기 흐름 방향이 상단 부분과 하단 부분이 각자의 방향을 가지고 있고, **벽을 만났을 때 바뀌는 바람의 방향이 다르다.**
- 미세 먼지를 당기는 것이 아니라 미는 것이기 때문에 **이전 미세 먼지 기록을 기억**하고 있어야 다음 이동하는 좌표에 반영할 수 있다.

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
  // 상단 공기청정기 순환
  let [topCleanerX, topCleanerY] = cleaner[0];
  // 미세먼지 값을 한 칸씩 밀어 줘어야 하기 때문에 전 미세먼지 값을 2번째 인덱스에 넣어줍니다.
  const queue = [[topCleanerX, topCleanerY + 1, board[topCleanerX][topCleanerY + 1]]];
  board[topCleanerX][topCleanerY + 1] = 0;
  // prev = 0 : 초기 바람방향 y축 증가시키기
  let prev = 0;
  while (queue.length > 0) {
    // 큐에 미세먼지 값을 꺼내줍니다.
    const [x, y, dust] = queue.shift();
    if (x === topCleanerX && y === topCleanerY) {
      board[x][y] = -1;
      break;
    }
    // 바람의 방향을 고려해 다음 칸을 nx, ny값에 저장합니다.
    const nx = x + dx[prev];
    const ny = y + dy[prev];
    // 만약 바람의 방향으로 다음 칸이 board 밖으로 벗어났는지를 체크합니다.
    if (nx < 0 || nx >= r || ny < 0 || ny >= c) {
      // prev 값을 1증가시켜 바람의 방향을 변경시켜줍니다.
      prev = (prev + 1) % 4;
      // 바람의 방향을 바꾼 값으로 다시 체크하기 위해 큐에 값을 넣어줍니다.
      queue.push([x, y, dust]);
      continue;
    }
    // 현재 위치의 먼지값과 다음 좌표를 큐에 저장합니다.
    queue.push([nx, ny, board[nx][ny]]);
    // 지도에 그 전 먼지 값을 현재 좌표에 넣어줍니다.
    board[nx][ny] = dust;
  }

  // 하단 공기청정기 순환
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
  // 1초마다 미세먼지 확산을 반영한 board 값을 변경해줍니다.
  board = spreadDust();
  // 이후 공기청정기 작동대로 미세먼지를 이동시켜줍니다.
  operateCleaner(cleaner);
}

let answer = 0;

// 이후 공기청정기를 제외한(board[i][j] > 0) 전체 수의 합계를 answer에 더합니다.
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (board[i][j] > 0) {
      answer += board[i][j];
    }
  }
}

// answer를 출력합니다.
console.log(answer);
```
