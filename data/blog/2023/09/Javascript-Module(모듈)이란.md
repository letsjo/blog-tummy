---
title: Javascript Module(모듈)이란?
date: 2023-09-27
categories:
  - Study
tags:
  - JavaScript
---

## 모듈의 개념, 등장 이유

모듈(module)은 프로그램을 구성하는 구성요소의 일부를 말합니다.

쉽게 말하자면, **큰 애플리케이션을 작게 파일로 분리해서 관리할때 각각의 파일**을 말한다. 보통 클래스 하나 + 특정한 목적을 가지는 복수의 함수로 구성된 라이브러리 하나 정도로 구성합니다.

## JavaScript 모듈의 등장

스크립트의 크기가 점차 커지고 기능이 복잡해지면서, 자바스크립트 커뮤니티는 라이브러리를 만들어서 필요한 모듈을 언제든지 불러올 수 있도록 하거나 모듈로 쉽게 분리 할 수 있는 방법들을 제시되었습니다.

대표적으로 AMD, CommonJS, UMD 와 같은 모듈 시스템이 있습니다.

- AMD : 가장 오래된 모듈 시스템 중 하나. require.js라는 라이브러리를 통해 처음 개발되었습니다.
- CommonJS : Node.js 서버를 위해 만들어졌습니다.
- UMD : AMD와 CommonJS와 같은 모듈 시스템을 함께 사용하기 위해 등장했습니다.

위의 모든 모듈 시스템은 2015의 JS 표준으로 등재가 되었고, 대부분의 브라우저와 Node.js가 모듈 시스템을 지원하게 되었습니다.

## 기본적인 모듈 사용법

간단하게 모듈을 사용해보겠습니다.

아래 그림과 같이 3가지 파일이 한 디렉토리 안에 있습니다.

- index.html
- main.js
- hello.js

![](https://velog.velcdn.com/images/gusdh2/post/37da95c1-6edd-41fc-8c6d-e2d21e033289/image.png)

위 `index.html` 파일을 vsCode의 Live Server로 실행시켜보면,

아래와 같은 예상 가능한 결과를 얻을 수 있습니다.

![](https://velog.velcdn.com/images/gusdh2/post/09fbac97-7a1c-42b8-8399-902d095c8383/image.png)

하지만, 지금은 아주 간단하게 hello만 출력해보는 코드이지만,

코드가 점점 복잡해지고 파일이 많아지게되면, `index.html`에서 js파일을 모두 가져와야하는 번거로움이 발생하게 됩니다.

이를 방지하기 위해서 모듈(module)을 사용할 수 있습니다.

![](https://velog.velcdn.com/images/gusdh2/post/44e6736d-1d34-4b2e-a042-a3bb451a0119/image.png)

![](https://velog.velcdn.com/images/gusdh2/post/4b74f81c-dd86-4647-a75e-9f766c68a7b4/image.png)

위 그림과 같이 코드를 변경해줍니다.

- `index.html` 에서 `main.js` 만 불러옵니다.
- `main.js`에서 `hello1`의 함수를 import 합니다.
- `hello.js`에서 `hello1`의 함수를 export 합니다.

이후 모듈화된 파일이 점점 늘어났을 경우에도,

`main.js`에 필요한 파일들을 모두 import 한 후, `index.html`은 `main.js`만 가져오면 됩니다.

#### 만약 hello100 까지 함수가 생기면, 모두 import 해야하나요?

아닙니다. `main.js`에서 import 해올 때 아래와 같이 `*`, `as` 를 사용하면 한번에 import 해올 수 있습니다.

```js
// main.js
import * as hello from './hello.js'

hello.hello1();
hello.hello2();
...
hello.hello100();
```

#### 그럼 import 해올 때, {} 를 쓰지않고 가져오는 경우도 있던데 뭐가 다른가요?

네, `hello.js`에서 export 할 때, 방식이 다릅니다.

```js
// hello.js

export default function hello1() {
  console.log('hello1!');
}

export function hello2() {
  console.log('hello2!');
}
```

```js
// main.js

import hello, { hello2 } from './hello.js';

hello();
hello2();
```

`default`로 `export` 한 경우에는 `{}`(중괄호) 없이 `import` 해 올 수 있으며, 무조건 `default`로 셋팅된 함수나 클래스만 가져올 수 있으며, 오직 하나만 가능합니다. (단, `default` 셋팅된 값은 위와 같이 `import` 해올 때, 이름 변경이 가능합니다.)

![](https://velog.velcdn.com/images/gusdh2/post/6cebc333-70fb-42bd-b32d-487137ed5b23/image.png)

이 외에도 다양한 import 방법이 있습니다.

```js
import defaultExport from "module-name";
import * as name from "module-name";
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```
