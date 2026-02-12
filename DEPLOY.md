# 포트폴리오 배포 가이드 (Vercel)

## 왜 Vercel?
- **가장 쉬움**: GitHub 연결만 하면 자동 배포
- **무료**: 개인 프로젝트 무제한, 대역폭 100GB/월
- **성능**: 글로벌 CDN, Next.js 최적화

---

## 방법 1: Vercel 웹에서 배포 (추천)

### 1단계: GitHub에 코드 올리기
```bash
cd /Users/ayeong/Documents/ayeong/autoever-portfolio
git init
git add .
git commit -m "Initial commit"
# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/내아이디/autoever-portfolio.git
git branch -M main
git push -u origin main
```

### 2단계: Vercel 배포
1. [vercel.com](https://vercel.com) 접속 → **Sign Up** (GitHub 계정으로 로그인)
2. **Add New** → **Project** 클릭
3. **Import** 버튼으로 `autoever-portfolio` 저장소 선택
4. 설정 확인 후 **Deploy** 클릭
   - Framework Preset: Next.js (자동 감지)
   - Build Command: `npm run build` (기본값)
   - Output Directory: (비워두기, Next.js 기본값 사용)
5. 1~2분 후 배포 완료 → **Visit** 로 사이트 확인

### 3단계: 이후 업데이트
- `main` 브랜치에 `git push` 할 때마다 **자동으로 재배포**됩니다.

---

## 방법 2: Vercel CLI로 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 폴더에서
cd /Users/ayeong/Documents/ayeong/autoever-portfolio
vercel

# 처음 실행 시 로그인 + 프로젝트 연결
# Production 배포
vercel --prod
```

---

## 커스텀 도메인 (선택)
1. Vercel 대시보드 → 프로젝트 → **Settings** → **Domains**
2. 본인 도메인 추가 후 DNS에 안내된 레코드 설정

---

## 참고: 무료 한도
- **대역폭**: 100GB/월
- **빌드 시간**: 6000분/월 (개인)
- 포트폴리오 용도로는 충분합니다.
