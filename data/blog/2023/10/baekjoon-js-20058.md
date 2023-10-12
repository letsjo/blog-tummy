---
title: '[백준 20058번] 마법사 상어와 파이어스톰 / JavaScript'
date: 2023-10-13
categories:
  - memo
tags:
  - 코딩테스트
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 마법사 상어와 파이어스톰

[문제 링크](https://www.acmicpc.net/problem/20058)

![](images/Pasted%20image%2020231013021718.png)

## 🎯 문제 이해하기

- $N$ : $2^N$ × $2^N$ 의 아이스 맵 크기
- $Q$ : 파이어스톰의 시전 횟수
- $L$ : 파이어스톰의 단계 ($L_1$,$L_2$,...$L_Q$)

> 파이어 스톰의 단계는 $2^L$x$2^L$ 만큼 잘려 시행된다.

1. $N$, $Q$ 가 주어진다.
2. 아이스 맵 블록 양이 출력된다.
3. 파이어스톰의 단계($L$)가 시전 횟수($Q$) 만큼 주어진다.

- 파이어스톰의 로직

  1. 위 그림 처럼 파이어스톰의 단계 $L$ 만큼의 크기로 잘리고, 크기로 90도 만큼 회전된다.
  2. 각 아이스블록의 인접한(상,하,좌,우) 블록이 얼음인 경우가 2개 이하라면, 해당 블록은 얼음 양이 1씩 녹는다.
  3. 위 1번과 2번을 $Q$만큼 반복한다.
  4. 마지막 이후 아이스 맵의전체 얼음의 양과 아이스 블록이 합쳐진 한 덩어리의 얼음의 양이 가장 큰 값을 구하시오.

- **예제 입력**

```
3 1
1 2 3 4 5 6 7 8
8 7 6 5 4 3 2 1
1 2 3 4 5 6 7 8
8 7 6 5 4 3 2 1
1 2 3 4 5 6 7 8
8 7 6 5 4 3 2 1
1 2 3 4 5 6 7 8
8 7 6 5 4 3 2 1
1
```

- **예제 출력**

```
284
64
```

## ✒️ 회고

- **풀이 시간** : 1시간 40분
- **시도 횟수** : 2번

---

문제 구현 난이도가 생각보다 높은 문제임에도 불구하고, 생각보다는 빨리 푼 문제 인 거 같다.

주의 해야 하는 점이 아이스 블록이 녹을 때, `temp` 라는 아이스 맵을 통해서 돌려줘야 이전 결과가 반영되지 않고 한 번에 녹는 그림을 그릴 수 있다.

그리고 아이스 블록을 돌릴 때도, `temp` 라는 또 다른 아이스맵을 만들어주고 돌려야 묶음으로 돌리기 수월하다.

이후 아이스 양을 체크할 때는 기존 bfs 랑 동일하게 풀면 된다.

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, Q] = input[0].split(' ').map(Number);
const iceMap = input.slice(1).map((line) => line.split(' ').map(Number));
const L = iceMap.pop().map(Number);
const mapSize = 2 ** N;

/**
 * 아이스블록을 회전시키는 함수
 * @param {number} x // 회전시킬 아이스블록의 x좌표
 * @param {number} y // 회전시킬 아이스블록의 y좌표
 * @param {number} l // 회전시킬 아이스블록의 크기
 * @returns {void}
 */
const rotateIceBlock = (x, y, l) => {
  const temp = Array.from(Array(l), () => new Array(l).fill(0)); // 아이스블록을 90도 회전시키기 // temp[0][0] => iceMap[0+2-1-0][0+0] = iceMap[1][0]; // temp[0][1] => iceMap[0+2-1-1][0+0] = iceMap[0][0]; // temp[1][0] => iceMap[0+2-1-0][0+1] = iceMap[1][1]; // temp[1][1] => iceMap[0+2-1-1][0+1] = iceMap[0][1];
  for (let i = 0; i < l; i += 1) {
    for (let j = 0; j < l; j += 1) {
      temp[i][j] = iceMap[y + l - 1 - j][x + i];
    }
  }
  for (let i = 0; i < l; i += 1) {
    for (let j = 0; j < l; j += 1) {
      iceMap[y + i][x + j] = temp[i][j];
    }
  }
};

/**
 * 얼음 녹이는 함수
 * @returns {void}
 */
const meltIceBlock = () => {
  const temp = Array.from(Array(mapSize), () => new Array(mapSize).fill(0));
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  for (let i = 0; i < mapSize; i += 1) {
    for (let j = 0; j < mapSize; j += 1) {
      if (iceMap[i][j] === 0) continue;
      let count = 0;

      for (let k = 0; k < 4; k += 1) {
        const nx = j + dx[k];
        const ny = i + dy[k];

        if (nx < 0 || ny < 0 || nx >= mapSize || ny >= mapSize) continue;
        if (iceMap[ny][nx] > 0) count += 1;
      }
      if (count < 3) temp[i][j] = iceMap[i][j] - 1;
      else temp[i][j] = iceMap[i][j];
    }
  }

  for (let i = 0; i < mapSize; i += 1) {
    for (let j = 0; j < mapSize; j += 1) {
      iceMap[i][j] = temp[i][j];
    }
  }
};

/**
 * 아이스블록의 양을 세는 함수
 * @param {*} x
 * @param {*} y
 * @returns {number} 아이스블록의 양
 */
const bfs = (x, y) => {
  const visited = Array.from(Array(mapSize), () => new Array(mapSize).fill(false));
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  const queue = [[x, y]];
  let count = 1;

  visited[y][x] = true;

  while (queue.length > 0) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < 4; i += 1) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || ny < 0 || nx >= mapSize || ny >= mapSize) continue;
      if (visited[ny][nx] || iceMap[ny][nx] === 0) continue;

      visited[ny][nx] = true;
      queue.push([nx, ny]);
      count += 1;
    }
  }
  return count;
};

for (let i = 0; i < Q; i += 1) {
  // 회전시킬 아이스블록의 크기
  const l = 2 ** L[i];
  for (let j = 0; j < mapSize; j += l) {
    for (let k = 0; k < mapSize; k += l) {
      rotateIceBlock(k, j, l);
    }
  }
  meltIceBlock();
}

let sum = 0;
let max = 0;

const visited = Array.from(Array(mapSize), () => new Array(mapSize).fill(false));

for (let i = 0; i < mapSize; i += 1) {
  for (let j = 0; j < mapSize; j += 1) {
    sum += iceMap[i][j];
    if (iceMap[i][j] === 0 || visited[i][j]) continue;
    const count = bfs(j, i);
    max = Math.max(max, count);
  }
}

console.log(`${sum}\n${max}`);
```
