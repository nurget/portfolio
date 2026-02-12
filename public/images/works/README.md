# 프로젝트 대표 이미지

프로젝트(Works) 섹션에서 각 프로젝트 카드 오른쪽에 보이는 이미지입니다.

## 넣는 방법

1. 이 폴더(`public/images/works/`)에 이미지 파일을 넣습니다.
2. `src/components/sections/Projects.tsx`에서 해당 프로젝트에 `image` 값을 넣습니다.

## 파일 이름 예시

| 프로젝트 | 권장 파일명 | image 값 예시 |
|----------|-------------|----------------|
| 01 샵빌더 백엔드 | 01.jpg | `'/images/works/01.jpg'` |
| 02 모니터링 | 02.jpg | `'/images/works/02.jpg'` |
| 03 샵빌더 백오피스 | 03.jpg | `'/images/works/03.jpg'` |
| ... | 04.jpg ~ 08.jpg | 동일 패턴 |

JPG, PNG, WebP 모두 사용 가능합니다. 비율은 4:3이 보기 좋습니다.
