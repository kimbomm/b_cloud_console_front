# Cloud Console — Frontend

> 프로젝트 · 인스턴스 · 스토리지 · 멤버 · 비용을 **한 화면에서 관리하는** 클라우드 관리 콘솔.
> 화면이 많고 오래 운영될 서비스라서, **처음부터 공통 컴포넌트와 팀 규칙을 먼저 세운** 프로젝트입니다.

> 회사(프리아이브)에서 진행한 프로젝트로, 이 문서는 포트폴리오용으로 작성했으며 고객사 정보, 실서비스 주소, 설정 값은 포함하지 않습니다.

<br>

## 📋 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 소속 | 프리아이브 프론트개발팀 |
| 역할 | **프론트엔드 팀장** · 아키텍처 설계 및 개발 |
| 형태 | Vue 3 + Quasar 기반 SPA / PWA |

<br>

## 🎯 해결해야 했던 문제

| 문제 | 접근 |
|---|---|
| 관리 화면이 **70개 이상**이라 UI가 쉽게 제각각이 됨 | 공통 컴포넌트 18종을 먼저 만들고, 사용법을 가이드 페이지로 공유 |
| 여러 명이 동시에 작업해 **충돌과 추적이 어려움** | 이슈 번호 = 브랜치 이름 = 커밋 접두사 규칙 |
| 화면마다 스타일이 서로 영향을 줌 | 도메인별 SCSS 분리, 공통 변수 · 유틸리티 분리 |
| 웹과 설치형(PWA) 모두 필요 | 같은 코드로 SPA · PWA 빌드 |

<br>

## 👤 담당 역할

- **프론트엔드 아키텍처 설계** — 프로젝트 구조, 라우팅, 레이아웃(Main · Sub · Login · Guide) 체계
- **공통 컴포넌트 · 디자인 시스템** — 버튼, 테이블, 입력, 팝업, 토스트 등 18종 설계와 가이드 페이지 구축
- **팀 개발 규칙 수립** — 브랜치 전략, 커밋 메시지, 폴더 · 파일 명명 규칙
- **화면 개발** — 대시보드, 프로젝트 · 인스턴스, 스토리지, 빌링, 키 관리

<br>

## ✨ 주요 화면

| 영역 | 내용 |
|---|---|
| 대시보드 | 프로젝트 · 리소스 현황 요약 |
| 프로젝트 | 프로젝트, 인스턴스, 태스크 그룹 · 태스크 |
| 스토리지 · 이미지 | 스토리지, 기본 · 공유 이미지 |
| 멤버 | 목록, 상세, 권한 |
| 빌링 | 프로젝트 · 인스턴스 · 스토리지 · 멤버별 사용 요금 |
| 키 관리 | SSH 키, API 키 |
| 마이페이지 | 알림, 계정, 탈퇴 |
| 가이드 | 공통 컴포넌트 사용법 (`/guide`) |

<br>

## 🛠 기술 스택

| 영역 | 기술 |
|---|---|
| 프레임워크 | Vue 3, Quasar 2 (SPA / PWA) |
| 상태 · 라우팅 | Pinia, Vue Router 4 |
| 통신 | Axios (Quasar boot 파일로 공통 설정) |
| 다국어 | vue-i18n |
| UI | 자체 공통 컴포넌트, ApexCharts, vue3-easy-data-table |
| 인증 | Google 로그인 |
| 스타일 | SCSS (화면 영역별 분리, Quasar 변수 커스터마이징) |
| 배포 | Docker, docker-compose |
| 품질 | ESLint, Prettier, EditorConfig |

<br>

## 🏗 프로젝트 구조

```text
src/
├── boot/          # 앱 시작 시 로드 (axios, i18n, chart, data-table, google-login)
├── components/
│   ├── common/    # 공통 컴포넌트 (C 접두사: CButton, CTable, CInput ...)
│   └── layout/    # SideBar, TopNav
├── layouts/       # Main / Sub / Login / Guide
├── pages/         # 도메인별 화면 (projects, storage, billing, members, my ...)
│   └── guide/     # 공통 컴포넌트 가이드
├── services/      # API 모듈
├── stores/        # Pinia
├── composables/   # 공통 로직
├── i18n/
└── css/           # 전역 · 화면별 SCSS
```

<br>

## 🤝 팀 개발 규칙

<details open>
<summary><b>브랜치 전략</b></summary>

```text
master                 운영 배포
develop                개발 통합
feature/{이슈번호}      이슈 단위 작업
```
</details>

<details>
<summary><b>커밋 메시지</b></summary>

```text
#{이슈번호} [이슈 제목]

1. 변경 내용
2. 변경 내용
```
</details>

<details>
<summary><b>명명 규칙</b></summary>

| 대상 | 규칙 | 예시 |
|---|---|---|
| 폴더 | kebab-case | `pages/workspaces/my-stats` |
| 파일 | PascalCase + 역할 접미사 | `IndexPage.vue`, `UserRegistPopup.vue` |
| 공통 컴포넌트 | `C` 접두사 | `CButton.vue`, `CTable.vue` |
</details>

<details>
<summary><b>운영체제별 줄바꿈 설정</b></summary>

```bash
git config --global core.autocrlf true    # Windows
git config --global core.autocrlf input   # macOS
```
</details>

<br>

## 💡 주요 작업

### 1. 공통 컴포넌트와 가이드 페이지
- 화면 개발 전에 공통 컴포넌트 18종을 만들고, 각 사용법을 `/guide` 페이지에서 바로 확인할 수 있게 구성
- → 팀원이 같은 UI를 따로 만들지 않고, 70개 이상의 화면이 같은 모양과 동작을 유지

### 2. 이슈 기반 협업 체계
- 이슈 번호를 브랜치 이름과 커밋 접두사에 그대로 쓰는 규칙
- → 90개 이상의 기능 브랜치를 같은 규칙으로 운영하고, 어떤 변경이 어떤 이슈인지 바로 추적

### 3. 화면 영역별 스타일 분리
- billing · projects · storage 등 영역별 SCSS를 나누고, 폰트 · 리셋 · 유틸리티 · Quasar 변수는 공통으로 분리
- → 한 화면을 고쳐도 다른 화면 스타일이 깨지지 않음

<br>

## 🚀 실행 방법

```bash
yarn
quasar dev            # 개발 서버
quasar build          # SPA 빌드
quasar build -m pwa   # PWA 빌드
yarn lint
```
