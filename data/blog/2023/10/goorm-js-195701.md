---
title: '[구름 195701번] 대체 경로 / JavaScript'
date: 2023-10-12
categories:
  - Coding Tests
tags:
  - 그래프
  - 1시간
---

![](images/Pasted%20image%2020231012050100.png)

# 📝 문제: 대체 경로

[문제 링크](https://level.goorm.io/exam/195701/%EB%8C%80%EC%B2%B4-%EA%B2%BD%EB%A1%9C/quiz/1)

![](images/Pasted%20image%2020231012234451.png)

## 🎯 문제 이해하기

- $N$ : 도시의 수
- $M$ : 도시와 연결된 도로의 수
- $S$ : 출발 도시 번호
- $E$ : 도착 도시 번호

1. 위 4가지 조건이 주어진다.
2. $M$만큼 두 개의 도시 번호가 주어지는데, 도시 사이에 연결되는 도로이다.
3. `i`가 도시 수 1부터 $N$만큼 1씩 증가하는데, `i`번의 도시가 공사 중일 때, 출발 도시`S`에서 도착 도시 `E`까지 가는 최소 거리를 구하여라.

- **조건**

  - 만약 도착하지 못하게 되면 `-1`을 출력한다.
  - 출발 도시나 도착 도시가 공사 중이면, 도착이 불가능하다.

- **예제 입력**

```
5 5 1 4
1 3
4 3
2 5
4 2
1 5
```

- **예제 출력**

```
-1
3
4
-1
3
```

## ✒️ 회고

- **풀이 시간** : 40분
- **시도 횟수** : 1번

이번 문제는 전형적인 BFS 문제인 것 같습니다.

우선 해당 도시에서 갈 수 있는 경로를 배열로 잘 저장해 놓고, `visited` 배열을 미리 방문한 것으로 체크해 놓는 방법으로 공사 중 처리를 했습니다.

그리고 공사 중이 출발 도시나 도착 도시일 때는 바로 `-1`로 출력 되도록 처리하였으며, 만약 BFS를 다 돌았지만, 도착을 못했다면 `-1`로 출력 될 수 있도록 했습니다.

---

# 💡 나의 풀이

```js
const solution = (input) => {
  const [N, M, S, E] = input[0].split(' ').map(Number);
  const roads = input.slice(1).map((value) => value.split(' ').map((n) => n - 1));
  const paths = Array.from(Array(N), () => new Array());
  const answer = [];

  for (let i = 0; i < roads.length; i += 1) {
    const [u, v] = roads[i];
    paths[u].push(v);
    paths[v].push(u);
  }

  for (let i = 0; i < N; i += 1) {
    if (S - 1 === i || E - 1 === i) {
      answer.push('-1');
      continue;
    }

    const queue = [[S - 1, 1]];
    const visited = Array(N).fill(false);
    visited[i] = true;
    visited[S - 1] = true;

    while (queue.length > 0) {
      const [curr, count] = queue.shift();

      if (E - 1 === curr) {
        answer.push(count + '');
        break;
      }

      paths[curr].forEach((next) => {
        if (!visited[next]) {
          visited[next] = true;
          queue.push([next, count + 1]);
        }
      });
    }

    if (answer.length === i) answer.push('-1');
  }

  return answer.join('\n');
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
