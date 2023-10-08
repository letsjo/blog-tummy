---
title: '[백준 16234번] 인구 이동 / JavaScript'
date: 2023-10-07
categories:
  - Algorithm
tags:
  - BFS
  - 구현
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 인구 이동

[문제 링크](https://www.acmicpc.net/problem/16234)

![](images/Pasted%20image%2020231008164626.png)

## 🎯 문제 이해하기

- n : `n x n` 의 땅 크기 (사각형 하나 당 하나의 나라를 의미함)
- l : 인접 나라와 연합하기 위한 최소 인원 차이
- r : 인접 나라와 연합하기 위한 최대 인원 차이
- 각 칸의 숫자 의미: 각 나라의 인구 수를 의미

- **예제 입력**

```
3 5 10
10 15 20
20 30 25
40 22 10
```

- **예제 출력**

```
2
```

## ✒️ 회고

- **풀이 시간** : 1시간 30분
- **시도 횟수** : 5번

문제를 보자마자 BFS 풀어야 겠다고 생각했습니다.

1. 각 연합 별로 그룹을 묶어주기 위해서, visited 를 이용해서 연합마다 각 칸마다 숫자(union)를 배정해줬습니다.
2. `getPopulationByUnion`함수 안에서 연합이 가능한 나라를 묶어주면서, 각 나라의 인구 수를 모두 더합니다. 그리고 총 인구 수에서 연합이 가능한 나라의 수를 나눠 하나의 나라의 인구 수를 반환해줍니다.
3. 연합된 나라에 인구 수를 업데이트해줍니다.
4. 방문하지 않은 나라를 찾아 2,3번을 반복해줍니다.
5. 인구 이동이 없을 경우에 count 를 출력해줍니다.

여기서 3번 연합된 나라에 인구 수를 업데이트해주는 부분에서 처음에 visited에 적힌

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, l, r] = input[0].split(' ').map(Number);
const board = input.slice(1).map((el) => el.split(' ').map(Number));
let visited = Array.from(Array(n), () => Array(n).fill(0));
let united = [];

const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

/**
 * 연합을 찾고, 연합의 각 칸의 인구 수를 구하는 함수
 * @param {number} x : 행
 * @param {number} y : 열
 * @param {number} union : 연합 번호
 * @returns {number} : 각 연합의 이동 후 인구 수
 */
const getPopulationByUnion = (x, y, union) => {
  const stack = [[x, y]];
  let sum = board[x][y];
  united = [[x, y]];
  visited[x][y] = union;
  while (stack.length > 0) {
    const [x, y] = stack.pop();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      // 범위를 벗어나지 않고, 방문하지 않았다면?
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && visited[nx][ny] === 0) {
        const diff = Math.abs(board[x][y] - board[nx][ny]);
        // 인구 차이가 범위 내라면
        if (diff >= l && diff <= r) {
          visited[nx][ny] = union;
          stack.push([nx, ny]);
          united.push([nx, ny]);
          sum += board[nx][ny];
        }
      }
    }
  } // 연합의 인구 수
  return Math.floor(sum / united.length);
};

let count = 0;

while (true) {
  let union = 0;
  visited = Array.from(Array(n), () => Array(n).fill(0));
  // 연합 구하기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 방문하지 않았다면,
      if (visited[i][j] === 0) {
        // 연합 번호 올리기
        union++;
        united = [];
        // 해당 연합의 각 나라 인구 구하기
        const population = getPopulationByUnion(i, j, union);

        // 연합의 인구 이동
        for (let k = 0; k < united.length; k++) {
          const [x, y] = united[k];
          board[x][y] = population;
        }
      }
    }
  }

  // 인구 이동이 없다면
  if (union === n * n) {
    break;
  }
  count++;
}

console.log(count);
```
