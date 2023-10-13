---
title: '[자료구조] 자바스크립트로 Deque 구현하기'
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

> 자바스크립트에 전단 삭제(`shift()`) 가 있지만, 자바스크립트의 배열은 스택의 자료구조를 가지고 있기 때문에 `shift()`의 메소드는 $O(N)$의 시간복잡도를 가진다. (아래 로직 분석 참고)

- **`shift()` 로직 분석** [출처-ECMA2024](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.shift) ![](images/Pasted%20image%2020231013194857.png)

### 덱 (Deque)

- Deque 는 앞, 뒤 양쪽 방향에서 엘리먼트(element)를 추가하거나 제거할 수 있다.
- Deque 는 양 끝 엘리먼트의 삽입(`append`)와 삭제(`pop`)이 시간복잡도 $O(1)$으로 압도적으로 빠르다.

#### 덱 알아보기

자바스크립트에는 덱(Deque)뿐만 아니라, 큐(Queue)와 같은 자료구조가 없기 때문에 직접 구현해야 한다.

우선 파이썬에서는 어떻게 사용되나 찾아보자.

```python
from collections import deque

deq = deque()

# 10을 앞쪽에 추가하고 deque의 엘리먼트 수를 반환한다.
deq.appendleft(10) # 1

# 0을 뒷쪽에 추가하고 deque의 엘리먼트 수를 반환한다.
deq.append(0) # 2

# 앞쪽 엘리먼트를 삭제하고, 삭제된 엘리먼트의 값을 반환한다.
deq.popleft() # 10

# 뒷쪽 엘리먼트를 삭제하고, 삭제된 엘리먼트의 값을 반환한다.
deq.pop() # 0
```

#### 자바스크립트로 구현해보기

우선 위에 설명드렸던 대로 `shift()` 메소드로 구현하게 되면 시간복잡도가 $O(N)$이 된다. 그렇기 때문에 $O(1)$으로 구현하기 위해서는 Class를 이용해서 연결 리스트를 사용해야 한다.

##### Node 만들기

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
```

- `data` : 해당 Node의 값을 저장한다.
- `next` : 해당 Node의 다음에 연결되는 Node 메모리 주소 값이 저장된다.
- `prev`: 해당 Node의 이전에 연결되는 Node 메모리 주소 값이 저장된다.

##### Deque 자료구조 만들기

```js
class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.back = null;
  }
}
```

- `init()` : deque 자료 구조를 초기화 시켜주는 메서드
- `count` : deque가 가지고 있는 엘리먼트의 수를 저장
- `front` : deque의 가장 앞단의 엘리먼트 주소 값이 저장
- `back` : deque의 가장 뒷단의 엘리먼트 주소 값이 저장

즉, deque 의 자료구조는 가장 앞/뒷단에서만 추가/삭제가 이뤄지기 때문에 해당 부분의 주소값만 가지고 있으면 된다.

##### 엘리먼트 추가 ( 앞단 추가 - `appendleft()`/ 뒷단 추가 - `append()`)

```js
class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.back = null;
  }

  appendleft(value) {
    const node = new Node(value);

    if (this.count === 0) {
      this.front = node;
      this.back = node;
    } else {
      const tmpNode = this.front;
      tmpNode.prev = node;

      this.front = node;
      node.next = tmpNode;
    }

    this.count += 1;
    return this.count;
  }

  append(value) {
    const node = new Node(value);
    if (this.count === 0) {
      this.front = node;
      this.back = node;
    } else {
      const tmpNode = this.back;
      tmpNode.next = node;
      this.back = node;
      node.prev = tmpNode;
    }

    this.count += 1;
    return this.count;
  }
}
```

##### 엘리먼트 삭제 ( 앞단 `append()`/ 뒷단 `appendleft()`)

```js
class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.back = null;
  }

  popleft() {
    if (this.count === 0) return null;

    const data = this.front.data;

    if (this.count === 1) {
      this.init();
    } else {
      this.front = this.front.next;
      this.front.prev = null;
      this.count -= 1;
    }

    return data;
  }

  pop() {
    if (this.count === 0) return null;
    const data = this.back.data;

    if (this.count === 1) {
      this.init();
    } else {
      this.back = this.back.prev;
      this.back.next = null;
      this.count -= 1;
    }

    return data;
  }
}
```

### 전체 코드

이로 Deque 의 자료구조로 삽입 및 삭제를 할 때 시간 복잡도 `O(1)`로 데이터를 앞 뒤로 넣고 뺄 수 있는 Deque 의 구조를 구현하였습니다.

```js
class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.back = null;
  }

  appendleft(value) {
    const node = new Node(value);

    if (this.count === 0) {
      this.front = node;
      this.back = node;
    } else {
      const tmpNode = this.front;
      tmpNode.prev = node;

      this.front = node;
      node.next = tmpNode;
    }

    this.count += 1;
    return this.count;
  }

  append(value) {
    const node = new Node(value);
    if (this.count === 0) {
      this.front = node;
      this.back = node;
    } else {
      const tmpNode = this.back;
      tmpNode.next = node;
      this.back = node;
      node.prev = tmpNode;
    }

    this.count += 1;
    return this.count;
  }

  popleft() {
    if (this.count === 0) return null;

    const data = this.front.data;

    if (this.count === 1) {
      this.init();
    } else {
      this.front = this.front.next;
      this.front.prev = null;
      this.count -= 1;
    }

    return data;
  }

  pop() {
    if (this.count === 0) return null;
    const data = this.back.data;

    if (this.count === 1) {
      this.init();
    } else {
      this.back = this.back.prev;
      this.back.next = null;
      this.count -= 1;
    }

    return data;
  }
}
```
