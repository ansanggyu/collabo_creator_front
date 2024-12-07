# 🛍️ Collabo Creator Front

**Collabo Creator Front**는 크리에이터들이 제품을 등록하고 관리하며, 고객과 소통할 수 있는 쇼핑몰 플랫폼의 프론트엔드 애플리케이션입니다.  
React와 Vite를 기반으로 빠르고 효율적인 개발 환경을 제공합니다.

## 🌟 주요 기능

- **제품 관리**
  - 제품 등록, 수정, 삭제
  - 제품 리스트와 상세 보기
- **카테고리 관리**
  - 카테고리 추가 및 관리
- **고객 주문 관리**
  - 주문 상세 내역 보기 및 상태 관리
- **리뷰 및 Q&A 관리**
  - 고객 리뷰 및 문의 확인
- **이미지 업로드**
  - S3를 활용한 이미지 업로드 및 관리
- **JWT 인증**
  - JWT를 활용한 사용자 인증 및 토큰 갱신

## 🚀 기술 스택

- **Frontend Framework**: React, TypeScript
- **Build Tool**: Vite
- **CSS**: Tailwind CSS
- **API 통신**: Axios + JWT Axios
- **상태 관리**: Redux Toolkit
- **이미지 스토리지**: AWS S3
- **라우팅 및 로드 밸런싱**: AWS Application Load Balancer (ALB)
- **배포**: Docker, AWS EC2, Route 53
- **CI/CD**: GitHub Actions

## 🌟 주요 기능 (라우팅 관련)

- **SPA (Single Page Application) 지원**
  - `React Router`를 활용한 클라이언트 사이드 라우팅 구현.
  - 페이지 리로드 없이 빠르고 부드러운 네비게이션 제공.

- **Lazy Loading 및 Code Splitting**
  - `React.lazy`와 `Suspense`를 사용하여 페이지별로 필요한 컴포넌트만 로드.
  - 초기 로딩 시간을 줄이고 성능 최적화.

- **Fallback 로딩 화면**
  - 네트워크 지연 시 사용자에게 로딩 페이지를 제공하여 부드러운 사용자 경험 보장.

- **리디렉션 지원**
  - `/` 경로 접근 시 `/login`으로 리디렉션 처리 (`<Navigate>`를 사용).

- **라우트 모듈화**
  - `OfflineManagementRouter`, `AnalyticsRouter`, `CategoryRouter` 등 주요 도메인별로 라우트를 분리.
  - 라우터 코드를 가독성과 확장성을 고려하여 관리.

- **RESTful 라우팅 구조**
  - URL 패턴과 라우트가 직관적으로 매핑되어 유지보수가 용이.
  - 예시:
    - `/main`: 크리에이터 대시보드 메인 페이지
    - `/login`: 로그인 페이지
    - `/products`: 제품 관리
    - `/analytics`: 통계 및 분석
    - `/orders`: 주문 관리
    - `/reviews`: 리뷰 관리

- **보안 및 접근 제어**
  - 로그인 페이지로 리디렉션 처리(`/` 접근 시), 인증 흐름 강화 가능.

---

### 💡 UX/UI 최적화

- **사용자 중심의 URL 설계**
  - 크리에이터 관점에서 필요한 주요 기능들이 명확한 URL에 매핑.
  - URL만 봐도 해당 페이지의 역할을 직관적으로 알 수 있음.

- **확장 가능한 라우팅 구조**
  - 새로운 기능 추가 시 라우트를 쉽게 확장 가능.
  - 모듈화된 라우트 파일 구조로 각 기능에 독립적으로 접근 가능.

- **로딩 경험 최적화**
  - 네트워크 지연 또는 느린 컴포넌트 로딩 시 `LoadingPage`로 사용자 이탈 최소화.

---

이러한 라우팅 구조와 최적화는 **빠르고 직관적인 사용자 경험**을 제공하며, 복잡한 SPA 프로젝트에서 유지보수와 확장성을 보장합니다.
