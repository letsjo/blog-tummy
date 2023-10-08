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

BFS 를 사용해서 풀었지만, 문제를 이해하고 구현하는데 초점이 맞춰진 문제인 거 같습니다.

BFS를 많이 풀어봤지만, 오랜만에 코딩테스트 하면서 코드도 길고 구현하는데 엄청 애먹었던 문제였던 것 같습니다.

특히 **[추가 조건1 : 같은 거리에 있는 승객일 때는 행 번호가 더 작은 승객을 태우고 움직이게 됩니다.]** 을 잘못 해석해서 리스트에 입력된 순서의 행을 뜻하는 줄 알고, 승객마다 번호를 매겨서 번호가 낮은 순을 우선 순으로 잡는 방법으로 풀어서 틀린 횟수도 증가하고, 시간을 많이 잡아 먹었네요.

문제를 좀 더 꼼꼼하게 읽어보는 습관을 들여야 할 것 같습니다.

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
