# MUZIT — 프로젝트 개요

창작자를 위한 작품 발행 및 감상 플랫폼.
소설·만화 등 다양한 창작물을 올리고, 독자가 읽고 즐길 수 있는 공간.

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | React 19 + Vite 7 |
| 라우팅 | React Router DOM v7 |
| 에디터 | Tiptap v3 (ProseMirror 기반 리치 텍스트 에디터) |
| 스타일 | 순수 CSS (rem 없이 px 단위 통일, 인라인 스타일 없음) |
| 패키지 매니저 | npm |

---

## 프로젝트 구조

```
muzit/
├── public/
├── src/
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── MainFeed.jsx          # 홈 — 전체 작품 피드
│   │   ├── SubscriptionFeed.jsx  # 구독 피드
│   │   ├── CollectionPage.jsx    # 컬렉션
│   │   ├── AuthorProfile.jsx     # 작가 프로필
│   │   ├── PostDetail.jsx        # 작품 상세
│   │   ├── WritePage.jsx         # 작품 작성 에디터
│   │   ├── SearchPage.jsx        # 검색 결과
│   │   ├── NotificationPage.jsx  # 알림창 (플레이스홀더)
│   │   ├── SettingsPage.jsx      # 설정 (플레이스홀더)
│   │   └── LibraryPage.jsx       # 내 서재 (라우트 유지, 미링크)
│   │
│   ├── components/             # 재사용 UI 컴포넌트
│   │   ├── Header.jsx            # 상단 헤더 (로고, 검색창, 알림, 프로필)
│   │   ├── PostListItem.jsx      # 리스트형 작품 카드
│   │   ├── AuthorLink.jsx        # 아바타+이름 작가 링크
│   │   ├── EditorToolbar.jsx     # 에디터 툴바
│   │   └── WordCount.jsx         # 글자 수 카운터
│   │
│   ├── data/
│   │   └── authors.js            # 작가 정적 데이터 (이름, 아바타, 소개)
│   │
│   ├── utils/
│   │   └── date.js               # 날짜 포맷 유틸 (N일 전 / YYYY.MM.DD)
│   │
│   ├── styles/
│   │   ├── global.css            # 전역 레이아웃·공통 컴포넌트 스타일
│   │   └── editor.css            # 에디터 전용 스타일
│   │
│   ├── App.jsx                 # 라우팅 + 전역 상태 (posts, subscriptions, collections)
│   └── main.jsx
├── vite.config.js              # css.devSourcemap: true
└── package.json
```

---

## 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────┐
│  상단 헤더 (sticky)                                          │
│  MUZIT     [검색창]          🔔  [내 프로필 아바타]          │
├──────────────┬──────────────────────────────────────────────┤
│  사이드바    │  메인 콘텐츠                                  │
│  (200px)     │                                              │
│  홈          │  <Route에 따라 페이지 렌더링>                 │
│  구독        │                                              │
│  컬렉션      │                                              │
│  설정        │                                              │
│              │                                              │
│  [작품올리기]│                                              │
└──────────────┴──────────────────────────────────────────────┘
```

---

## 라우트 목록

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | MainFeed | 전체 작품 피드 |
| `/subscriptions` | SubscriptionFeed | 구독 중인 작가의 작품 |
| `/collection` | CollectionPage | 북마크한 작품 모음 |
| `/search?q=...` | SearchPage | 검색 결과 |
| `/post/:id` | PostDetail | 작품 상세 열람 |
| `/write` | WritePage | 작품 작성 에디터 |
| `/author/:name` | AuthorProfile | 작가 프로필 + 작품 목록 |
| `/notifications` | NotificationPage | 알림창 (플레이스홀더) |
| `/settings` | SettingsPage | 설정 (플레이스홀더) |
| `/library` | LibraryPage | 내 서재 (라우트 유지, 사이드바 미링크) |

---

## 주요 기능

### 피드 (홈 / 구독 / 컬렉션)
- **리스트 / 격자 보기 토글** (기본: 리스트)
- **리스트 카드 구성**: 프로필 아바타 · 작가명 · 날짜·채널 · 구독 버튼 · 제목 · 부제목 · 본문 미리보기 · 태그 · 조회수 · 좋아요 · 댓글 · 북마크(컬렉션 토글) · 공유
- 현재 페이지가 사이드바 nav에서 **볼드체**로 표시됨 (NavLink active)

### 검색 `/search?q=...`
- 헤더 중앙 검색창에서 Enter / 돋보기 클릭으로 이동
- **작품명, 작가명, 태그, 본문 내용** 통합 검색 (대소문자 무관)
- 결과를 리스트 카드 형태로 표시

### 작품 상세 `/post/:id`
- 제목 · 부제목 · 작가명+아바타(링크) · 날짜 · 구독 버튼
- HTML 콘텐츠 렌더링
- **★ 컬렉션** 토글 버튼 (제목 옆)

### 작가 프로필 `/author/:name`
- 아바타 · 이름 · 소개 · 작품 수 · 구독 토글 버튼
- 해당 작가의 작품 목록 (리스트 / 격자 토글, 기본: 리스트)
- 내 프로필(`my_account`)은 상단 헤더 아바타 클릭으로 접근

### 작품 작성 `/write`
- Tiptap 기반 리치 텍스트 에디터
- 툴바: 굵게·기울임·밑줄·취소선·인라인코드 / H1·H2·H3 / 목록·인용구·코드블록 / 정렬 / 링크·이미지 삽입 / 구분선·실행취소
- 글자 수 · 단어 수 실시간 카운터
- 태그 · 전체 공개 · 댓글 허용 설정

### 상단 헤더
- 로고 · 검색창 · 알림벨(→ `/notifications`) · 내 프로필 아바타(→ `/author/my_account`)

---

## 데이터 구조

현재는 React `useState`로 인메모리 관리 (새로고침 시 초기화).

```js
// 작품(Post) 객체
{
  id: number,
  title: string,
  subtitle: string,
  author: string,        // 발행 시 "my_account" 고정
  content: string,       // Tiptap이 생성한 HTML
  coverUrl: string,
  tags: string,          // 쉼표 구분 (예: "판타지, 소설")
  date: string,          // ISO 날짜 문자열 (예: "2026-03-08")
  views: number,
  likes: number,
  comments: number,
  isPublic: boolean,
  allowComments: boolean,
}

// 전역 상태 (App.jsx)
subscriptions: Set<string>   // 구독 중인 작가명
collections: Set<number>     // 컬렉션에 추가된 post id
```

```js
// 작가(Author) 객체 — src/data/authors.js
{
  name: string,
  avatar: string,   // 이미지 URL
  bio: string,
}
```

---

## 날짜 표시 규칙 (`src/utils/date.js`)

| 경과 시간 | 표시 형식 |
|-----------|-----------|
| 1분 미만 | 방금 전 |
| 1시간 미만 | N분 전 |
| 24시간 미만 | N시간 전 |
| 7일 이하 | N일 전 |
| 8일 이상 | YYYY.MM.DD |

---

## 개발 서버 실행

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## 향후 개선 과제

- [ ] 백엔드/DB 연동 (현재 인메모리)
- [ ] 회원가입 / 로그인 (현재 작성자 고정)
- [ ] 이미지 직접 업로드 (현재 URL 입력만 지원)
- [ ] 작품 수정 / 삭제 기능
- [ ] 댓글 기능 구현
- [ ] 알림 기능 구현
- [ ] 설정 항목 구현
- [ ] 반응형 모바일 레이아웃
- [ ] 좋아요 기능 (현재 카운트만 표시)
- [ ] 조회수 실시간 집계
