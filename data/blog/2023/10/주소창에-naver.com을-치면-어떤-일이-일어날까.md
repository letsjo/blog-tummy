---
title: "주소창에 'naver.com'을 치면 어떤 일이 일어날까?"
date: '2023-10-03'
categories:
  - 'Study'
tags:
  - 'Network'
  - 'Web'
---

인터넷을 하다보면, 주소창에 'naver.com'을 직접 입력하여, 접속하는 경우가 굉장히 흔한 경우이다. 이럴 경우, 네이버페이지가 바로 뜨는 것으로 보이지만, 네이버페이지를 띄우기위해 많은 과정들을 거치게 된다.

주소창에 주소를 입력했을 때, 어떤 일이 발생하는 지 알아보자.

## 주소창에 naver.com을 치면 일어나는 일

![](https://velog.velcdn.com/images/gusdh2/post/09db3e7a-ab2d-410d-b821-8157034ba0be/image.png)

위 그림을 따라 순서대로 알아보겠다.

### 1.사용자 입력

먼저, 우리가 주소창에 naver.com 혹은 원하는 검색어를 입력하게 된다.

해당 키워드가 url의 형식을 띄고있다면 해당 주소의 페이지를 요청하러 갈 것이고, 만약 url이 아닌 키워드를 입력했다면 각 브라우저(크롬, 익스플로어, 파이어폭스 등)의 기본 검색엔진을 통해 해당 키워드를 검색 할 것이다.

### 2. 웹 페이지 URL

우리는 www.naver.com을 쳤을 것이다. 따라서 위와 같은 url 형식을 띄고있기 때문에 브라우저는 웹페이지 URL이라 인식하여 이 도메인 네임에 대한 ip주소를 요청하러 가게된다. 이때 우리가 protocol 부분을 따로 입력하면 https나 http로 요청하겠지만, naver.com처럼 프로토콜 부분을 생략하고 바로 도메인부분을 입력하게 되면 기본적으로는 http로 요청한다.

> http와 https의 차이는 가볍게 설명하면, 기존의 보안에 취약한 http를 보완하기 위해 ssl인증서를 추가한 것이다. 즉, 익명의 공격자가 중간에 데이터를 가로채는것을 방지할 수 있다.

### 3. 도메인 네임

DNS(Domain Name System) Server로 도메인 네임(naver.com)을 보내면 이걸 ip주소(125.209.222.141)로 바꿔준다. 이러한 시스템을 DNS라고 부르게 된다.

DNS server는 이런 도메인들의 IP주소를 가지고 있는 데이터 서버다. 이제 우리는 DNS server에 naver.com을 가지고 IP주소를 물어 보게 되는 것이다.

![](https://velog.velcdn.com/images/gusdh2/post/b29d872d-bdf2-4264-96bf-2bcbb7b76646/image.png)

위의 그림처럼 우리는 DNS 서버에 도메인 네임을 전달하게 된다. 그러면 우리는 KT나 SKT같은 통신사의 DNS서버에 먼저 도착해서 물어보게된다. 당연히 naver는 한국에서 제일 많이 들어가는 사이트 중 하나니깐 KT DNS에 없을리 없겠지만, 만약 없다고 생각해보자.

그러면 통신사 DNS서버는 이제 루트 DNS 서버로 물어보러 갈 것 이다. 루트 서버에서는 naver.com에서 .com 을 분류해줘서 com DNS 서버로 연결해준다. 왜냐고? 최상위 DNS는 kr jp 같은 국가 코드나 net com 같은 일반 도메인 코드로 나뉘기 때문에 얘네는 그것만 구별해서 다음 하위의 DNS 서버로 연결해주는 것이다.

> 아래와 같이 도메인이 3단계로 나눠져 있다. ![](https://velog.velcdn.com/images/gusdh2/post/b6f71cc0-d248-4300-9e23-cd99dcc249ef/image.png)

다음으로는 루트 DNS가 연결해준 COM DNS서버로 와서 naver.com을 어디가서 찾아야 하는지 묻는다. 그러면 얘네는 가비아 DNS 서버에서 해당 도메인을 갖고있다고 알려주면서 가비아 DNS 서버를 연결 해 줄 것이다. (가비아 DNS를 찾아보니 국내 도메인 호스팅을 담당하는 곳이였다.) 이제 우리는 가비아 DNS 서버에 도착했다. 물어보니깐 naver.com에 대한 정보가 있었고 그림에서는 12.123.123.123 이라고 써져 있지만 아무튼 우리는 해당 도메인 네임에 대한 IP주소를 얻었다.

### 4. IP주소

그래서 DNS Server로 부터 IP주소(125.209.222.141)를 얻게 되었다.

### 5. HTTP 요청 메세지

이제는 얻은 IP주소로 해당 페이지를 요청을 보내야 한다. 이 때 HTTP요청(request)를 보내야 하는데 아래와 같은 형식으로 보내게 될 것 이다.

> ![](https://velog.velcdn.com/images/gusdh2/post/a2430a29-c9e2-43eb-bcbd-b8f4bae06c3d/image.png)

### 6. HTTP 요청메세지 전달

우리의 HTTP 요청 메시지가 tcp 통신을 통해서 125.209.222.141의 네이버 서버에 요청을 하게된다.

### 7. 웹 페이지 URL

네이버에 서버는 우리의 컴퓨터로 부터 다음과 같은 HTTP 요청 메시지를 받게된다.

> 실제론 이런식의 요청 메시지가 날라가게 된다. 아래 그림은 www.test101.com에 요청하는 메시지다. ![](https://velog.velcdn.com/images/gusdh2/post/d0e05035-1808-40e9-b299-9f1b58b904ed/image.png)

GET 요청을 했고 Path(경로)는 /doc/test.html 문서, http 1.1형식, 아래 Host부터는 reqeust 헤더인데 헤더는 언어, 인코딩 스타일, 요청하는 컴퓨터의 브라우저 버전 그리고 요청하는 문자의 길이 등을 담고 있다.

### 8. 웹 페이지 데이터 전송

이제 위의 요청에 대해 네이버 서버도 응답 페이지를 보내준다. ![](https://velog.velcdn.com/images/gusdh2/post/bfb79121-fedd-4403-b3c1-fd158e5ee661/image.png) 그리고 우리가 HTTP 요청 메시지로 요청했듯이, 서버도 응답 페이지와 함께 HTTP 응답 메시지로 보내주게 된다.

### 9/10. HTTP 응답 메세지

![](https://velog.velcdn.com/images/gusdh2/post/f644ddfa-2b50-4540-8bb4-352cf969d1e0/image.png) 이렇게 http 응답 메시지도 요청메시지와 비슷한 스타일로 돌아오게 된다. 먼저 첫줄은 response code를 보내주는데, 200은 성공적으로 요청이 응답되었다는 뜻이다. 우리는 GET요청을 보냈으니 추가로 메시지 바디에 우리가 요청한 html 문서가 들어있다는 뜻을 내포하고 있다.

### 11. 웹페이지 데이터

![](https://velog.velcdn.com/images/gusdh2/post/f8b24792-870d-4517-a1a6-9c3fc23873fd/image.png) 그 후 받아온 응답페이지 html문서를 받아서 브라우저에 넣어준다.

### 12. 사용자 출력

![](https://velog.velcdn.com/images/gusdh2/post/a777e79c-37f1-480b-9683-a1030ebfb967/image.png)

이제 브라우저가 반환받은 html데이터를 파싱하고 처리하게 된다. html을 파싱해서 DOM 트리를 구축하고 다른 한편으로는 CSS파일 링크를 찾아 CSS파일을 받아오고 CSS 오브젝트 모델을 만들고, 이 둘을 사용해서 렌더 트리를 만든다. 렌더트리를 이용해서 각각의 노드들의 위치를 지정하는 레이아웃 과정을 거치고 최종적으로 아래와 같은 화면을 paint하게 된다.

![](https://velog.velcdn.com/images/gusdh2/post/364192ca-defe-42e7-a71c-aef2f7bc95f3/image.png)
