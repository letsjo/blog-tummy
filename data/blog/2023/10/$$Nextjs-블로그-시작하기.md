---
title: Next.js 블로그 시작하기
date: 2023-10-05
categories:
  - Weekly Learn
tags:
  - Blog
  - Nextjs
---

> 블로그를 시작하기에 앞서 많은 블로그 레퍼런스를 찾아다녔습니다. 레이아웃은 어떻게 갖춰갈지, 개발 환경은 어떻게 정할 것인지, 기능을 어디까지 만들고 어떻게 확장해 나아갈지 고민해봐야 한다.

우선 확정된 것은 Next.js 기반으로 만들 예정이고, 하나씩 기록하면서 만들 계획이다.

# Next.js 블로그 시작하기

## 1. 기본 레이아웃

우선 위에서 언급한대로 많은 레퍼런스 블로그들을 둘러보고 저장해 놓았습니다.

- https://miryang.dev/
- https://note.heyo.me/
- https://miriya.net/
- https://tambouille.vercel.app/
- https://musing.vercel.app/

## 2. 개발 환경

### Next.js

![](images/Pasted%20image%2020231005192708.png) 블로그는 각 포털 사이트의 크롤러가 나의 블로그 글을 잘 긁어갈 수 있도록 하는 SEO(Search Engine Optimization)가 상당히 중요합니다. 그래서 SSR(Server Side Rendering) 을 지원해야 하기 때문에 제일 익숙한 `React.js`를 사용한 **Next.js** 을 사용하였습니다.

### Vercel

![](images/Pasted%20image%2020231005192643.png) 배포를 위해서 Next.js 프레임워크와 찰떡인 Vercel을 사용하기로 하였습니다. main 브랜치에 push가 진행되면 자동적으로 Lint 체크와 테스트를 진행하고 배포까지 해주는 CI/CD 기능까지 제공해줍니다.

### Github

![](images/Pasted%20image%2020231005192747.png) Github는 저장소 역할을 할 뿐만 아니라 백업(버전) 관리의 역할까지 해줄 수 있기 때문에 선택하게 되었습니다. 뿐만 아니라 `vercel` 과 CI/CD를 구현하기에 수월합니다.

## 3. 필요한 기능

- 반응형 디자인
- 다크 모드
- 댓글 시스템
- 포스트 디렉토리 설계
- 이미지 처리
- 포스팅 글 Search 시스템
- 마크다운을 HTML로 변경해주는 기능
- 마크다운 작성 편집기 선택
- SEO 최적화 적용
-
