// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/global.css";

import MainFeed from "./pages/MainFeed";
import WritePage from "./pages/WritePage";
import PostDetail from "./pages/PostDetail";
import SubscriptionFeed from "./pages/SubscriptionFeed";
import CollectionPage from "./pages/CollectionPage";
import LibraryPage from "./pages/LibraryPage";
import NotificationPage from "./pages/NotificationPage";

function App() {
  // 초기 구독 작가: 김하늘, 박지수
  const [subscriptions, setSubscriptions] = useState(new Set(["김하늘", "박지수"]));
  // 초기 컬렉션: id 3(별이 지는 밤), id 5(MUZIT 히어로즈 1화)
  const [collections, setCollections] = useState(new Set([3, 5]));

  const toggleSubscription = (author) => {
    setSubscriptions((prev) => {
      const next = new Set(prev);
      next.has(author) ? next.delete(author) : next.add(author);
      return next;
    });
  };

  const toggleCollection = (postId) => {
    setCollections((prev) => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const [posts, setPosts] = useState([
    // ── 내 작품 (my_account) → 내 서재에 표시 ──────────────────
    { id: 1, title: "예시작품제목입니다", author: "my_account", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },
    { id: 2, title: "예시작품제목입니다", author: "my_account", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },

    // ── 김하늘 (구독 중 + 일부 컬렉션) ───────────────────────────
    { id: 3, title: "예시작품제목입니다", author: "김하늘", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },
    { id: 4, title: "예시작품제목입니다", author: "김하늘", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },

    // ── 박지수 (구독 중 + 컬렉션) ────────────────────────────────
    { id: 5, title: "예시작품제목입니다", author: "박지수", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },
    { id: 6, title: "예시작품제목입니다", author: "박지수", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },

    // ── 이준호 (구독 안 함) ───────────────────────────────────────
    { id: 7, title: "예시작품제목입니다", author: "이준호", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },
    { id: 8, title: "예시작품제목입니다", author: "이준호", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },

    // ── 최유리 (구독 안 함) ───────────────────────────────────────
    { id: 9, title: "예시작품제목입니다", author: "최유리", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },
    { id: 10, title: "예시작품제목입니다", author: "최유리", tags: "태그, 태그", content: "<p>예시 본문 내용입니다.</p>", coverUrl: "https://via.placeholder.com/300x400.png?text=COVER" },
  ]);

  const addPost = (newPost) => {
    setPosts([{ ...newPost, id: Date.now(), author: "my_account" }, ...posts]);
  };

  return (
    <Router>
      <div className='layout'>
        <aside className='sidebar'>
          <h1>
            <Link to='/'>MUZIT</Link>
          </h1>
          <nav className='nav-menu'>
            <Link to='/'>홈</Link>
            <Link to='/subscriptions'>구독</Link>
            <Link to='/collection'>컬렉션</Link>
            <Link to='/library'>내 서재</Link>
            <Link to='/notifications'>알림창</Link>
          </nav>
          <div style={{ marginTop: "3rem" }}>
            <Link to='/write' className='btn-black'>작품 올리기</Link>
          </div>
        </aside>

        <main className='main-content'>
          <Routes>
            <Route path='/' element={<MainFeed posts={posts} />} />
            <Route path='/subscriptions' element={<SubscriptionFeed posts={posts} subscriptions={subscriptions} />} />
            <Route path='/collection' element={<CollectionPage posts={posts} collections={collections} toggleCollection={toggleCollection} />} />
            <Route path='/library' element={<LibraryPage posts={posts} />} />
            <Route path='/notifications' element={<NotificationPage />} />
            <Route path='/write' element={<WritePage addPost={addPost} />} />
            <Route path='/post/:id' element={<PostDetail posts={posts} subscriptions={subscriptions} toggleSubscription={toggleSubscription} collections={collections} toggleCollection={toggleCollection} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
