---
title: '[백준 15686번] 치킨 배달 / JavaScript'
date: 2023-10-08
categories:
  - Coding Tests
tags:
  - 코딩테스트
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 치킨 배달

[문제 링크](https://www.acmicpc.net/problem/15686)

```
0 2 0 1 0
1 0 1 0 0
0 0 0 0 0
0 0 0 1 1
0 0 0 1 2
```

## 🎯 문제 이해하기

- n: 지도 크기
- m: 유지할 체인점 수
- 0: 빈칸
- 1: 집
- 2: 치킨집

치킨 프랜차이즈를 운영하는데, m개의 체인점만 남기고 폐업할 예정이다. m개의 체인점만 남겼을 때, 집(1)과 치킨집(2) 사이 거리를 최소로 해서 거리의 총 합을 출력하라.

- (r1, c1)과 (r2, c2) 사이의 거리 계산식: `|r1-r2| + |c1-c2|`

- **예제 입력**

```
5 3
0 0 1 0 0
0 0 2 0 1
0 1 2 0 0
0 0 1 0 0
0 0 0 0 2
```

- **예제 출력**

```
5
```

## ✒️ 회고

- **풀이 시간** : 1시간 30분
- **시도 횟수** : 1번

처음 문제에 접근할 때, BFS로 접근 해야 하나? 어떤 방식으로 풀어야 하지 고민을 했었습니다. 생각해보니, 치킨과 집 사이에 둘러 가야하는 벽이 있는 것이 아니였기 때문에 BFS로 접근하는 방식 보다는 유지할 치킨 집의 경우의 수로 접근해야겠다고 생각하게 되었습니다.

살아남을 치킨 집의 경우의 수를 구해서, 각 경우의 수마다 치킨집과 집 사이에 최소의 수를 합한 최소를 출력하면 될 것 같다고 생각해서 아래와 같이 접근하게 되었습니다.

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const board = input.slice(1).map((el) => el.split(' ').map(Number));
const chicken = [];

// 치킨집 위치 찾기
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // 치킨집이라면
    if (board[i][j] === 2) {
      chicken.push([i, j]);
    }
  }
}

/**
 * 집과 치킨집의 거리를 구하는 함수
 * @param {[number, number]} a : 집의 위치
 * @param {[number, number]} b : 치킨집의 위치
 * @returns {number} : 집과 치킨집의 거리
 */
const getDistance = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

/**
 * 조합을 구하는 함수
 * @param {number} n : 전체 개수
 * @param {number} r : 뽑을 개수
 * @returns {number[][]} : 조합의 결과
 */
const getCombination = (n, r) => {
  const result = [];
  const temp = [];
  const visited = Array(n).fill(false);

  // 조합 구하기
  const combination = (count, start) => {
    if (count === r) {
      result.push([...temp]);
      return;
    }
    for (let i = start; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        temp.push(i);
        combination(count + 1, i + 1);
        temp.pop();
        visited[i] = false;
      }
    }
  };
  combination(0, 0);
  return result;
};

// 치킨집 중에서 m개를 뽑는 조합
const combinations = getCombination(chicken.length, m);

// answer 초기화 (무한대값 넣기)
let answer = Infinity;

// 치킨 거리의 최솟값 구하기
// 조합의 개수만큼 반복
for (let i = 0; i < combinations.length; i++) {
  const combination = combinations[i];
  let sum = 0;
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      // 집이라면, 치킨집과의 거리를 구해서 더하기
      if (board[j][k] === 1) {
        let min = Infinity;

        // 치킨집과의 거리 중에서 최솟값 구하기
        for (let l = 0; l < combination.length; l++) {
          min = Math.min(min, getDistance([j, k], chicken[combination[l]]));
        }
        sum += min;
      }
    }
  }
  answer = Math.min(answer, sum);
}

console.log(answer);
```
