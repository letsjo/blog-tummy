---
title: '[구름 195700번] 중첩 점 / JavaScript'
date: 2023-10-12
categories:
  - coding-tests
tags:
  - 코딩테스트
---

![](images/Pasted%20image%2020231012050100.png)

# 📝 문제: 물병

[문제 링크](https://level.goorm.io/exam/195700/%EC%A4%91%EC%B2%A9-%EC%A0%90/quiz/1)

![](images/Pasted%20image%2020231012050840.png)

## 🎯 문제 이해하기

$N$ : $N*N$ 의 정사각형 보드 $M$ : 반 직선의 개수 $(y_i,x_i,d_i)$ : 시작 좌표와 반 직선의 $d_i$ 방향

겹쳐지는 선의 수를 구하라.

- **예제 입력**

```
3 5
2 1 R
1 1 D
2 3 L
3 3 U
2 2 D
```

- **예제 출력**

```
6
```

## ✒️ 회고

- **풀이 시간** : 40분
- **시도 횟수** : 2번

처음에 선이 두 줄 이상 겹치면 점이 생기니까, 선을 지나는 부분을 1 씩 더해주고, 2 이상이 되면 1을 빼서 출력하는 방법을 사용했다. 하지만 이 방법은 한 가지를 간과했다. 같은 칸에 수직으로 두 줄을 그으면 점이 생기지 않는다는 것이다.

그래서 다시 문제를 천천히 읽어보았다. 그래서 만나는 칸의 `가로선 수 * 세로선 수` 면 `점의 갯수`가 되는 것을 발견했다.

그래서 각 칸마다, Object 자료형으로 `h`와 `v`로 기록을 남겨서 마지막에는 두 개를 곱하는 방법을 사용했다.

마지막 계산하기 위해 board를 처음부터 다 돌아서 시간 복잡도가 $O(n^2)$이 된 게 아쉬운 코드 인 것 같다.

---

# 💡 나의 풀이 1번

```js
function solution(input) {
  const [N, M] = input[0].map(Number);

  const board = Array.from(Array(N + 1), () =>
    Array(N + 1)
      .fill([])
      .map((_) => ({ h: 0, v: 0 })),
  );
  const DIR = {
    U: { x: -1, y: 0, l: 'h' },
    D: { x: 1, y: 0, l: 'h' },
    L: { x: 0, y: -1, l: 'v' },
    R: { x: 0, y: 1, l: 'v' },
  };
  for (let i = 1; i < input.length; i += 1) {
    const [x, y, d] = input[i];
    let positionX = +x;
    let positionY = +y;
    while (true) {
      if (positionX <= 0 || positionY <= 0 || positionX > N || positionY > N) break;
      board[positionX][positionY][DIR[d].l] += 1;
      positionX += DIR[d].x;
      positionY += DIR[d].y;
    }
  }

  let count = 0;

  for (let i = 1; i <= N; i += 1) {
    for (let j = 1; j <= N; j += 1) {
      count += board[i][j].v * board[i][j].h;
    }
  }
  return count;
}

const readline = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let list = [];

rl.on('line', (line) => {
  input.push(line);
});

rl.on('close', () => {
  input.forEach((val) => {
    list.push(val.split(' '));
  });
  console.log(solution(list));
  process.exit();
});
```
