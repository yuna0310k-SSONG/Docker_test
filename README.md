# NestJS CI/CD 프로젝트

NestJS 기반의 RESTful API 애플리케이션으로, CI/CD 파이프라인과 Docker 컨테이너화가 구성된 프로젝트입니다.

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [API 엔드포인트](#api-엔드포인트)
- [프로젝트 설정](#프로젝트-설정)
- [로컬 개발](#로컬-개발)
- [테스트](#테스트)
- [Docker](#docker)
- [CI/CD 파이프라인](#cicd-파이프라인)
- [프로젝트 구조](#프로젝트-구조)

## 📖 프로젝트 개요

이 프로젝트는 NestJS 프레임워크를 사용하여 구축된 RESTful API 서버입니다. 다음과 같은 기능을 포함합니다:

- **RESTful API**: GET 메서드 기반의 간단한 엔드포인트 제공
- **CI/CD 파이프라인**: GitHub Actions를 통한 자동화된 코드 품질 검증 및 빌드
- **Docker 컨테이너화**: 멀티 스테이지 빌드를 통한 최적화된 Docker 이미지
- **Docker Compose**: NestJS 애플리케이션과 MySQL 데이터베이스의 통합 구성

## 🛠 기술 스택

- **Framework**: NestJS 11.0.1
- **Language**: TypeScript 5.7.3
- **Runtime**: Node.js 20
- **Database**: MySQL 8.0
- **Container**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest
- **Linting**: ESLint

## 🚀 API 엔드포인트

모든 엔드포인트는 GET 메서드만 사용하며, 문자열을 반환합니다.

| URL 경로            | 응답 문자열    |
| ------------------- | -------------- |
| `GET /hello`        | `Hello World`  |
| `GET /hello/docker` | `Hello Docker` |
| `GET /hello/cicd`   | `Hello CI/CD`  |

### API 테스트

```bash
# 서버 실행 후
curl http://localhost:3000/hello
curl http://localhost:3000/hello/docker
curl http://localhost:3000/hello/cicd
```

## ⚙️ 프로젝트 설정

### 필수 요구사항

- Node.js 20 이상
- npm 또는 yarn
- Docker 및 Docker Compose (컨테이너 실행 시)

### 설치

```bash
# 의존성 설치
npm install
```

## 💻 로컬 개발

### 개발 모드 실행

```bash
# 개발 모드 (파일 변경 시 자동 재시작)
npm run start:dev

# 일반 모드
npm run start

# 프로덕션 모드
npm run start:prod
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 🧪 테스트

### 테스트 실행

```bash
# 단위 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch

# 커버리지 포함 테스트
npm run test:cov

# E2E 테스트
npm run test:e2e
```

### 테스트 커버리지

현재 프로젝트에는 다음 테스트가 포함되어 있습니다:

- `GET /hello` 엔드포인트 테스트
- `GET /hello/docker` 엔드포인트 테스트
- `GET /hello/cicd` 엔드포인트 테스트

## 🐳 Docker

### Dockerfile

프로젝트는 멀티 스테이지 빌드를 사용하여 최적화된 Docker 이미지를 생성합니다.

**빌드 스테이지**:

- Node.js 20 Alpine 이미지 사용
- 의존성 설치 및 애플리케이션 빌드

**프로덕션 스테이지**:

- 프로덕션 의존성만 설치
- 빌드된 파일만 복사하여 이미지 크기 최소화

### Docker 이미지 빌드 및 실행

```bash
# 이미지 빌드
docker build -t nestjs-app .

# 컨테이너 실행
docker run -p 3000:3000 nestjs-app
```

### Docker Compose

Docker Compose를 사용하여 NestJS 애플리케이션과 MySQL 데이터베이스를 함께 실행할 수 있습니다.

#### 서비스 구성

- **app**: NestJS 애플리케이션 (포트 3000)
- **db**: MySQL 8.0 데이터베이스 (포트 3306)

#### 환경 변수

애플리케이션은 다음 환경 변수를 사용합니다:

- `DB_HOST`: 데이터베이스 호스트 (기본값: `db`)
- `DB_PORT`: 데이터베이스 포트 (기본값: `3306`)
- `DB_USERNAME`: 데이터베이스 사용자명
- `DB_PASSWORD`: 데이터베이스 비밀번호
- `DB_DATABASE`: 데이터베이스 이름

#### 실행 명령어

```bash
# 서비스 시작 (백그라운드)
docker-compose up -d

# 서비스 중지
docker-compose down

# 볼륨 포함 완전 삭제
docker-compose down -v

# 로그 확인
docker-compose logs -f app
docker-compose logs -f db

# 특정 서비스만 재시작
docker-compose restart app
```

#### 네트워크 및 볼륨

- **네트워크**: `app-network` (bridge 드라이버)
  - 두 서비스가 동일한 네트워크를 통해 통신
- **볼륨**: `mysql-data`
  - MySQL 데이터 영속성을 위한 볼륨
  - 컨테이너 재시작 시에도 데이터 유지

## 🔄 CI/CD 파이프라인

GitHub Actions를 사용하여 자동화된 CI 파이프라인이 구성되어 있습니다.

### 파이프라인 트리거

- `main` 또는 `develop` 브랜치에 push 시
- `main` 또는 `develop` 브랜치로의 Pull Request 시

### 파이프라인 단계

#### 1. Lint Job

- **목적**: ESLint를 통한 코드 품질 검증
- **실행**: `npm run lint`
- **검증 내용**: 문법 오류 및 코드 스타일 검사

#### 2. Test Job

- **목적**: Jest를 통한 테스트 실행
- **실행**: `npm test`
- **검증 내용**: 모든 단위 테스트 통과 여부

#### 3. Build Job

- **목적**: NestJS 애플리케이션 빌드 검증
- **실행**: `npm run build`
- **검증 내용**: 빌드 성공 및 `dist` 디렉토리 생성 확인

### 파이프라인 특징

- 각 단계는 독립적인 job으로 분리
- Node.js 20 사용 및 npm 캐시 활용
- 빌드 실패 시 파이프라인 전체 실패 처리
- 병렬 실행으로 빠른 피드백 제공

### 파이프라인 확인

GitHub 저장소의 **Actions** 탭에서 파이프라인 실행 상태를 확인할 수 있습니다.

## 📁 프로젝트 구조

```
.
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI 파이프라인
├── src/
│   ├── app.controller.ts       # API 컨트롤러
│   ├── app.controller.spec.ts  # 컨트롤러 테스트
│   ├── app.module.ts           # 루트 모듈
│   ├── app.service.ts          # 서비스
│   └── main.ts                 # 애플리케이션 진입점
├── test/
│   ├── app.e2e-spec.ts         # E2E 테스트
│   └── jest-e2e.json           # E2E 테스트 설정
├── .dockerignore               # Docker 빌드 제외 파일
├── docker-compose.yml          # Docker Compose 설정
├── Dockerfile                  # Docker 이미지 빌드 설정
├── package.json                # 프로젝트 의존성 및 스크립트
├── tsconfig.json               # TypeScript 설정
└── README.md                   # 프로젝트 문서
```

## 📝 주요 스크립트

```json
{
  "build": "nest build", // 프로덕션 빌드
  "start": "nest start", // 일반 모드 실행
  "start:dev": "nest start --watch", // 개발 모드 실행
  "start:prod": "node dist/main", // 프로덕션 모드 실행
  "lint": "eslint ...", // 코드 린팅
  "test": "jest", // 테스트 실행
  "test:cov": "jest --coverage" // 커버리지 포함 테스트
}
```

## 🔒 .dockerignore

다음 항목들이 Docker 이미지에서 제외됩니다:

- `node_modules`
- 테스트 결과물 (`coverage`, `test`, `*.spec.ts`)
- 로컬 설정 파일 (`.env*`)
- IDE 설정 파일 (`.vscode`, `.idea`)
- Git 관련 파일
- 빌드 결과물 (`dist` - Docker 내부에서 빌드)

## 📄 라이선스

이 프로젝트는 UNLICENSED입니다.

## 👥 기여

이슈 및 Pull Request를 환영합니다!

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.
