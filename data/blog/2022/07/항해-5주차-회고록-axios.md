---
title: '[항해 5주차] 회고록 WIL (axios)'
date: 2022-07-24
categories:
  - Weekly Learn
tags:
  - 항해99
---

시간이 벌써 5주나 흘러간거에 깜짝 놀랐다. 지금까지 옆에 있는 동기들이 있어서 꽤나 재미있게 보내고 있는 것 같다.

이번에 Redux tookit을 사용해서 프로젝트를 해봤는데 기존 Redux보다는 훨씬 편해진 것 같아서 앞으로는 툴킷을 자주 이용할 것 같다.

이번 주차에서는 구글에서 제공하는 스토리지와 Fire store 회원관리 등을 애용해서 엄청 편하게 데이터DB를 이용했지만, 비동기통신을 도와주는 fetch 나 axios를 직접 사용하지 않아서 아쉬웠다.

하지만 다음 주차부터는 주 특기 백엔드 친구들과 함께 협업이기 때문에 피할 수 없는 과제이기도 했다.

그래서 axios에 대해서 간단하게 나마 공부한 것들을 남겨보려고 한다.

## Asios란 무엇인가?

Axios는 node.js와 브라우저를 위한 Promise 기반 HTTP 클라이언트 입니다. 그것은 동형 입니다(동일한 코드베이스로 브라우저와 node.js에서 실행할 수 있습니다). 서버 사이드에서는 네이티브 node.js의 http 모듈을 사용하고, 클라이언트(브라우저)에서는 XMLHttpRequests를 사용합니다.

## Asisos는 어떻게 사용할까?

```js
axios({
  url: 'https://test/api/cafe/list/today', // 통신할 웹문서
  method: 'get', // 통신할 방식
  data: {
    // 인자로 보낼 데이터
    foo: 'diary',
  },
});
```

위 코등와 같이 요청방식 / URL / 보내고 싶은 데이터 등을 함께 보내면 된디.

#### 좀 더 자세하게 어떤 것들을 보낼 수 있는 지 알아보자.

### axios 요청(request) 파라미터 옵션

- method : 요청방식. (get이 디폴트) url : 서버 주소
- baseURL : url을 상대경로로 쓸대 url 맨 앞에 붙는 주소. 예를들어, url이 `/post` 이고 baseURL이 https://some-domain.com/api/ 이면, https://some-domain.com/api/post로 요청 가게 된다.
- headers : 요청 헤더
- data : 요청 방식이 'PUT', 'POST', 'PATCH' 해당하는 경우 body에 보내는 데이터
- params : URL 파라미터 ( ?key=value 로 요청하는 url get방식을 객체로 표현한 것)
- timeout : 요청 timeout이 발동 되기 전 milliseconds의 시간을 요청. timeout 보다 요청이 길어진다면, 요청은 취소되게 된다.
- responseType : 서버가 응답해주는 데이터의 타입 지정 (arraybuffer, documetn, json, text, stream, blob)
- responseEncoding : 디코딩 응답에 사용하기 위한 인코딩 (utf-8)
- transformRequest : 서버에 전달되기 전에 요청 데이터를 바꿀 수 있다. 요청 방식 'PUT', 'POST', 'PATCH', 'DELETE' 에 해당하는 경우에 이용 가능배열의 마지막 함수는 string 또는 Buffer, 또는 ArrayBuffer를 반환합니다. header 객체를 수정 가능

- transformResponse : 응답 데이터가 만들어지기 전에 변환 가능
- withCredentials : cross-site access-control 요청을 허용 유무. 이를 true로 하면 cross-origin으로 쿠키값을 전달 할 수 있다.
- auth : HTTP의 기본 인증에 사용. auth를 통해서 HTTP의 기본 인증이 구성이 가능
- maxContentLength: http 응답 내용의 max 사이즈를 지정하도록 하는 옵션
- validateStatus : HTTP응답 상태 코드에 대해 promise의 반환 값이 resolve 또는 reject 할지 지정하도록 하는 옵션
- maxRedirects : node.js에서 사용되는 리다이렉트 최대치를 지정
- httpAgent /  httpsAgent : node.js에서 http나 https를 요청을 할때 사용자 정의 agent를 정의하는 옵션
- proxy : proxy서버의 hostname과 port를 정의하는 옵션
- cancelToken : 요청을 취소하는데 사용되어 지는 취소토큰을 명시

```js
/* axios 파라미터 문법 예시 */

axios({
    method: "get", // 통신 방식
    url: "www.naver.com", // 서버
    headers: {'X-Requested-With': 'XMLHttpRequest'} // 요청 헤더 설정
    params: { api_key: "1234", langualge: "en" }, // ?파라미터를 전달
    responseType: 'json', // default

    maxContentLength: 2000, // http 응답 내용의 max 사이즈
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    }, // HTTP응답 상태 코드에 대해 promise의 반환 값이 resolve 또는 reject 할지 지정
    proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    }, // proxy서버의 hostname과 port를 정의
    maxRedirects: 5, // node.js에서 사용되는 리다이렉트 최대치를 지정
    httpsAgent: new https.Agent({ keepAlive: true }), // node.js에서 https를 요청을 할때 사용자 정의 agent를 정의
})
.then(function (response) {
    // response Action
});
```

### axios 응답(response) 데이터

axios를 통해 요청을 서버에게 보내면, 서버에서 처리를하고 다시 데이터를 클라이언트에 응답 하게 된다. 이를 .then으로 함수인자로(response)로 받아 객체에 담진 데이터가 바로 응답 데이터이다. ajax를 통해 서버로부터 받는 응답의 정보는 다음과 같다.

```js
axios({
  method: 'get', // 통신 방식
  url: 'www.naver.com', // 서버
}).then(function (response) {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
});
```

```js
response.data: {}, // 서버가 제공한 응답(데이터)

response.status: 200, // `status`는 서버 응답의 HTTP 상태 코드

response.statusText: 'OK',  // `statusText`는 서버 응답으로 부터의 HTTP 상태 메시지

response.headers: {},  // `headers` 서버가 응답 한 헤더는 모든 헤더 이름이 소문자로 제공

response.config: {}, // `config`는 요청에 대해 `axios`에 설정된 구성(config)

response.request: {}
// `request`는 응답을 생성한 요청
// 브라우저: XMLHttpRequest 인스턴스
// Node.js: ClientRequest 인스턴스(리디렉션)
```

### Axios 단축 메소드

axios를 편리하게 사용하기 위해 모든 요청 메소드는 aliases가 제공된다. 위 처럼 객체 옵션을 이것저것 주면 가독성이 떨어지고 너저분하니, 함수형으로 재구성하여 나눠논 것으로 이해하면 된다. axios의 Request method에는 대표적으로 다음과 같은 것들이 있다.

1. GET : axios.get(url[, config])
2. POST : axios.post(url, data[, config])
3. PUT : axios.put(url, data[, config])
4. DELETE : axios.delete(url[, config])

```js

axios.request(config)

axios.get(url[, config])

axios.delete(url[, config])

axios.head(url[, config])

axios.options(url[, config])

axios.post(url[, data[, config]])

axios.put(url[, data[, config]])

axios.patch(url[, data[, config]])
```

## axios GET

get 메서드에는 2가지 상황이 크게 존재한다.

1. 단순 데이터(페이지 요청, 지정된 요청) 요청을 수행할 경우
2. 파라미터 데이터를 포함시키는 경우 (사용자 번호에 따른 조회)

```js
const axios = require('axios'); // node.js쓸때 모듈 불러오기

// user에게 할당된 id 값과 함께 요청을 합니다.
axios
  .get('/user?ID=12345')
  .then(function (response) {
    // 성공했을 때
    console.log(response);
  })
  .catch(function (error) {
    // 에러가 났을 때
    console.log(error);
  })
  .finally(function () {
    // 항상 실행되는 함수
  });

// 위와는 같지만, 옵션을 주고자 할 때는 이렇게 요청을 합니다.
axios
  .get('/user', {
    params: {
      ID: 12345,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// async/await 를 쓰고 싶다면 async 함수/메소드를 만듭니다.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

## axios POST

post 메서드에는 일반적으로 데이터를 Message Body에 포함시켜 보낸다. 위에서 봤던 get 메서드에서 params를 사용한 경우와 비슷하게 수행된다.

```js
axios
  .post('url', {
    firstName: 'Fred',
    lastName: 'Flintstone',
  })
  .then(function (response) {
    // response
  })
  .catch(function (error) {
    // 오류발생시 실행
  });
```

## axios Delete

delete 메서드에는 일반적으로 body가 비어있다. REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 삭제하는 목적으로 사용한다.

```js
axios
  .delete('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

하지만 query나 params가 많아져서 헤더에 많은 정보를 담을 수 없을 때는 다음과 같이 두 번째 인자에 data를 추가해줄 수 있다.

```js
axios
  .delete('/user?ID=12345', {
    data: {
      post_id: 1,
      comment_id: 13,
      username: 'foo',
    },
  })
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
```

## axios PUT

REST 기반 API 프로그램에서 데이터베이스에 저장되어 있는 내용을 갱신(수정)하는 목적으로 사용된다.. PUT메서드는 서버에 있는 데이터베이스의 내용을 변경하는 것을 주 목적으로 하고 있다. put 메서드는 서버 내부적으로 get -> post 과정을 거치기 때문에 post 메서드와 비슷한 형태이다.

```js
axios
  .put('url', {
    username: '',
    password: '',
  })
  .then(function (response) {
    // response
  })
  .catch(function (error) {
    // 오류발생시 실행
  });
```

## axios 동시 요청

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()]).then(
  axios.spread(function (acct, perms) {
    // 두개의 요청이 성공했을 때
  }),
);
```

## axios Instance 만들기

custom 속성을 지닌 axios 만의 instance를 만들 수 있다.

```js
//axios.create([config])

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
```

## 원격 이미지 다운 받기 (blob)

```js
const imgurl =
  'https://play-lh.googleusercontent.com/hYdIazwJBlPhmN74Yz3m_jU9nA6t02U7ZARfKunt6dauUAB6O3nLHp0v5ypisNt9OJk';

axios({
  url: imgurl,
  method: 'GET',
  responseType: 'blob', // blob 데이터로 이미지 리소스를 받아오게 지정
}).then((response) => {
  const url = URL.createObjectURL(new Blob([response.data])); // blob 데이터를 객체 url로 변환

  // 이미지 자동 다운 로직
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `sample.png`);
  document.body.appendChild(link);
  link.click();
});
```

## axios 에러 핸들링 하기

```js
axios
  .get('/user/12345', {
    validateStatus: function (status) {
      return status < 500; // 만일 응답코드가 500일경우 reject()를 반환한다.
    },
  })
  .catch(function (error) {
    console.log(error.toJSON());
  });
```

## Axios 전역 설정 (Config Defaults)

모든 요청에 적용되는 설정의 default 값을 전역으로 명시할 수 있다. 주로 서버에서 서버로 axios를 사용할때 요청 헤더를 명시하는데 자주 쓰인다.

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

```js
// Instance를 만들 때 설정의 default 값을 설정할 수 있다.
const instance = axios.create({
  baseURL: 'https://api.example.com',
});

// Instance를 만든 후  defalut 값을 수정할 수 있다.
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
instance.defaults.timeout = 2500;
```

위 공부한 것들을 토대로 다음 주차 백엔드 친구들과 실습한 번 해볼 수 있을 것 같다.

다음 주도 열심히 해서 좋은 결과 만들어 볼 수 있도록 해야겠다.

화이팅!
