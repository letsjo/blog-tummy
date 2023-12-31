---
title: '[항해 2주차] 회고록 (feat. 자바스크립트 ES)'
date: 2022-07-03
categories:
  - Weekly Learn
tags:
  - 항해99
---

![](https://velog.velcdn.com/images/gusdh2/post/500e99a3-961e-4cd2-bbc0-6170c8dab829/image.png)

### 프로그래머스 1단계 문제 완료!

2주차에 만난 조원분들과 알고리즘 문제 사이트인 프로그래머스 1단계를 완주했다. 알고리즘에 대해서 많이 배우고, 자바스크립트 문법이나 함수에 대해서 많이 알게되었고, 성장을 엄청 많이 했다.

화살표 함수나 이런 것들이 처음에 많이 생소했었던게 사실 이였는데 알고리즘 문제를 풀면서 많이 활용할 수 있었다. 그러면서 자바스크립트 라는 언어에 많이 관심이 생겨서 공부를 하게 되었다.

현재 쓰고 있는 자바스크립트가 ES6 라고 하는데 ES가 뭔지 궁금했다.

## 자바스크립트 (JavaScript) ES란?

Javascript는 원래 넷스케이프에서 시작된 언어인데, 프로그래밍 언어들의 근간이라고 볼 수 있는 C언어보다 훨씬 나중에 개발된 언어이다. 자세한 역사는 해당 링크를 통해 가보면 될 것이다. -> 'Javacript란?'

결과부터 말하면 ES라는 것은 'Javascript의 표준 규격'을 의미하는데, 이것이 탄생한 배경에는 '브라우저 전쟁'이라고 하는 웹 브라우저 시장에서의 점유율 싸움이 있었다. 넷스케이프 사에서 개발한 Javascript가 선풍적인 인기를 끌기 시작하자 마이크로소프트 사에서도 IE 3(우리가 알고있는 인터넷 익스플로러)에 JScript라는 이름으로 자바스크립트를 탑재했지만, 실제적으로는 둘의 내용이 매우 달라서 같은 기능을 구현하더라도 개발자들이 해야할 일과 시간이 훨씬 늘어나게 되었다.

실제로 서로 사용자를 끌어들이기 위해 이것저것 기능을 추가하다 보니 Javascript와 JScript는 점점 다 달라지는 경향을 보였고, 이에 보다못한 European Computer Manufacturers Association (ECMA, 현 ECMA International)에서 Javascript에 대한 표준을 정하게 되었다.

또, ECMA에서는 Javascript의 표준만 정하는게 아닌 다른 표준안도 정하기 때문에 그것들과 구분하기 위해 숫자를 붙였고 이것이 262가 되었다. 즉, ECMA 262는 자바스크립트의 표준 규격이라고 생각하면 된다. 현재 우리가 ES라고 부르는 것은 ECMA Script의 약자이며, ES5는 ECMA Script 5의 규격을 따른다고 생각하면 된다.

## 그럼 ES5? ES6? 뒤에 붙은 숫자는 뭘까?

모든 언어들도 발전하고 개선이되는 것 처럼 자바스크립트도 취약점이나 보완점이 많은 언어이다보니, 계속해서 업그레이드되고 있는 중이라 보시면 될 것 같다.

![](https://velog.velcdn.com/images/gusdh2/post/f672c800-91a5-4b00-b709-65a4bbb22f43/image.png)

### - ES5 문법

1. 배열과 관련해서 새로운 메소드들이 생겼는데 대표적으로 forEach, map, filter, reduce, some, every와 같은 메소드가 생김. 이 메소드들은 개발자가 반복 횟수나 조건을 잘못 입력하는 등의 실수를 줄여주는 효과 있음.

2. object에 대한 getter/setter 지원
3. 자바스크립트 strict 모드 지원(더욱 세심하게 문법 검사)
4. JSON 지원(과거에는 XML을 사용하다가, json이 뜨면서 지원)
5. bind() 메소드가 생겼습니다. (this를 강제로 bind 시켜주는 메소드)

### - ES6 문법

1. let, const 키워드 추가

2. arrow 문법 지원

3. iterator / generator 추가

4. module import / export 추가

5. Promise 도입 ( Callback Hell을 해결해 줄 기법이 추가 되었습니다.)

6. Default, Rest 파라미터

7. 해체 할당, Spread 연산자

8. 템플릿 리터럴

9. 호이스팅이 사라진 것 같은 효과

10. 함수 단위 스코프에서 블록 단위 스코프로 변경

11. 화살표 함수를 사용

## 정리

ES5 와 ES6 의 차이점이 호이스팅과 var의 취약점을 보안하여, let과 const가 나왔다 정도까지만 알고 있었는데, 이렇게 보니 화살표함수 등 여러가지가 많이 보안되었구나 라는 것을 알 수 있게 되었다.

다음 주부터는 주 특기를 배우는 주인데 많이 배워서 더 성장할 수 있도록 해야겠다.

이번 조에서 조장을 맡게 됬는데, 조장 역할을 잘 할 수 있을지 많이 염려되지만, 저번 주 조장님이 너무 잘해주셔서 참고해서 조원들을 잘 이끌 수 있도록 해야겠다. 여기서 만난 사람들이 개발자라는 울타리 안에 있으면, 오래 연락한다는데, 많이 친해질 수 있도록 노력해야겠다!

### 1주차 조원 - 웹개발 미니 프로젝트

조장 - 이은형조원 - 조현오조원 - 이슬기조원 - 윤효근

### 2주자 조원 - 알고리즘

조장 - 유대훈조원 - 조현오조원 - 송하준조원 - 정종성

### 3주차 조원 - 주특기 입문

조장 - 조현오조원 - 박정원조원 - 인소현조원 - 정성욱
