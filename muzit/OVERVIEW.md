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
| 백엔드 | Supabase (PostgreSQL + REST API) |
| 패키지 매니저 | npm |
| 배포 | Vercel (vercel.json SPA 라우팅 설정) |

---

## 프로젝트 구조

```
muzit/
├── public/
│   └── icon/common/        # SVG 아이콘 모음
├── src/
│   ├── api/                # Supabase API 레이어
│   │   ├── supabase.js       # Supabase 클라이언트 초기화
│   │   ├── posts.js          # 작품 CRUD (fetchPublicPosts 등)
│   │   └── announcements.js  # 공지사항 CRUD
│   │
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── MainFeed.jsx          # 홈 — 전체 작품 피드
│   │   ├── SubscriptionFeed.jsx  # 구독 피드 + 구독 채널 목록
│   │   ├── CollectionPage.jsx    # 북마크 + 컬렉션 그룹 관리
│   │   ├── CommunityPage.jsx     # 커뮤니티 (트위터 레이아웃)
│   │   ├── AuthorProfile.jsx     # 작가 프로필 + 작품 목록
│   │   ├── PostDetail.jsx        # 작품 상세 + 댓글
│   │   ├── PostEditorPage.jsx    # 작품 작성(/write) + 수정(/edit/:id) 통합
│   │   ├── MyChannelPage.jsx     # 내 채널 대시보드 + 작품 관리
│   │   ├── SearchPage.jsx        # 검색 결과
│   │   ├── AdminPage.jsx         # 관리자 — 메뉴·사용자·공지사항 관리
│   │   ├── AdminNoticePage.jsx   # 공지사항 작성/수정 에디터
│   │   ├── SettingsPage.jsx      # 설정 목록
│   │   ├── settings/
│   │   │   ├── ChargePage.jsx      # 포인트 충전
│   │   │   ├── AccountPage.jsx     # 계정 설정
│   │   │   └── SupportPage.jsx     # 고객센터
│   │   ├── NotificationPage.jsx  # 알림 (플레이스홀더)
│   │   └── LibraryPage.jsx       # 내 서재 (라우트 유지, 사이드바 미링크)
│   │
│   ├── components/         # 재사용 UI 컴포넌트
│   │   ├── Header.jsx            # 상단 헤더 (로고, 검색창, 알림 드롭다운, 프로필 드롭다운)
│   │   ├── RightSidebar.jsx      # 우측 사이드바 (공지사항, 실시간 검색순위)
│   │   ├── PostListItem.jsx      # 리스트형 작품 카드
│   │   ├── AuthorLink.jsx        # 아바타+이름 작가 링크
│   │   ├── EditorToolbar.jsx     # 에디터 툴바
│   │   └── WordCount.jsx         # 글자 수 카운터
│   │
│   ├── data/
│   │   ├── authors.js            # 작가 정적 데이터 (localStorage 오버라이드 지원)
│   │   └── dummy.js              # 더미 시드 데이터 (구독, 컬렉션, 커뮤니티 등 아직 미연동 항목)
│   │
│   ├── utils/
│   │   └── date.js               # 날짜 포맷 유틸 (N일 전 / YYYY.MM.DD)
│   │
│   ├── styles/
│   │   ├── global.css            # 전역 레이아웃·공통 컴포넌트 스타일
│   │   └── editor.css            # 에디터 전용 스타일
│   │
│   ├── App.jsx             # 라우팅 + 전역 상태
│   └── main.jsx
├── vite.config.js          # css.devSourcemap: true
├── vercel.json             # SPA 라우팅 rewrites
└── package.json
```

---

## 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────────────┐
│  상단 헤더 (sticky)                                                   │
│  MUZIT     [검색창 + 최근검색어 드롭다운]    🔔(드롭다운)  [아바타]   │
├──────────────┬───────────────────────────────────┬───────────────────┤
│  좌측        │  메인 콘텐츠                       │  우측 사이드바    │
│  사이드바    │                                   │  (홈/구독/북마크/ │
│  (200px)     │  <Route에 따라 페이지 렌더링>      │   커뮤니티 한정)  │
│              │                                   │                   │
│  홈          │                                   │  공지사항         │
│  구독        │                                   │  실시간 검색순위  │
│  북마크      │                                   │                   │
│  커뮤니티    │                                   │                   │
│  설정        │                                   │                   │
│  내 채널     │                                   │                   │
│              │                                   │                   │
│  [작품올리기]│                                   │                   │
└──────────────┴───────────────────────────────────┴───────────────────┘
```

---

## 라우트 목록

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | MainFeed | 전체 작품 피드 (이미지 배너 포함) |
| `/subscriptions` | SubscriptionFeed | 구독 중인 작가의 작품 + 구독 채널 목록 |
| `/collection` | CollectionPage | 북마크 작품 목록 + 컬렉션 그룹 관리 |
| `/community` | CommunityPage | 커뮤니티 피드 (트위터 레이아웃) |
| `/search?q=...` | SearchPage | 검색 결과 |
| `/post/:id` | PostDetail | 작품 상세 열람 + 댓글 |
| `/write` | PostEditorPage | 작품 작성 에디터 |
| `/edit/:id` | PostEditorPage | 작품 수정 에디터 |
| `/my-channel` | MyChannelPage | 내 채널 대시보드 + 발행/임시저장 관리 |
| `/author/:name` | AuthorProfile | 작가 프로필 + 작품 목록 |
| `/settings` | SettingsPage | 설정 메뉴 |
| `/settings/charge` | ChargePage | 포인트 충전 |
| `/settings/account` | AccountPage | 계정 설정 |
| `/settings/support` | SupportPage | 고객센터 |
| `/admin` | AdminPage | 관리자 페이지 |
| `/admin/notice/new` | AdminNoticePage | 공지사항 작성 |
| `/admin/notice/edit/:id` | AdminNoticePage | 공지사항 수정 |
| `/notifications` | NotificationPage | 알림 (플레이스홀더) |
| `/library` | LibraryPage | 내 서재 (라우트 유지, 미링크) |

---

## 주요 기능

### 상단 헤더 (`Header.jsx`)
- **검색창**: 포커스 시 최근 검색어 드롭다운 표시 (localStorage 저장, 항목 삭제/전체삭제)
- **알림 드롭다운**: 벨 아이콘 클릭 → 알림 목록, 읽음/미읽음 구분, 모두 읽음 처리
- **프로필 드롭다운**: 내 프로필 / 포인트 충전 / 계정 설정 / 고객센터 / 로그아웃

### 피드 (홈 / 구독)
- **리스트 / 격자 보기 토글** (기본: 리스트)
- **리스트 카드 구성**: 프로필 아바타 · 작가명 · 날짜 · 구독 버튼 · 더보기(···) · 제목 · 부제목 · 본문 미리보기 · 태그 · 조회수 · 좋아요 · 댓글 · 북마크 토글(☆/★) · 공유
- 홈 최상단 가로 배너 이미지
- 현재 페이지가 좌측 사이드바 nav에서 **활성 아이콘 + 볼드** 표시 (NavLink active)

### 북마크 (`/collection`)
- **전체 북마크 탭**: 북마크된 작품 목록 (간략 카드 형태)
- **컬렉션 탭**: 그룹 생성/삭제/이름변경, 작품을 그룹에 추가/제거
- 그룹 상세 → 리스트 형태로 작품 표시 (토글 없음)

### 구독 페이지 (`/subscriptions`)
- 구독 중인 채널 목록 (아바타 + 이름 + 구독 해제 버튼)
- 구독한 작가의 작품만 필터링된 피드

### 커뮤니티 (`/community`)
- 글 작성 영역 (내 아바타 + textarea + 게시 버튼)
- 포스트 목록: 아바타 · 작가명 · 시간 · 내용 · 좋아요/리포스트/공유 버튼

### 작품 상세 (`/post/:id`)
- HTML 콘텐츠 렌더링, 태그, 작가 링크, 구독 버튼
- **댓글**: 작성 영역 + 최신순/오래된순 정렬 토글 + 좋아요 버튼

### 작품 에디터 (`/write`, `/edit/:id`) — `PostEditorPage.jsx`
- **작성 모드 (`/write`)**: 임시저장(localStorage), 업로드 예약(datetime-local), 미리보기 모달
- **수정 모드 (`/edit/:id`)**: 기존 내용 불러오기, 재발행 시 날짜 유지/새로발행 선택 모달
- 공통: 제목·표지URL·Tiptap 에디터·태그·전체공개·댓글허용·성인작품·유료결제 설정

### 내 채널 (`/my-channel`)
- 대시보드: 총 게시물 수, 총 조회수/좋아요/댓글, 구독자 수
- 탭: **발행됨** / **임시저장** — 각 작품에 수정(→ `/edit/:id`) · 삭제 버튼

### 관리자 페이지 (`/admin`)
- **메뉴 관리**: 구독/북마크/설정 메뉴 토글 스위치 (menuConfig)
- **사용자 관리**: 작가 정보 수정 (localStorage 오버라이드로 반영)
- **공지사항 관리**: 목록 + 수정/삭제, 작성 버튼 → `/admin/notice/new`

---

## 데이터 연동 현황

### Supabase 연동 완료 항목
| 항목 | API 파일 | 상태 |
|------|----------|------|
| 작품(posts) 조회 | `src/api/posts.js` | ✅ fetchPublicPosts |
| 공지사항 조회/추가/수정/삭제 | `src/api/announcements.js` | ✅ CRUD 완료 |

### 아직 더미 데이터 / 인메모리 상태인 항목
| 항목 | 위치 | 비고 |
|------|------|------|
| 구독(subscriptions) | `App.jsx` useState | `src/data/dummy.js`에서 초기값 |
| 북마크(collections) | `App.jsx` useState | `src/data/dummy.js`에서 초기값 |
| 커뮤니티 게시물 | `App.jsx` useState | `src/data/dummy.js`에서 초기값 |
| 컬렉션 그룹 | `App.jsx` useState | `src/data/dummy.js`에서 초기값 |
| 댓글(commentsMap) | `App.jsx` useState | `src/data/dummy.js`에서 초기값 |
| 작품 추가/수정/삭제 | `App.jsx` useState | Supabase 쓰기 미구현 |
| 작가 정보 | `src/data/authors.js` | 정적 파일 + localStorage 오버라이드 |
| 알림 | `Header.jsx` | SAMPLE_NOTIFICATIONS 하드코딩 |

### 환경 변수 (`.env`)
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

---

## 데이터 구조

```js
// 작품(Post) 객체
{
  id: number,
  title: string,
  subtitle: string,
  author: string,          // 발행 시 "my_account" 고정
  content: string,         // Tiptap이 생성한 HTML
  coverUrl: string,
  tags: string,            // 쉼표 구분 (예: "판타지, 소설")
  date: string,            // ISO 날짜 문자열
  views: number,
  likes: number,
  comments: number,
  isPublic: boolean,
  allowComments: boolean,
  isAdult: boolean,
  isPaid: boolean,
  isDraft: boolean,
  isScheduled: boolean,
  scheduledAt: string,     // ISO 날짜 문자열 (예약 발행 시)
}

// 공지사항(Announcement) 객체
{
  id: number,
  title: string,
  content: string,         // HTML
  date: string,            // YYYY-MM-DD
}

// 작가(Author) 객체 — src/data/authors.js
{
  name: string,
  avatar: string,          // 이미지 URL
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
cd muzit
npm install
npm run dev
# → http://localhost:5173
```

---

## 향후 개선 과제

- [ ] 작품 작성/수정/삭제 Supabase 연동
- [ ] 구독, 북마크, 댓글, 커뮤니티 Supabase 연동
- [ ] 회원가입 / 로그인 (Supabase Auth)
- [ ] 이미지 직접 업로드 (Supabase Storage)
- [ ] 좋아요 기능 (현재 카운트만 표시)
- [ ] 조회수 실시간 집계
- [ ] 알림 기능 (Supabase Realtime)
- [ ] 설정 하위 페이지 실제 기능 구현
- [ ] 반응형 모바일 레이아웃
