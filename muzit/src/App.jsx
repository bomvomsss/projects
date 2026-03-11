// src/App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
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
import EditPage from "./pages/EditPage";
import AdminPage from "./pages/AdminPage";
import CommunityPage from "./pages/CommunityPage";
import RightSidebar from "./components/RightSidebar";

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

  const [menuConfig, setMenuConfig] = useState({
    subscriptions: true,
    collection: true,
    settings: true,
  });

  const [communityPosts, setCommunityPosts] = useState([
    { id: 1, author: "김하늘",   content: "오늘 새 챕터 올렸어요! 많이 읽어주세요 🙏", date: "2026-03-10T08:00:00", likes: 24, replies: 5, reposts: 3, liked: false, reposted: false },
    { id: 2, author: "박지수",   content: "글 쓰다가 막혔을 때 어떻게들 극복하세요? 저는 산책이 최고인 것 같아요", date: "2026-03-09T14:30:00", likes: 41, replies: 12, reposts: 6, liked: false, reposted: false },
    { id: 3, author: "이준호",   content: "독자 여러분 덕분에 구독자 1000명 달성했습니다!! 감사합니다 🎉", date: "2026-03-08T20:00:00", likes: 198, replies: 33, reposts: 27, liked: false, reposted: false },
    { id: 4, author: "최유리",   content: "요즘 글쓰기 슬럼프인데 다들 어떤 글을 읽고 싶으세요?", date: "2026-03-07T11:00:00", likes: 15, replies: 8, reposts: 1, liked: false, reposted: false },
    { id: 5, author: "김하늘",   content: "연재 잠시 쉬어갑니다. 더 좋은 이야기로 돌아올게요!", date: "2026-03-05T09:00:00", likes: 56, replies: 14, reposts: 4, liked: false, reposted: false },
  ]);

  const addCommunityPost = (content) => {
    setCommunityPosts((prev) => [
      { id: Date.now(), author: "my_account", content, date: new Date().toISOString(), likes: 0, replies: 0, reposts: 0, liked: false, reposted: false },
      ...prev,
    ]);
  };

  const toggleCommunityLike = (id) => {
    setCommunityPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const toggleCommunityRepost = (id) => {
    setCommunityPosts((prev) => prev.map((p) =>
      p.id === id ? { ...p, reposted: !p.reposted, reposts: p.reposted ? p.reposts - 1 : p.reposts + 1 } : p
    ));
  };

  const [collectionGroups, setCollectionGroups] = useState([
    { id: 1, name: "읽고 싶은 작품", postIds: [3, 7] },
    { id: 2, name: "나중에 읽기",   postIds: [5]    },
  ]);

  const createCollectionGroup = (name) =>
    setCollectionGroups((prev) => [...prev, { id: Date.now(), name, postIds: [] }]);

  const deleteCollectionGroup = (id) =>
    setCollectionGroups((prev) => prev.filter((g) => g.id !== id));

  const renameCollectionGroup = (id, name) =>
    setCollectionGroups((prev) => prev.map((g) => g.id === id ? { ...g, name } : g));

  const addPostToGroup = (groupId, postId) =>
    setCollectionGroups((prev) => prev.map((g) =>
      g.id === groupId && !g.postIds.includes(postId)
        ? { ...g, postIds: [...g.postIds, postId] }
        : g
    ));

  const removePostFromGroup = (groupId, postId) =>
    setCollectionGroups((prev) => prev.map((g) =>
      g.id === groupId ? { ...g, postIds: g.postIds.filter((id) => id !== postId) } : g
    ));

  const [commentsMap, setCommentsMap] = useState({
    3: [
      { id: 1, author: "박지수",   date: "2026-03-09T10:00:00", content: "정말 재미있게 읽었어요! 다음 화도 기대됩니다.",      likes: 8,  replies: 2, liked: false },
      { id: 2, author: "이준호",   date: "2026-03-09T14:30:00", content: "문장이 정말 아름답네요. 계속 연재해 주세요!",        likes: 5,  replies: 0, liked: false },
      { id: 3, author: "my_account", date: "2026-03-10T08:00:00", content: "저도 정독했어요. 감동적이었습니다.",              likes: 3,  replies: 1, liked: false },
    ],
    5: [
      { id: 1, author: "김하늘",   date: "2026-03-08T09:00:00", content: "1화부터 흡입력이 장난 아닌데요?",                  likes: 12, replies: 3, liked: false },
      { id: 2, author: "최유리",   date: "2026-03-08T11:00:00", content: "주인공 캐릭터 너무 매력적이에요!",                 likes: 7,  replies: 1, liked: false },
    ],
  });

  const addComment = (postId, content) => {
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] ?? []),
        { id: Date.now(), author: "my_account", date: new Date().toISOString(), content, likes: 0, replies: 0, liked: false },
      ],
    }));
  };

  const toggleCommentLike = (postId, commentId) => {
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? []).map((c) =>
        c.id === commentId ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 } : c
      ),
    }));
  };

  const addPost = (newPost) => {
    setPosts([{ ...newPost, id: Date.now(), author: "my_account" }, ...posts]);
  };

  const updatePost = (id, updatedData) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
    );
  };

  return (
    <Router>
      <Header />
      <div className='layout'>
        <aside className='sidebar'>
          <nav className='nav-menu'>
            <NavLink to='/' end>
              홈
            </NavLink>
            {menuConfig.subscriptions && (
              <NavLink to='/subscriptions'>구독</NavLink>
            )}
            {menuConfig.collection && (
              <NavLink to='/collection'>북마크</NavLink>
            )}
            <NavLink to='/community'>커뮤니티</NavLink>
          </nav>
          <div className='sidebar-cta'>
            <Link to='/write' className='btn-black'>
              작품 올리기
            </Link>
          </div>
          <Link to='/admin' className='sidebar-admin-link'>
            관리자
          </Link>
        </aside>

        <main className='main-content'>
          <Routes>
            <Route path='/' element={
                <div className='page-with-right-sidebar'>
                  <MainFeed posts={posts} subscriptions={subscriptions} toggleSubscription={toggleSubscription} collections={collections} toggleCollection={toggleCollection} />
                  <RightSidebar />
                </div>
              }
            />
            <Route path='/subscriptions' element={
                <div className='page-with-right-sidebar'>
                  <SubscriptionFeed posts={posts} subscriptions={subscriptions} toggleSubscription={toggleSubscription} collections={collections} toggleCollection={toggleCollection} />
                  <RightSidebar />
                </div>
              }
            />
            <Route path='/collection' element={
                <div className='page-with-right-sidebar'>
                  <CollectionPage
                    posts={posts}
                    collections={collections}
                    toggleCollection={toggleCollection}
                    subscriptions={subscriptions}
                    toggleSubscription={toggleSubscription}
                    collectionGroups={collectionGroups}
                    createCollectionGroup={createCollectionGroup}
                    deleteCollectionGroup={deleteCollectionGroup}
                    renameCollectionGroup={renameCollectionGroup}
                    addPostToGroup={addPostToGroup}
                    removePostFromGroup={removePostFromGroup}
                  />
                  <RightSidebar />
                </div>
              }
            />
            <Route path='/library' element={<LibraryPage posts={posts} />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route
              path='/search'
              element={
                <SearchPage
                  posts={posts}
                  subscriptions={subscriptions}
                  toggleSubscription={toggleSubscription}
                  collections={collections}
                  toggleCollection={toggleCollection}
                />
              }
            />
            <Route path='/notifications' element={<NotificationPage />} />
            <Route path='/community' element={
                <div className='page-with-right-sidebar'>
                  <CommunityPage communityPosts={communityPosts} addCommunityPost={addCommunityPost} toggleCommunityLike={toggleCommunityLike} toggleCommunityRepost={toggleCommunityRepost} />
                  <RightSidebar />
                </div>
              }
            />
            <Route path='/write' element={<WritePage addPost={addPost} />} />
            <Route
              path='/edit/:id'
              element={<EditPage posts={posts} updatePost={updatePost} />}
            />
            <Route
              path='/admin'
              element={
                <AdminPage
                  menuConfig={menuConfig}
                  setMenuConfig={setMenuConfig}
                />
              }
            />
            <Route
              path='/post/:id'
              element={
                <PostDetail
                  posts={posts}
                  subscriptions={subscriptions}
                  toggleSubscription={toggleSubscription}
                  collections={collections}
                  toggleCollection={toggleCollection}
                  commentsMap={commentsMap}
                  addComment={addComment}
                  toggleCommentLike={toggleCommentLike}
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
