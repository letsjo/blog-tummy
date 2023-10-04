---
title: EventListener으로 등록할 수 있는 이벤트 중 자주 쓰이는 이벤트 목록
date: 2022-07-07
categories:
  - Study
tags:
  - JavaScript
---

### UI EventListener – 사용자가 웹페이지가 아닌 브라우저의 UI와 상호작용할 때 발생

- load : 웹 페이지의 로드가 완료되었을 때
- unload : 웹 페이지가 언로드 될 때(새로운 페이지를 요청한 경우 )
- error : 브라우저가 자바스크립트 오류를 만났거나 요청한 자원이 없는 경우
- resize : 브라우저의 창 크기를 조정했을 때
- scroll : 사용자가 페이지를 위아래로 스크롤 할 때

### Keyboard EventListener – 사용자가 키보드를 이용할 때 발생한다.

- keydown : 사용자가 키를 처음 눌렀을 때
- keyup : 키를 땔 때
- keypress : 사용자가 눌렀던 키의 문자가 입력되었을 때

### Mouse EventListener – 사용자가 마우스나 터치화면을 사용할 때 발생

- click : 사용자가 동일한 요소 위에서 마우스 버튼을 눌렀다 땔 때
- dbclick : 두 번 눌렀다 땔 때
- mousedown : 마우스를 누르고 있을 때
- mouseup : 눌렀던 마우스 버튼을 땔 때
- mousemove : 마우스를 움직였을 때
- mouseover : 요소 위로 마우스를 움직였을 때
- mouseout : 요소 바깥으로 마우스를 움직였을

### Focus EventListener

- focus : 요소가 포커스를 얻었을 때 (이벤트 확산 X)
- focusin : 요소가 포커스를 얻었을 때 (이벤트 확산 O)
- blur : 요소가 포커스를 잃었을 때 (이벤트 확산 X)
- focusout : 요소가 포커스를 잃었을 때 (이벤트 확산 O)

### Form EventListener

- input : `<input>`,`<textarea>`요소 값이 변경되었을 때
- change : 선택 상자, 체크박스, 라디오 버튼의 상태가 변경되었을 때
- submit : 사용자가 버튼키를 이용하여 폼을 제출할 때
- reset : 리셋 버튼을 클릭할 때
- cut : 폼 필드의 콘텐츠를 잘라내기 했을 때
- copy : 폼 필드의 콘텐츠를 복사했을 때
- paste : 폼 필드의 콘텐츠를 붙여넣을 때
- select : 텍스트를 선택했을 때
