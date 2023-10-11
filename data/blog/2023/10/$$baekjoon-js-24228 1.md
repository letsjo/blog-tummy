---
title: '[백준 24228번] 젓가락 / JavaScript'
date: 2023-10-11
categories:
  - memo
tags:
  - 코딩테스트
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 젓가락

[문제 링크](https://www.acmicpc.net/problem/24228)

![](images/Pasted%20image%2020231011152146.png)

## 🎯 문제 이해하기

젓가락 종류 $N$ 과 짝을 맞춰야 하는 갯수 $R$ 이 주어지고, 최악의 경우의 수를 구하면 되는 간단한 문제입니다.

- **예제 입력**

```
2 1
```

- **예제 출력**

```
3
```

## ✒️ 회고

- **풀이 시간** : 45분
- **시도 횟수** : 10번 이상

이번 문제는 점화식을 통해서 접근했습니다. 여러 개 경우의 수를 종이에 적어보고 방정식을 찾아 간단하게 해결한 케이스.... 였으면 좋겠습니다만...

![](images/Pasted%20image%2020231011150118.png)

코드는 간단하지만, 점화식을 유추하느라, 어느 정도 20분 정도 소요되었습니다. 하지만 유추가 끝난 후 코드를 제출했지만, 자꾸만 $틀렸습니다$ 가 출력 되었습니다.

계속된 디버깅으로 확인해본 결과, 입력 값이 JavaScript에서 표현할 수 있는 정수를 넘어선 범위였기 때문이었습니다.

> 입력 값 : 두 개의 정수 $N, R$ 이 주어진다. $(1 ≤ N,R ≤ 10^{18})$

그래서 [BigInt()](https://blog-tummy.vercel.app/blog/2023/10/javascript-자바스크립트의-숫자-범위-Number-vs-BigInt) 를 사용해서 풀었습니다.

---

# 💡 나의 풀이

```js
let [N, K] = input[0].split(' ').map((v) => +v);
let answer = 0;

while (true) {
  let count = 0;
  let temp = N;
  while (temp > 0) {
    if (temp % 2 === 1) {
      count += 1;
    }
    temp = Math.floor(temp / 2);
  }

  if (count <= K) {
    break;
  }
  N += 1;
  answer += 1;
}

console.log(answer);
```
