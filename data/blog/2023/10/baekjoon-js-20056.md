---
title: '[백준 20056번] 마법사 상어와 파이어볼 / JavaScript'
date: 2023-10-09
categories:
  - memo
tags:
  - 코딩테스트
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 마법사 상어와 파이어볼

[문제 링크](https://www.acmicpc.net/problem/20056)

![](images/Pasted%20image%2020231010023645.png)

## 🎯 문제 이해하기

마법사 상어가 NxN 격자에서 파이어볼 M개를 발사했다. 처음에는 파이어볼이 가만히 있다가 마법사 상어가 이동 명령을 하면 파이어볼이 약속된 방향과 속도로 움직인다.

파이어볼 정도 : [ R, C, M, S, D ]

- R : 행
- C : 열
- M : 질량
- S : 속력
- D : 방향 ( 방향은 대각선 포함 8 방향으로 위 그림 참고 )

2개 이상의 파이어볼이 있을 경우,

- 합쳐진 후 4개의 파이어볼로 나눠진다.
- 각 파이어볼의 속력(S)은 `(합쳐진 파이어볼 속력 합) / (합쳐진 파이어볼 수)` 이다.
- 각 파이어볼의 질량(M)은 `(합쳐진 파이어볼 속력 합) / 5` 이다.
- 각 파이어볼의 방향(D)은 합쳐진 파이어볼의 `모두 같으면, [ 0, 2, 4, 6 ] 방향`으로 나눠지고, `그렇지 않으면, [ 1, 3, 5, 7 ] 방향`으로 나눠진다.
- 질량(M)이 0 이 되면, 소멸된다.

- **예제 입력**

```
7 5 3
1 3 5 2 4
2 3 5 2 6
5 2 9 1 7
6 2 1 3 5
4 4 2 4 2
```

- **예제 출력**

```
9
```

## ✒️ 회고

- **풀이 시간** : 4시간 10분
- **시도 횟수** : 40번 이상

문제 자체는 1시간 30분 ~ 2시간 정도 안에 다 풀었는데, IDE 에서는 문제가 발생하지 않았지만, 백준에서는 자꾸만 런타임 TypeError 가 발생했다.

도대체 어디가 오류가 났는지 알 수 가 없어서 input 값 받아오는 방법부터 하나씩 코드를 고쳐보면서 재 시도 해보다가, 코드를 한 줄씩 주석 걸어가면서 어느 라인에서 TypeError가 발생하는지 한 번씩 계속 시도를 해보았다.

```js
const nr = (r + s * dr[d] + n) % n;
const nc = (c + s * dc[d] + n) % n;
```

위 코드를 주석을 걸어보니, TypeError가 발생하지 않았고, '틀렸습니다.' 로 출력되었다.

하지만 왜 에러가 나는지 도통 알 수 가 없었다.

일단 에러를 막았으니 시간 초과 없이 로직이 잘 돌아가는지 체크해봤었는데, 역시나 파이어볼이 나눠지는 과정에서의 로직이 불필요하게 반복문이 있는 경우가 있었다.

그래서 배열로 관리하던 파이어볼 충돌 데이터를 `new Map()` 을 활용해서 `key`, `value`로 변경해서 아래와 같이 구현하였습니다.

그랬더니, 드디어 성공...

![](images/Pasted%20image%2020231010030351.png)

하지만 아직까지 풀지 못한 왜 에러가 발생하였는가... 인데, 이유를 계속 찾아봐야 할 것 같다.

그나저나, 이 문제를 node.js 로 푼 사람이 47명 밖에 되지 않넴..?

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);

let fireballs = [];

const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];

for (let i = 1; i <= M; i++) {
  const [r, c, m, s, d] = input[i].split(' ').map(Number);
  fireballs.push([r - 1, c - 1, m, s, d]);
}

const move = (fireballsData) => {
  const collisionData = new Map();

  for (let i = 0; i < fireballsData.length; i++) {
    const [r, c, m, s, d] = fireballsData[i];

    let nr = (r + dr[d] * s) % N;
    let nc = (c + dc[d] * s) % N;

    if (nr < 0) nr += N;
    if (nc < 0) nc += N;
    const nData = [m, s, d];
    if (!collisionData.get(`${nr},${nc}`)) collisionData.set(`${nr},${nc}`, [nData]);
    else {
      const prev = collisionData.get(`${nr},${nc}`);
      collisionData.set(`${nr},${nc}`, [...prev, nData]);
    }
  }
  return collisionData;
};

const divide = (collisionData) => {
  const fireballsWithDivide = [];

  collisionData.forEach((collisions, position) => {
    const [r, c] = position.split(',').map(Number);
    if (collisions.length >= 2) {
      let even = 0;
      let mass = 0;
      let speed = 0;
      collisions.forEach((collision) => {
        const [m, s, d] = collision;
        if (d % 2 === 0) even++;
        mass += m;
        speed += s;
      });
      mass = Math.floor(mass / 5);
      if (mass !== 0) {
        speed = Math.floor(speed / collisions.length);
        if (even === 0 || even === collisions.length)
          for (let i = 0; i <= 6; i += 2) fireballsWithDivide.push([r, c, mass, speed, i]);
        else for (let i = 1; i <= 7; i += 2) fireballsWithDivide.push([r, c, mass, speed, i]);
      }
    } else {
      fireballsWithDivide.push([...[r, c], ...collisions[0]]);
    }
  });
  return fireballsWithDivide;
};

for (let i = 0; i < K; i++) {
  const collisions = move(fireballs);
  const fireballsWithDivide = divide(collisions);
  fireballs = fireballsWithDivide;
}

const answer = fireballs.reduce((acc, cur) => acc + cur[2], 0);

console.log(answer);
```
