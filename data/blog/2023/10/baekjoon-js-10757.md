---
title: '[백준 10757번] 큰 수 A+B / JavaScript'
date: 2023-10-05
categories:
  - Algorithm
tags:
  - basic
---

![](https://velog.velcdn.com/images/gusdh2/post/7e3117af-14b0-45b0-ba4e-037601c9a055/image.png)

# 📝 문제: 큰 수 A+B

두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

#### 입력

첫째 줄에 A와 B가 주어진다. (0 < A,B < 1010000)

#### 출력

첫째 줄에 A+B를 출력한다.

> #### 예제 입력
>
> 9223372036854775807 9223372036854775808

#### 예제 출력

18446744073709551615

---

# 💡 나의 풀이

```js
let input = require('fs').readFileSync(0, { encoding: 'utf-8' }).split('\n')[0].split(' ');

console.log((BigInt(input[0]) + BigInt(input[1])).toString());
```

기본 자료형에서 처리할 수 있는 수에 한계가 있다는 것을 처음 알게 되었다.

`BigInt`는 임의의 정밀도로 정수를 나타낼 수있는 `JavaScript`의 새로운 숫자 데이터형이라고 한다. `BigInt`를 출력할 때에는 `toString()`으로 출력해야 한다. 그렇지 않다면 끝에 `n`이 붙어서 나오기 때문이다.

![](https://velog.velcdn.com/images/gusdh2/post/9f8ab0bf-80e4-41b4-bbb4-5af3af0aaa4e/image.png)
