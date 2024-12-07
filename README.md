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

## 📦 설치 및 실행

### 1. 클론하기

```bash
git clone https://github.com/your-repository/collabo_creator_front.git
cd collabo_creator_front
