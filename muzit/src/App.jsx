// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import "./styles/global.css";

import MainFeed from "./pages/MainFeed";
import WritePage from "./pages/WritePage";
import PostDetail from "./pages/PostDetail";
import SubscriptionFeed from "./pages/SubscriptionFeed";
import CollectionPage from "./pages/CollectionPage";
import LibraryPage from "./pages/LibraryPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationPage from "./pages/NotificationPage";
import AuthorProfile from "./pages/AuthorProfile";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";

function App() {
  // 초기 구독 작가: 김하늘, 박지수
  const [subscriptions, setSubscriptions] = useState(
    new Set(["김하늘", "박지수"]),
  );
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
    {
      id: 1,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "my_account",
      tags: "태그1, 태그2",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-03-10T09:30:00",
      views: 1243,
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "my_account",
      tags: "태그2, 태그3",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-03-09",
      views: 876,
      likes: 34,
      comments: 7,
    },

    // ── 김하늘 (구독 중 + 일부 컬렉션) ───────────────────────────
    {
      id: 3,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "김하늘",
      tags: "태그1, 태그3",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-03-08",
      views: 2100,
      likes: 89,
      comments: 21,
    },
    {
      id: 4,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "김하늘",
      tags: "태그1, 태그4",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-03-07",
      views: 543,
      likes: 27,
      comments: 5,
    },

    // ── 박지수 (구독 중 + 컬렉션) ────────────────────────────────
    {
      id: 5,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "박지수",
      tags: "태그3, 태그4",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-03-05",
      views: 3400,
      likes: 159,
      comments: 31,
    },
    {
      id: 6,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "박지수",
      tags: "태그2, 태그4",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-03-03",
      views: 1820,
      likes: 66,
      comments: 14,
    },

    // ── 이준호 (구독 안 함) ───────────────────────────────────────
    {
      id: 7,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "이준호",
      tags: "태그3, 태그4",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-02-28",
      views: 412,
      likes: 18,
      comments: 2,
    },
    {
      id: 8,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "이준호",
      tags: "태그3, 태그4",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-02-26",
      views: 990,
      likes: 45,
      comments: 9,
    },

    // ── 최유리 (구독 안 함) ───────────────────────────────────────
    {
      id: 9,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "최유리",
      tags: "태그1, 태그2",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-02-23",
      views: 234,
      likes: 8,
      comments: 1,
    },
    {
      id: 10,
      title: "게시물 제목이 들어갑니다.",
      subtitle: "부제목",
      author: "최유리",
      tags: "태그2, 태그4",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis mi vitae aliquet aliquet. Vivamus at bibendum erat. Quisque id faucibus ex, sed sodales purus. Nulla accumsan porttitor imperdiet. Nullam luctus magna id urna ornare euismod. Mauris interdum congue mi, at fermentum sapien rhoncus eget. Cras vitae purus ultricies, ultricies tellus in, porta turpis. Ut nec ligula sed eros auctor gravida in nec eros. Sed commodo arcu erat, quis lacinia nisi ornare in.</p>",
      coverUrl: "https://via.placeholder.com/300x400.png?text=COVER",
      date: "2026-02-18",
      views: 1560,
      likes: 73,
      comments: 17,
    },
  ]);

  const addPost = (newPost) => {
    setPosts([{ ...newPost, id: Date.now(), author: "my_account" }, ...posts]);
  };

  return (
    <Router>
      <Header />
      <div className='layout'>
        <aside className='sidebar'>
          <nav className='nav-menu'>
            <NavLink to='/' end>홈</NavLink>
            <NavLink to='/subscriptions'>구독</NavLink>
            <NavLink to='/collection'>컬렉션</NavLink>
            <NavLink to='/settings'>설정</NavLink>
          </nav>
          <div className='sidebar-cta'>
            <Link to='/write' className='btn-black'>
              작품 올리기
            </Link>
          </div>
        </aside>

        <main className='main-content'>
          <Routes>
            <Route path='/' element={<MainFeed posts={posts} subscriptions={subscriptions} toggleSubscription={toggleSubscription} collections={collections} toggleCollection={toggleCollection} />} />
            <Route
              path='/subscriptions'
              element={
                <SubscriptionFeed posts={posts} subscriptions={subscriptions} toggleSubscription={toggleSubscription} collections={collections} toggleCollection={toggleCollection} />
              }
            />
            <Route
              path='/collection'
              element={
                <CollectionPage
                  posts={posts}
                  collections={collections}
                  toggleCollection={toggleCollection}
                  subscriptions={subscriptions}
                  toggleSubscription={toggleSubscription}
                />
              }
            />
            <Route path='/library' element={<LibraryPage posts={posts} />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/search' element={<SearchPage posts={posts} subscriptions={subscriptions} toggleSubscription={toggleSubscription} collections={collections} toggleCollection={toggleCollection} />} />
            <Route path='/notifications' element={<NotificationPage />} />
            <Route path='/write' element={<WritePage addPost={addPost} />} />
            <Route
              path='/post/:id'
              element={
                <PostDetail
                  posts={posts}
                  subscriptions={subscriptions}
                  toggleSubscription={toggleSubscription}
                  collections={collections}
                  toggleCollection={toggleCollection}
                />
              }
            />
            <Route
              path='/author/:name'
              element={
                <AuthorProfile
                  posts={posts}
                  subscriptions={subscriptions}
                  toggleSubscription={toggleSubscription}
                  collections={collections}
                  toggleCollection={toggleCollection}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
