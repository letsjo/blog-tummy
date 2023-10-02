---
title: 'Three.js 기본 용어'
date: '2023-10-02'
categories:
  - 'Study'
tags:
  - 'Threejs'
---

Three.js 를 들어가기 전에 익혀야할 용어들을 익혀봅시다.

## Three.js 기본적인 요소

![](https://velog.velcdn.com/images/gusdh2/post/eb343d2a-4105-4b94-b8e2-a55060e8ec6c/image.png)

- Scene : 장면/무대 를 뜻합니다.
- Light : 빛 을 뜻합니다.
- Camera : Render 시 보여지는 시야 (즉, near와 far 사이 거리에서 시야각 안에 들어와야 보임)
  - Field Of View : 시야각
  - near : 최소 볼 수 있는 거리
  - far : 최대 볼 수 있는 거리
- Mesh : 모양(Geometry)와 재질(Material)이 더해진 사물
  - Geometry : 사물의 모양
  - Material : 사물의 재질
- Renderer : 위 모든 요소들을 고려해 그려진 장면을 뜻합니다.

## Camera 의 near/far 개념

![](https://velog.velcdn.com/images/gusdh2/post/15743125-afd6-4b16-955d-8eddfc77fd9e/image.png)

- Camera 에 `near` 보다 가깝거나, `far` 보다 먼 Mesh 는 보이지 않습니다.

## Mesh 의 Material의 개념

![](https://velog.velcdn.com/images/gusdh2/post/dac94c9e-82dd-4f19-99bd-3a8b9183426f/image.png)

- 위 그림처럼 같은 색깔과 모양이지만, 재질에 따라서 빛 반사나, 보여지는 모양이 다르게 보이게 됩니다.

## Camera Mode : Perspective(원근모드) vs Orthographic(직교모드)

![](https://velog.velcdn.com/images/gusdh2/post/0b40726a-d078-4a7b-aa2a-fb76aaee54b4/image.png)

![](https://velog.velcdn.com/images/gusdh2/post/5ba7b677-36f6-40fb-a26a-93a298fe57a7/image.png)

왼쪽: 원근 카메라(Perspective) / 오른쪽: 직교 카메라(Orthographic)

위 그림처럼 동일한 위치에서 보고 있지만, 카메라 모드에 따라 거리에 영향을 받아 작게 표현할지, 그대로 표현하게 될 지 다르게 표현합니다.

- **Orthographic Mode** : LOL이나, 보드게임 같은 게임
- **Perspective Mode** : WOW 등 원근감이 필요한 RPG 게임
