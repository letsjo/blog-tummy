---
title: '[백준 19238번] 스타트 택시 / JavaScript'
date: 2023-10-07
categories:
  - memo
tags:
  - 코딩테스트
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 스타트 택시

[문제 링크](https://www.acmicpc.net/problem/19238)

![](images/Pasted%20image%2020231007214305.png)

## 🎯 문제 이해하기

택시가 승객을 각자의 목적지까지 이동 시켜주고 남은 연료를 출력하는 문제입니다. 대신 승객이 없는 빈 택시를 움직일 때는 연료가 1칸마다 1씩 소모되며, 승객을 태우고 움직일 때는 1칸 마다 1씩 증가합니다.

추가 조건1. 같은 거리에 있는 승객일 때는  행 번호가 더 작은 승객을 태우고 움직이게 됩니다.

- **예제 입력**

```
6 3 15
0 0 1 0 0 0
0 0 1 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 1 0
0 0 0 1 0 0
6 5
2 2 5 6
5 4 1 6
4 2 3 5
```

- **예제 출력**

```
14
```

## ✒️ 회고

- **풀이 시간** : 2시간 30분
- **시도 횟수** : 10번 이상

BFS 를 사용해서 풀었지만, 문제를 이해하고 구현하는데 초점이 맞춰진 문제인 거 같습니다.

BFS를 많이 풀어봤지만, 오랜만에 코딩테스트 하면서 코드도 길고 구현하는데 엄청 애먹었던 문제였던 것 같습니다.

특히 **[추가 조건1 : 같은 거리에 있는 승객일 때는 행 번호가 더 작은 승객을 태우고 움직이게 됩니다.]** 을 잘못 해석해서 리스트에 입력된 순서의 행을 뜻하는 줄 알고, 승객마다 번호를 매겨서 번호가 낮은 순을 우선 순으로 잡는 방법으로 풀어서 틀린 횟수도 증가하고, 시간을 많이 잡아 먹었네요.

문제를 좀 더 꼼꼼하게 읽어보는 습관을 들여야 할 것 같습니다.

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// n : board 크기
// m : 승객 수
// fuel : 초기 연료 양
// board : 지도 리스트
// passengersList : 승객 리스트
// taxiX, taxiY : 택시 위치
const [n, m, fuel] = input[0].split(' ').map(Number);
const board = input.slice(1, n + 1).map((el) => el.split(' ').map(Number));
const [taxiX, taxiY] = input[n + 1].split(' ').map((el) => Number(el) - 1);
const passengersList = [];

for (let i = n + 2; i < n + 2 + m; i++) {
  // 승객 위치를 저장
  passengersList.push(input[i].split(' ').map(Number));

  // board 에 승객의 위치를 2로 기록합니다.
  board[passengersList[i - n - 2][0] - 1][passengersList[i - n - 2][1] - 1] = 2;
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

/**
 * taxi 위치로 부터 가까우면서, 조건에 맞는 승객의 위치와 거리를 구한다.
 * @param {number} taxiX - 택시의 X 좌표
 * @param {number} taxiY - 택시의 Y 좌표
 * @return {[number, number, number]} [passengerX, passengerY, distance]
 */
const findPassenger = (taxiX, taxiY) => {
  // 매개변수로 받은 택시 현재 위치와 거리 0을 큐에 넣어줍니다.
  const queue = [[taxiX, taxiY, 0]];
  const visited = Array.from(Array(n), () => Array(n).fill(false));
  const passengers = [];

  while (queue.length > 0) {
    // 큐 값을 꺼냅니다.
    const [x, y, distance] = queue.shift();

    // 만약 승객이 있는 위치라면, passengers 배열에 값을 추가합니다.
    if (board[x][y] > 1) {
      passengers.push([x, y, distance]);
      visited[x][y] = true;
    }

    // 상하좌우 4방향을 체크합니다.
    for (let j = 0; j < 4; j++) {
      const nx = x + dx[j];
      const ny = y + dy[j];
      // 이동이 가능한지, 방문 여부(visited)를 체크합니다.
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny] && board[nx][ny] !== 1) {
        // 이동이 가능하다면, 큐에 좌표값 및 이동거리+1 를 추가합니다.
        queue.push([nx, ny, distance + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  /**
   * passengers 배열에서
   * 만약 거리가 동일하다면,
   * x축이 가장 작은 순이 앞으로 오도록 정렬합니다.
   * x축도 같다면,
   * y축이 가장 작은 순으로 정렬합니다.
   */
  passengers.sort((a, b) => {
    if (a[2] === b[2]) {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    }
    return a[2] - b[2];
  });
  return passengers[0] || [];
};

/**
 * 승객의 출발점에서 목적지로 가는 최소거리를 구한다.
 * @param {number} passengerX - 출발점의 X 좌표
 * @param {number} passengerY - 출발점의 Y 좌표
 * @param {number} destinationX - 목적지의 X 좌표
 * @param {number} destinationY - 목적지의 Y 좌표
 * @return {number} 출발지에서 목적지로 가는 최소 거리
 */
const findDestination = (passengerX, passengerY, destinationX, destinationY) => {
  // 큐에 승객의 출발 위치와 거리 0의 값을 넣어 초기화 시켜줍니다.
  const queue = [[passengerX, passengerY, 0]];
  const visited = Array.from(Array(n), () => Array(n).fill(false));
  visited[passengerX][passengerY] = true;

  while (queue.length > 0) {
    // 큐 값을 꺼냅니다.
    const [x, y, distance] = queue.shift();

    // 상하좌우 4방향을 체크합니다.
    for (let j = 0; j < 4; j++) {
      const nx = x + dx[j];
      const ny = y + dy[j];
      // 이동이 가능한지, 방문 여부(visited)를 체크합니다.
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny] && board[nx][ny] !== 1) {
        // 만약 목적지에 도착했다면, 거리를 출력하고 함수를 종료합니다.
        if (nx === destinationX && ny === destinationY) {
          return distance + 1;
        }
        // 목적지에 도착하지 않았다면, 큐에 현재 좌표를 넣어줍니다.
        queue.push([nx, ny, distance + 1]);
        visited[nx][ny] = true;
      }
    }
  }
  // 만약 이동이 불가능하다면, -1을 반환합니다.
  return -1;
};

// answer: 이동 가능 여부를 저장
// currentFuel : 현재 연료
// passengerCount : 승객을 이동시킨 수
// currentX, currentY : 현재 택시 위치
let answer = 0;
let currentFuel = fuel;
let passengerCount = 0;
let currentX = taxiX;
let currentY = taxiY;

while (passengerCount < m) {
  // 조건에 맞는 승객의 위치 및 거리를 가져옵니다.
  const passengers = findPassenger(currentX, currentY);
  // 만약 조건에 맞는 승객이 없다면, -1을 반환하고 종료합니다.
  if (passengers.length === 0) {
    answer = -1;
    break;
  }

  const [passengerX, passengerY, distance] = passengers;
  // 승객을 태웠기 때문에 board에서 현재 승객 위치를 0으로 지워줍니다.
  board[passengerX][passengerY] = 0;
  // 만약 연료보다 거리가 더 멀다면 불가능하므로 -1을 반환합니다.
  if (currentFuel - distance < 0) {
    answer = -1;
    break;
  }
  // 현재 연료에 승객의 거리만큼 소모시켜줍니다.
  currentFuel -= distance;

  // 승객 리스트에서 목적지 위치를 찾아봅니다.
  const destination = passengersList.find((passenger, idx) => {
    if (passenger[0] === passengerX + 1 && passenger[1] === passengerY + 1) {
      return passengersList.splice(idx, 1);
    }
  });

  // 승객의 출발 위치와 목적지까지 위치의 거리를 계산합니다.
  const destinationDistance = findDestination(passengerX, passengerY, destination[2] - 1, destination[3] - 1);

  // 만약 목적지에 갈 수 없다면, -1을 출력합니다.
  if (destinationDistance === -1) {
    answer = -1;
    break;
  }

  // 목적지에 간 만큼 연료를 증가 시켜줍니다.
  currentFuel += destinationDistance;
  passengerCount += 1;
  // 현재 위치를 목적지 위치로 변경 시켜줍니다.
  currentX = destination[2] - 1;
  currentY = destination[3] - 1;
}

console.log(answer === -1 ? -1 : currentFuel);
```
