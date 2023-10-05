---
title: redux createStore 에 밑줄이 그어지는 이유는 왜 일까?
date: 2022-07-09
categories:
  - Study
tags:
  - React
  - Redux
---

![](https://velog.velcdn.com/images/gusdh2/post/91eee934-2c95-46ac-8603-6758ce69a84e/image.png)

redux에서 제공하는 createStore에 대뜸 취소선이 그어졌다. 왜그럴까?

![](https://velog.velcdn.com/images/gusdh2/post/d10995b3-b9c7-4ae3-b276-a25c0376f8d2/image.png)

마우스 hover 했더니 @reduxjs/toolkit에서 제공하는 configureStore로 쓰라고 한다.

## 결론

#### deprecated인 것 처럼 해놨지만, 기능에 문제없이 잘 동작함.

#### 그런데 RTK(Redux Tookit) 쓰는걸 권장함

바로 redux 공식문서로 호다닥 뛰어가서 redux github 뒤져봤더니

WE ARE NOT GOING TO ACTUALLY REMOVE THE createStore API, AND ALL YOUR EXISTING CODE WILL STILL CONTINUE TO WORK AS-IS!

#### [우리는 createStore API를 실제로 제거하지 않을 것이며 기존의 모든 코드는 여전히 그대로 계속 작동할 것입니다]

Again, no broken code, and no runtime warnings.

#### [다시 말하지만, 코드 이상없고, 런타임경고도 없습니다.]

If users do not want to see that strikethrough, they have three options:

#### [취소선 보고싶지않다면 3가지 옵션이 있어요]

1.Follow our suggestion to switch over to Redux Toolkit and configureStore

#### [우리 제안대로 RTK configureStore 쓰거나,]

2.Do nothing. It's just a visual strikethrough, and it doesn't affect how your code behaves. Ignore it.

#### [아무것도 하지마요. 그냥 취소선일뿐이니까 코드에는 아무런 영향도없어요 무시해요]

3.Switch to using the legacy_createStore API that is now exported, which is the exact same function but with no @deprecation tag. The simplest option is to do an aliased import rename:

#### [아래와 같이 이름만 바꿔서 써요. deprecated 표시는 없으니까.]

![](https://velog.velcdn.com/images/gusdh2/post/c1a72a78-7b0d-47ff-81a9-5a9c8fdfc1b5/image.png)

그럼 이들이 제안하는 Toolkit은 어떤 것들이 있는지 알아보자~
