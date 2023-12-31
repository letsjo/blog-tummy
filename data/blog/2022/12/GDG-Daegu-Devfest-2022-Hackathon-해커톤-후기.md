---
title: GDG Daegu Devfest 2022 Hackathon 해커톤 후기
date: 2022-12-03
categories:
  - Weekly Learn
tags:
  - Hackathon
---

![](https://velog.velcdn.com/images/gusdh2/post/69394767-4ef2-462f-bd07-1479f90a6729/image.png)

## 👨‍💻 해커톤을 처음 경험해보다.

![](https://velog.velcdn.com/images/gusdh2/post/4a172d45-dd3b-4cc2-b1c1-f2167998dd81/image.jpg)

올해 개발공부를 시작하고 처음으로 해커톤을 나가보았다. 해커톤이란 해킹과 마라톤을 더한 합성어로 개발자나 디자인 또는 기획자들이나 해당 직종을 꿈꾸는 학생들끼리 모여 주어진 시간 내 주제에 맞는 프로젝트를 만들어서 제출하고 프리젠테이션하는 것을 말한다.

이번 해커톤은 12시간이라고 적혀 있지만, 시작 전에 GDG 해커톤에 대해 소개를 하고, 작은 미니 게임들을 약 1시간 정도 진행했었다. 그리고 12시에 한국 대 포르투칼 전 월드컵 경기가 있다보니 기획 및 개발, 그리고 프리젠테이션 자료를 만드는 것까지 약 5-6시간 정도 되는 시간이 주어졌었던 것 같다.

## 🎁 GDG 미니 게임 당첨

시작 전에 아이스 브레이킹을 위해서 미니 게임을 했었는데, 무려 스타벅스 기프티콘과 GDG 맨투맨티를 받을 수 있었다. 덕분에 팀원들과 많이 친해질 수 있었던 계기가 됬었던 것 같다.

![](https://velog.velcdn.com/images/gusdh2/post/b04eecd3-ec20-480e-9300-963ef1cc508f/image.jpg)

![](https://velog.velcdn.com/images/gusdh2/post/7b29e1b3-e136-47d3-b5bd-ae17d01a4e47/image.jpg)

## 💡 아이디어 회의 및 주제 정하기

주제는 주어진 시간이 길지않다보니, `자유` 주제로 정해졌다. 그래서 팀원들 끼리 고민을 하다가 팀원 중에 한 분이 의료 쪽에 관심이 있으시고 인공지능 딥러닝을 배워보셨다고 하셔서, 증상들을 입력받으면 어떠한 질병인지를 체크해볼 수 있는 서비스를 구현 해보기로 했다.

![](https://velog.velcdn.com/images/gusdh2/post/1675f514-b0c2-42db-a51a-7d1ff552919d/image.png)

위 로고는 팀원 중 한 분이 디자인 쪽에 관심이 있으셔서 직접 만든 로고 이다. 정말 뚝딱 만드신거 치고는 정말 잘 만드신거 같다.

## 💉 주요 작업 및 기능 구현 목록

우선 `구글의 기술 스택을 사용하면 추가 점수가 있습니다.` 라는 안내사항이 있었고, 최대한 구글 서비스를 이용하기 위해서 딥러닝은 `Tensorflow`를 사용했고, DB는 `Firebase` 서비스를 이용했으며, `Google Map`을 이용하여 가까운 병원 정보를 제공할 수 있게 설계했다.

전체적인 기능은 사용자가 웹을 통하여 증상을 체크하면 딥러닝 모델을 기반으로, 웹과 딥러닝을 연동하여 이를 분석하고 결과를 다시 웹으로 전달 받을 수 있게 하고, 결과 창에서 `Google Map`을 이용해서 방문할 수 있는 관련 병원의 정보를 제공하며, 환자의 데이터는 `firebase`를 이용하여 암호화하여 보관하기로 했다.

## 💻 기능 개발

회원제로 서비스를 운영할 생각이었기 때문에 처음 메인 페이지는 로그인 페이지로 구현했으며, `firebase`를 사용해서 유저의 DB를 저장할 수 있게 구현 했습니다. 그리고 로그인 후에는 100개 이상의 증상들을 보고 해당 증상에 체크할 수 있도록 했습니다. 그리고 제출을 누를 경우 증상 데이터들을 해당 데이터를 딥러닝으로 전달 할 수 있도록 구현했습니다.

딥러닝에서 받은 결과 정보를 결과페이지에서 보여주게 되며, 가까운 병원을 구글 맵에서 확인 할 수 있도록 했습니다.

## 👨‍🏫 발표

![](https://velog.velcdn.com/images/gusdh2/post/668cf8c3-a61f-420e-9371-a8cf707eb9e3/image.jpg)

우선 급하게 발표자료를 만들었지만, 이야기하고 싶었던 많은 내용과 우리가 기획하려고 했던 서비스가 어떤 것이 였는지 기대효과는 어떤지에 대해서 잘 설명 할 수 있었던 것 같다.

많은 조들이 재치있는 주제로 잘 발표하고 기능 구현을 했었지만, 저희 조 주제자체가 다른 조들과는 다르게 `사회적으로 도움이 되는 주제`로 정해져서 관심도도 많이 높았었던 것 같습니다.

## 🏆 해커톤 결과

![](https://velog.velcdn.com/images/gusdh2/post/f4ce90c3-408d-4265-b7df-3de24ee36584/image.png)

#### 🎉🎉 그래서 1등을 수상하다! 소니 헤드셋!

결과 심사위원들 심사와 참가자들 심사에서 모두 1등을 하였습니다. 합산하면 당연히 `전체 1등`으로 수상 할 수 있게 됬습니다.

![](https://velog.velcdn.com/images/gusdh2/post/f59ca3c9-9d5a-4051-bc3c-b69d7d4ad7e9/image.jpg)

모든 팀들이 개발 할 수 있는 시간이 많지 않아, 전체적인 개발 완성도 보다는 아이디어와 발표의 비중이 많이 컸었던 것 같고, 그래서 1등을 할 수 있지 않았나 싶습니다.

## ✒️ 마무리

#### 🤔 어려웠던 점이나 아쉬웠던 점

최근 우아한테크코스 프리코스를 공부하느라 `Node JS`를 공부한다고 `React`를 자주 사용하지 않아 다시 `React`를 적응하고 구현하는데 어려움이 있었던 것 같고, 한창 `React`를 잘 사용했었을 때 참여를 했으면 좀 더 높은 퀄리티의 웹을 구현할 수 있었을 것 같습니다. 그래서 위 주어진 모든 기능들을 전부 제대로 구현하기에는 너무나도 시간이 너무 짧았었던게 아쉬웠습니다. 그리고 발표할 때 구현했던 기술 스택들을 자세하게 발표하지 못했던 점이 아쉬웠던 것 같습니다.

#### 😊 좋았던 점

우선 개발자로 진로를 정한 후 첫 해커톤에 나와서 바로 수상을 했다는 점에서 너무 좋았고, 기뻤습니다. 그리고 여러 개발자와 이야기를 나눌 수 있는 기회가 있어서 너무 행복했었던 시간이 였던 것 같습니다. 요즘 우아한테크코스 공부하느라 많이 지쳐있었는데, 오랜만에 새로운 사람들과 친해지고 놀 수 있었던 게 좋았습니다.

#### 😅 느낀점

개발만 하다보면 지칠 때가 종종 있는데, 그 때 쯤에 한 번씩 해커톤이나 행사에 참여해서 새로운 사람들과 이야기를 나눠보는 것도 괜찮을 것 같다고 느꼈습니다. 그리고 GDG에 참여했었던 고등학생들도 진짜 많았는데, 학생임에도 불구하고 다들 개발 능력이 뛰어나셔서 놀랐고, 그래서 저도 더 많이 성장해야겠다고 다짐했습니다.
