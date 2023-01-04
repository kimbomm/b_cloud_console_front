# Quasar App (quasar-project)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


### Gitlab 공통규칙
1. 브랜치(branch) 규칙
```bash
develop:  개발 브랜치
feature/${IssueNumber}: 각 업무(issue, task) 개발용 브랜치
release/develop: DEV 서버 배포 브랜치
release/staging: STG(QA) 서버 배포 브랜치
master: 실서버(Product) 배포 브랜치
```

2. 커밋 메시지 작성
```bash
#${issusNumber} [이슈 타이틀]

1. ....
2. ....
3. ....
...
```

### 폴더 및 파일 생성 규칙
1. 폴더명(kebab-case)
```bash
예시)
pages > workspaces > _id > myStats
pages > workspaces > _id > myImages
```
2. 파일명(PascalCase)
```bash
파일명 규칙: postFix을 활용한다.

pages > guide > IndexPage.vue 가이드 index 페이지
pages > workspaces > IndexPage.vue 워크스페이스 index 페이지

components > common > CButton.vue: 공통 버튼 컴포넌트
components > common > CTable.vue: 공통 테이블 컴포넌트


예시)
IndexPage.vue
ButtonPage.vue
UserRegistPopup.vue

```

