---
title: '[백준 19238번] 스타트 택시 / JavaScript'
date: 2023-10-07
categories:
  - Algorithm
tags:
  - 코딩테스트
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 스타트 택시 백준 19238번

[문제 링크](https://www.acmicpc.net/problem/19238)

![](images/Pasted%20image%2020231007214305.png)

이번 문제는 택시가 승객을 각자의 목적지까지 이동 시켜주고 남은 연료를 출력하는 문제입니다. 대신 승객이 없는 빈 택시를 움직일 때는 연료가 1칸마다 1씩 소모되며, 승객을 태우고 움직일 때는 1칸마다 1씩 증가합니다.

추가적인 조건으로 같은 거리에 있는 승객일 때는  행 번호가 더 작은 승객을 태우고 움직이게 됩니다.

> **예제 입력** 6 3 15 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 6 5 2 2 5 6 5 4 1 6 4 2 3 5

> **예제 출력** 14

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// n :
const [n, m, fuel] = input[0].split(' ').map(Number);
const board = input.slice(1, n + 1).map((el) => el.split(' ').map(Number));
const [taxiX, taxiY] = input[n + 1].split(' ').map((el) => Number(el) - 1);
const passengersList = [];

for (let i = n + 2; i < n + 2 + m; i++) {
  passengersList.push(input[i].split(' ').map(Number));

  board[passengersList[i - n - 2][0] - 1][passengersList[i - n - 2][1] - 1] = 2;
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const findPassenger = (taxiX, taxiY) => {
  const queue = [[taxiX, taxiY, 0]];
  const visited = Array.from(Array(n), () => Array(n).fill(false));
  const passengers = [];

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift();
    if (board[x][y] > 1) {
      passengers.push([x, y, distance]);
      visited[x][y] = true;
    }

    for (let j = 0; j < 4; j++) {
      const nx = x + dx[j];
      const ny = y + dy[j];
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny] && board[nx][ny] !== 1) {
        queue.push([nx, ny, distance + 1]);
        visited[nx][ny] = true;
      }
    }
  }

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

const findDestination = (passengerX, passengerY, destinationX, destinationY) => {
  const queue = [[passengerX, passengerY, 0]];
  const visited = Array.from(Array(n), () => Array(n).fill(false));
  visited[passengerX][passengerY] = true;

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift();
    for (let j = 0; j < 4; j++) {
      const nx = x + dx[j];
      const ny = y + dy[j];
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny] && board[nx][ny] !== 1) {
        if (nx === destinationX && ny === destinationY) {
          return distance + 1;
        }
        queue.push([nx, ny, distance + 1]);
        visited[nx][ny] = true;
      }
    }
  }
  return -1;
};

let answer = 0;
let currentFuel = fuel;
let passengerCount = 0;
let currentX = taxiX;
let currentY = taxiY;

while (passengerCount < m) {
  const passengers = findPassenger(currentX, currentY);
  if (passengers.length === 0) {
    answer = -1;
    break;
  }

  const [passengerX, passengerY, distance] = passengers;
  board[passengerX][passengerY] = 0;

  if (currentFuel - distance < 0) {
    answer = -1;
    break;
  }

  currentFuel -= distance;

  const destination = passengersList.find((passenger, idx) => {
    if (passenger[0] === passengerX + 1 && passenger[1] === passengerY + 1) {
      return passengersList.splice(idx, 1);
    }
  });

  const destinationDistance = findDestination(passengerX, passengerY, destination[2] - 1, destination[3] - 1);

  if (destinationDistance === -1) {
    answer = -1;
    break;
  }

  if (currentFuel - destinationDistance < 0) {
    answer = -1;
    break;
  }

  currentFuel += destinationDistance;
  passengerCount += 1;
  currentX = destination[2] - 1;
  currentY = destination[3] - 1;
}

console.log(answer === -1 ? -1 : currentFuel);
```

기본 자료형에서 처리할 수 있는 수에 한계가 있다는 것을 처음 알게 되었다.

`BigInt`는 임의의 정밀도로 정수를 나타낼 수있는 `JavaScript`의 새로운 숫자 데이터형이라고 한다. `BigInt`를 출력할 때에는 `toString()`으로 출력해야 한다. 그렇지 않다면 끝에 `n`이 붙어서 나오기 때문이다.

![](https://velog.velcdn.com/images/gusdh2/post/9f8ab0bf-80e4-41b4-bbb4-5af3af0aaa4e/image.png)
