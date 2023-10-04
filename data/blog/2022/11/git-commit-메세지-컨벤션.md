---
title: '[git] 🗂️ git commit 메세지 컨벤션'
date: 2022-11-03
categories:
  - Study
tags:
  - 클린코드
  - Github
---

# **🗂️ git commit 메세지 컨벤션**

## 🗒️ git commit 메세지의 구조

```
feat(changelog): 추가 로그인 함수

로그인 API 개발

Resolves: #123
Ref: #456
Related to: #48, #45
```

- 커밋 메시지의 각 line(라인)은 **최대 100글자**가 넘지 않도록 합니다.

  - 이를 통해 github 및 다양한 git 도구에서 메시지를 더 쉽게 읽을 수 있습니다.

### 🎯 **Subject line (제목 줄)**

Subject line 에는 변경 사항에 대한 간결한 설명이 포함됩니다.

```js
// Subject line구조
<type>(<scope>): <subject>
```

- **🔖 type (타입)**
  - 어떤 의도로 커밋했는지를 type에 명시한다.
  - 타입은 영어로 작성한다.
- **🔭 scope (스코프)**
  - 어디가 변경되었는지, 변경된 위치를 입력한다.
  - 함수가 변경되었으면 함수 이름, 메소드가 추가되었으면 class 이름 표기한다.
  - `scope`는 생략 가능하다.
  - 예) `$location`, `$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView` 등등...
- **🎯 subject (제목)**
  - 명령문, 현재 시제로 작성한다.
  - 영문 예시) `change` : O / `changed`, `changes` : X
  - 첫글자를 대문자로 쓰지 않아야 한다. 소문자로 써야한다.
  - 마지막에 마침표(.)를 붙이지 말아야한다.

### 📃 **Message Body (메시지 내용)**

- 명령문, 현재 시제로 작성하길 권장한다.
- 변경한 이유 및 변경 전과 후의 차이점을 기재한다.
- 긴 설명이 필요한 경우에 작성한다.
- 어떻게 했는지보다는, 무엇을 왜 했는지를 작성한다.

### 🦶 **Message Footer (메시지 하단)**

- 주요 변경 내역들 (Breaking Changes)
  - 모든 주요 변경 내역들은 다음과 함께 하단에 언급되어야 한다.
- 모든 주요 변경 내역들은 다음과 함께 하단에 언급되어야 한다.
  - 변경점 (description of the change)
  - 변경 사유 (justification)
  - 마이그레이션 지시 (migration instructions)
- 해결된 이슈 (Referencing Issues)
  - 해결된 이슈는 커밋 메시지 하단에 Closes #<이슈번호> 와 같이 기록되어야 한다.
  - 해결된 이슈가 여러개인 경우는 ,(쉼표) 로 구분해서 기록한다.
    ```js
    // 예시
    Closes #234
    Closes #123, #245, #992
    ```

## **🔖 type (타입)** 의 종류 :

- ✨ feat : 새로운 기능을 추가할 경우
- 🐛 fix : 버그를 고친 경우
- 📝 docs : 문서를 수정한 경우
- 🎨 style : 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- ♻️ refactor : 프로덕션 코드 리팩토링
- ✅ test: 테스트 추가, 테스트 리팩토링 (코드 변경 X)
- 📦 chore : 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우 (코드 변경 X) <br/>
- 💄 design : CSS 등 사용자 UI 디자인 변경
- 💡 comment : 필요한 주석 추가 및 변경
- 🚚 rename : 파일 혹은 폴더명을 수정하는 경우
- 🔥 remove : 사용하지 않는 파일 혹은 폴더를 삭제하는 경우
