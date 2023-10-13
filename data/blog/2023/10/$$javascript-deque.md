---
title: '[자료구조] javascript 로 Deque 구현하기'
date: 2023-10-13
categories:
  - memo
tags:
  - JavaScript
---

![](images/Pasted%20image%2020231013192536.png)

# 자바스크립트로 Deque 구현하기

## 🤔 Deque 란 뭔가요?

![](images/Pasted%20image%2020231013192942.png)

우선 Deque를 설명하기 전에, Stack 과 Queue의 자료구조를 먼저 설명하는 게 좋을 것 같다.

위 그림과 함께 아래 설명을 함께 보는 것이 좋을 것 같다.

### 스택 (Stack)

- Stack 은 FILO(First In Last Out)로 먼저 들어간 값이 가장 나중에 빠지는 자료구조 형태를 가지고 있다.
- 그래서 **엘리먼트(element)의 삽입(push)과 삭제(pop)이 자료구조의 한쪽 끝에서만 이루어지게 된다.**
- 자바스크립트에서 배열은 스택의 자료구조를 지니고 있다.

### 큐 (Queue)

- Queue 는 FIFO(First In First Out) 형태로 먼저 들어온 값이 먼저 빠지는 자료구조 형태를 가지고 있다.
- 그래서 \*\*엘리먼트(element)의 삽입은 후단, 삭제는 전단에서 각각 이루어지게 된다.

> 자바스크립트에 전단 삭제(`shift()`) 가 있지만, 자바스크립트의 배열은 스택의 자료구조를 가지고 있기 때문에 `shift()`의 메소드는 $O(N)$의 시간복잡도를 가진다.

### 덱 (Deque)

- Deque 는 앞, 뒤 양쪽 방향에서 엘리먼트(element)를 추가하거나 제거할 수 있다.

Deque 는 양 끝 엘리먼트의 append와 pop이 압도적으로 빠르다.

컨테이너(container)의 양끝 엘리먼트(element)에 접근하여 삽입 또는 제거를 할 경우, 일반적인 리스트(list)가 이러한 연산에 O(n)이 소요되는 데 반해, 데크(deque)는 O(1)로 접근 가능하다.
