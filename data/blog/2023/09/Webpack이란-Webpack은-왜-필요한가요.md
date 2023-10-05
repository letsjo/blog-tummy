---
title: Webpack이란? Webpack은 왜 필요한가요?
date: 2023-09-22
categories:
  - Study
tags:
  - JavaScript
  - React
---

![](https://velog.velcdn.com/images/gusdh2/post/e42a922d-90dd-41a9-b666-a61ba2ffb717/image.png)

웹사이트를 구성할때 .js .css .images 파일 등 수 많은 들이 모여 웹사이트를 구성하게 된다. 따라서 웹사이트에 접속했을때 굉장히 많은 파일이 다운로드될 수 있는데 이것에 비례하여 서버의 자원을 소모하고 웹사이트가 느리게 로딩이 된다.

또한, 많은 자바스크립트 패키지등을 사용하다보면 각각의 서로 다른 패키지들이 서로 같은 이름이나 함수를 사용하게 되면서 애플리케이션이 깨지게 되는데, 이러한 현상을 해결하기 위해 나온 개념이 묶는다는 개념의 **번들러가 등장**하였다.

## Webpack의 정의

webpack은 모던 JavaScript 애플리케이션을 위한 "정적 모듈 번들러" 이다.

> 💡 모듈 번들러란? 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미한다.

간단하게 Webpack은 여러 파일을 하나 이상의 파일로 합쳐주는 자바스크립트 번들러이다.

## Webpack이 왜 필요할까?

잠시 역사를 짚어보면, 약 2010년경부터 불붙은 자바스크립트 프레임워크 전쟁을 통해 자바스크립트 웹 개발 추세가 치솟는 추세에서 거침없는 모듈의 도입으로 애플리케이션이 눈덩이처럼 커지고, 폭발적으로 변화 성장하는 프론트엔드 생태계의 미지의 바다에 휩쓸려 개발자가 작성하는 언어와 방법 종류도 브라우저들이 이해하기 벅찰 속도로 증가되었다. 이러한 상황 대처를 위하여 생겨난 것 중의 하나가 “번들러”이다. 모던 웹 개발자의 계속 길어지는 체크리스트에 하나 더 증가된 아이템인 이 번들러는, 효율적 배포와 관련하여 개발자 자신이 선호하건 안하건 프로젝트 종류에 따라 그리고 프로젝트 사이즈가 크면 클수록 사용이 필수라고 해도 과언이 아닌 것이 사실이다.

#### 성능 최적화 & 자동화

코드 축소와 더불어 사용하지 않는 코드를 제거하는 tree shaking과 같은 최적화를 수행 함으로써 HTTP 요청 수를 감소하여 웹사이트 성능을 궁극적으로 향상시키고, 로딩 속도를 빠르게 향상 시켜준다.

#### 파일 단위의 자바스크립트 모듈 관리

HTML, CSS, JS, Images, Font 등 모든 파일 하나 하나 나눠서 모듈화하여, 웹 애플리케이션을 구성할 수 있게 해준다.

#### 번들러가 제공하는 편의성

CSS가 아닌 Sass나 Stylus 등을 사용할 경우, 또는 TypeScript 사용 시 번들러가 컴파일 과정에서 필요한 플러그인을 추가하고 번들러를 실행해준다.

#### Dependency Issue(종속성 문제) 해결

서버와 브라우저 모두에서 최대한 원활하게 작동할 수 있는 코드의 상당부분을 빌드 시 모든 종속성과 함께 번들하는데 도움을 준다.

## Webpack의 핵심 요소

### Entry

엔트리 속성은 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이다. 즉, entry로 묶고자하는 파일의 첫번째 진입점을 설정해주면 된다.

```js
// webpack.config.js

// Single Page Application(SPA)
module.exports = {
  entry: './src/index.js',
};

// Multi Page Application (MPA)
module.exports = {
  entry: {
    login: './src/LoginView.js',
    main: './src/MainView.js',
  },
};
```

이때, 최초 진입점이 되는 대상 파일은 웹 애플리케이션의 전반적인 구조와 내용이 담겨있어여 한다.

그래야 웹팩이 해당 파일을 토대로 애플리케이션의 모듈들의 연관관계에 대해 이해하고 분석하고 합치기 때문이다.

이제껏 진행했던 과제를 생각해보면 컴포넌트를 선언하는 쪽과 사용하는 쪽을 분리하기 위해 main과 App으로 분기했었다. 현재 과제에서 웹팩을 적용할 이유는 없다고 생가하지만 만약 적용한다면 엔트리 속성에는 main.js가 진입점으로 들어가야 하지 않을까 생각한다.

위와 같이, 엔트리를 설정하고 웹팩을 실행하면 아래와 같이 파일이 빌드가 되는데

이처럼 모듈간의 의존관계가 생기는 구조를 **디펜던시 그래프**라 부른다. ![](https://velog.velcdn.com/images/gusdh2/post/e2d18d3e-7c9d-48ab-b91f-9b351d2e1ba0/image.png)

### Output

웹팩을 실행하여 빌드하고 난 후 결과물의 파일 경로를 의미한다.

**filename**은 **웹팩으로 빌드한 파일의 이름**을 의미하며, **path**는 **해당 파일의 경로**를 의미한다.

path 속성에서 사용된 메서드는 인자로 받은 경로를 조합하여, 유효한 파일 경로를 만드는 Nods.jsAPI라고 한다.

```js
// webpack.config.js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
};

/* Node.js API가 하는 역할은 아래 코드와 동일하다. */
output: './dist/bundle.js';
```

### Loader

웹팩이 애플리케이션을 해석할때 자바스크립트 파일이 아닌 HTML, CSS, Images, font 등을 변환할 수 있게 도와주는 속성이다.

웹팩은 모든 파일을 모듈로 취급하여 관리하는데 사실상 자바스크립트 파일만 알고 있어 로더를 이용해 다른 파일들을 웹팩이 이해하게끔 변경해줘야 한다.

**사실상 로더로 설정을 지정해주지 않으면 웹팩이 해당 파일을 읽을 수 없기 때문에 에러가 발생한다.**

```js
// app.js
import './common.css';

console.log('css loaded');
```

```js
/* common.css */
p {
  color: blue;
}
```

```js
// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
  },
};
```

위 파일을 webpack으로 빌드하게 되면 Error가 발생합니다.

![](https://velog.velcdn.com/images/gusdh2/post/d5fbd70d-dacc-42d7-8ffe-227990cdc95a/image.png) `app.js` 파일에서 import 한 `common.css` 파일을 해석하기 위해 적절한 loader가 필요하다는 Error 메세지 입니다.

보통 사용되는 로더 종류는 아래와 같다.

- CSS Loader
- Babel Loader
- Sass Loader
- File Loader
- Vue Loader
- TS Loader

아래와 같이 rules라는 객체로 속성을 지정하며, test => 로더를 적용할 파일 유형 (일반적으로 정규 표현식) use => 해당 파일에 적용할 로더의 이름

아래 코드는 해당 프로젝트의 모든 CSS 파일과 TS파일에 대해서 로더를 적용하겠다는 의미로 해석할 수 있다.

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
      // ...
    ],
  },
};
```

### Plugin

웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성이다.

로더랑 역할을 비교해보자면, 로더는 파일을 해석하고 변환하는 과정에 관여하며,

플러그인은 **해당 결과물의 형태를 바꾸는 역할**을 한다고 볼 수 있다.

```js
// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
};
```

- HtmlWebpackPlugin : 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
- ProgressPlugin : 웹팩의 빌드 진행율을 표시해주는 플러그인

> **Reference** https://webpack.kr/concepts/ https://webclub.tistory.com/635 https://devowen.com/288 https://www.youtube.com/watch?v=cp_MeXO2fLg&t=108s
