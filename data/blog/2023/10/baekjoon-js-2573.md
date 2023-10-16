---
title: '[백준 2573번] 빙산 / JavaScript'
date: 2023-10-16
categories:
  - Coding Tests
tags:
  - 1시간
  - 그래프
  - 구현
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 빙산

[문제 링크](https://www.acmicpc.net/problem/2573)

![](images/Pasted%20image%2020231016120207.png)

## 🎯 문제 이해하기

$N$, $M$ : 빙산 맵의 행과 열

지구온난화로 빙산이 녹고 있다. 위 그림처럼 매년 바다에 인접한 면만큼 빙하가 녹고 있는데,[그림 3] 과 같이 빙하가 두 덩이 이상이 되는 최초의 시간(년)을 출력하시오.

- **예제 입력**

```
5 7
0 0 0 0 0 0 0
0 2 4 5 3 0 0
0 3 0 2 5 2 0
0 7 6 2 4 0 0
0 0 0 0 0 0 0
```

- **예제 출력**

```
2
```

## ✒️ 회고

- **풀이 시간** : 40분
- **시도 횟수** : 1번

우선 위 문제를 읽고 두 가지의 함수가 매년 호출되어야 할 것 같다고 생각했습니다.

첫 번째는 빙하 주변을 체크해서 바다와 맞닿은 빙하를 녹이는 함수 (조건 + 반복문) 두 번째는 빙하의 덩이를 체크하는 함수 (bfs)

다행히 한 덩이일 경우, `year`를 `1`씩 증가 시킨 후, 다시 첫 번째 함수가 실행되고그렇지 않을 경우(빙하가 없거나 두 덩이 이상인 경우), `year`을 출력했습니다.

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let iceBoard = input.slice(1).map((val) => val.split(' ').map(Number));
const visited = Array.from(Array(N), () => Array(M).fill(false));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// 빙산 녹이기
const melt = () => {
  const newBoard = Array.from(Array(N), () => Array(M).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++)
      if (iceBoard[i][j] > 0) {
        let count = 0;
        for (let [dx, dy] of directions) {
          const nx = i + dx;
          const ny = j + dy;
          if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
          if (iceBoard[nx][ny] === 0) count++;
        }
        newBoard[i][j] = Math.max(0, iceBoard[i][j] - count);
      }
  }
  return newBoard;
};

// 빙산 덩어리 개수 세기
const bfs = (x, y) => {
  const queue = [[x, y]];
  visited[x][y] = true;

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let [dx, dy] of directions) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (visited[nx][ny] || iceBoard[nx][ny] === 0) continue;
      visited[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }
};

let year = 0;

while (true) {
  let count = 0;
  visited.forEach((row) => row.fill(false));
  for (let i = 0; i < N; i++)
    for (let j = 0; j < M; j++)
      if (iceBoard[i][j] > 0 && !visited[i][j]) {
        bfs(i, j);
        count++;
      }
  if (count === 0) {
    year = 0;
    break;
  }
  if (count >= 2) break;
  iceBoard = melt();
  year++;
}

console.log(year);
```
