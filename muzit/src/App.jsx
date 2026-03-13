// src/App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import "./styles/global.css";

import MainFeed from "./pages/MainFeed";
import PostEditorPage from "./pages/PostEditorPage";
import PostDetail from "./pages/PostDetail";
import SubscriptionFeed from "./pages/SubscriptionFeed";
import CollectionPage from "./pages/CollectionPage";
import LibraryPage from "./pages/LibraryPage";
import SettingsPage from "./pages/SettingsPage";
import ChargePage from "./pages/settings/ChargePage";
import AccountPage from "./pages/settings/AccountPage";
import SupportPage from "./pages/settings/SupportPage";
import NotificationPage from "./pages/NotificationPage";
import AuthorProfile from "./pages/AuthorProfile";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import AdminNoticePage from "./pages/AdminNoticePage";
import CommunityPage from "./pages/CommunityPage";
import MyChannelPage from "./pages/MyChannelPage";
import RightSidebar from "./components/RightSidebar";
import {
  initialSubscriptions,
  initialCollections,
  initialCommunityPosts,
  initialCollectionGroups,
  initialCommentsMap,
} from "./data/dummy";
import { fetchPublicPosts } from "./api/posts";
import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement as updateAnnouncementApi,
  deleteAnnouncement as deleteAnnouncementApi,
} from "./api/announcements";

function App() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [collections, setCollections] = useState(initialCollections);

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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPublicPosts().then(setPosts).catch(console.error);
  }, []);

  const [menuConfig, setMenuConfig] = useState({
    subscriptions: true,
    collection: true,
    settings: true,
  });

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements().then(setAnnouncements).catch(console.error);
  }, []);

  const addAnnouncement = async ({ title, content = "" }) => {
    const created = await createAnnouncement({ title, content });
    setAnnouncements((prev) => [created, ...prev]);
  };

  const updateAnnouncement = async (id, { title, content }) => {
    const updated = await updateAnnouncementApi(id, { title, content });
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? updated : a)),
    );
  };

  const deleteAnnouncement = async (id) => {
    await deleteAnnouncementApi(id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const [communityPosts, setCommunityPosts] = useState(initialCommunityPosts);

  const addCommunityPost = (content) => {
    setCommunityPosts((prev) => [
      {
        id: Date.now(),
        author: "my_account",
        content,
        date: new Date().toISOString(),
        likes: 0,
        replies: 0,
        reposts: 0,
        liked: false,
        reposted: false,
      },
      ...prev,
    ]);
  };

  const toggleCommunityLike = (id) => {
    setCommunityPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  const toggleCommunityRepost = (id) => {
    setCommunityPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              reposted: !p.reposted,
              reposts: p.reposted ? p.reposts - 1 : p.reposts + 1,
            }
          : p,
      ),
    );
  };

  const [collectionGroups, setCollectionGroups] = useState(
    initialCollectionGroups,
  );

  const createCollectionGroup = (name) =>
    setCollectionGroups((prev) => [
      ...prev,
      { id: Date.now(), name, postIds: [] },
    ]);

  const deleteCollectionGroup = (id) =>
    setCollectionGroups((prev) => prev.filter((g) => g.id !== id));

  const renameCollectionGroup = (id, name) =>
    setCollectionGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, name } : g)),
    );

  const addPostToGroup = (groupId, postId) =>
    setCollectionGroups((prev) =>
      prev.map((g) =>
        g.id === groupId && !g.postIds.includes(postId)
          ? { ...g, postIds: [...g.postIds, postId] }
          : g,
      ),
    );

  const removePostFromGroup = (groupId, postId) =>
    setCollectionGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, postIds: g.postIds.filter((id) => id !== postId) }
          : g,
      ),
    );

  const [commentsMap, setCommentsMap] = useState(initialCommentsMap);

  const addComment = (postId, content) => {
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [
        ...(prev[postId] ?? []),
        {
          id: Date.now(),
          author: "my_account",
          date: new Date().toISOString(),
          content,
          likes: 0,
          replies: 0,
          liked: false,
        },
      ],
    }));
  };

  const toggleCommentLike = (postId, commentId) => {
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: (prev[postId] ?? []).map((c) =>
        c.id === commentId
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c,
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

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // 피드에 노출할 포스트: 임시저장·예약 미도달 제외
  const publicPosts = posts.filter(
    (p) => !p.isDraft && !(p.isScheduled && new Date(p.scheduledAt) > new Date())
  );

  return (
    <Router>
      <Header />
      <div className='layout'>
        <aside className='sidebar'>
          <nav className='nav-menu'>
            <NavLink to='/' end>
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive
                        ? "/icon/common/home_actived.svg"
                        : "/icon/common/home.svg"
                    }
                    alt=''
                    className='nav-icon'
                  />
                  홈
                </>
              )}
            </NavLink>
            {menuConfig.subscriptions && (
              <NavLink to='/subscriptions'>
                {({ isActive }) => (
                  <>
                    <img
                      src={
                        isActive
                          ? "/icon/common/subscribe_actived.svg"
                          : "/icon/common/subscribe.svg"
                      }
                      alt=''
                      className='nav-icon'
                    />
                    구독
                  </>
                )}
              </NavLink>
            )}
            {menuConfig.collection && (
              <NavLink to='/collection'>
                {({ isActive }) => (
                  <>
                    <img
                      src={
                        isActive
                          ? "/icon/common/bookmark_actived.svg"
                          : "/icon/common/bookmark.svg"
                      }
                      alt=''
                      className='nav-icon'
                    />
                    북마크
                  </>
                )}
              </NavLink>
            )}
            <NavLink to='/community'>
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive
                        ? "/icon/common/community_actived.svg"
                        : "/icon/common/community.svg"
                    }
                    alt=''
                    className='nav-icon'
                  />
                  커뮤니티
                </>
              )}
            </NavLink>
            {menuConfig.settings && (
              <NavLink to='/settings'>
                {({ isActive }) => (
                  <>
                    <img
                      src={
                        isActive
                          ? "/icon/common/setting_actived.svg"
                          : "/icon/common/setting.svg"
                      }
                      alt=''
                      className='nav-icon'
                    />
                    설정
                  </>
                )}
              </NavLink>
            )}
            <NavLink to='/my-channel'>
              {({ isActive }) => (
                <>
                  <img
                    src={
                      isActive
                        ? "/icon/common/personal_actived.svg"
                        : "/icon/common/personal.svg"
                    }
                    alt=''
                    className='nav-icon'
                  />
                  내 채널
                </>
              )}
            </NavLink>
          </nav>
          <div className='sidebar-cta'>
            <Link to='/write' className='btn-black'>
              작품 올리기
            </Link>
          </div>
          {/* <Link to='/admin' className='sidebar-admin-link'>
            관리자
          </Link> */}
        </aside>

        <main className='main-content'>
          <Routes>
            <Route
              path='/'
              element={
                <div className='page-with-right-sidebar'>
                  <MainFeed
                    posts={publicPosts}
                    subscriptions={subscriptions}
                    toggleSubscription={toggleSubscription}
                    collections={collections}
                    toggleCollection={toggleCollection}
                  />
                  <RightSidebar announcements={announcements} />
                </div>
              }
            />
            <Route
              path='/subscriptions'
              element={
                <div className='page-with-right-sidebar'>
                  <SubscriptionFeed
                    posts={publicPosts}
                    subscriptions={subscriptions}
                    toggleSubscription={toggleSubscription}
                    collections={collections}
                    toggleCollection={toggleCollection}
                  />
                  <RightSidebar announcements={announcements} />
                </div>
              }
            />
            <Route
              path='/collection'
              element={
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
                  <RightSidebar announcements={announcements} />
                </div>
              }
            />
            <Route path='/library' element={<LibraryPage posts={posts} />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/settings/charge' element={<ChargePage />} />
            <Route path='/settings/account' element={<AccountPage />} />
            <Route path='/settings/support' element={<SupportPage />} />
            <Route
              path='/search'
              element={
                <SearchPage
                  posts={publicPosts}
                  subscriptions={subscriptions}
                  toggleSubscription={toggleSubscription}
                  collections={collections}
                  toggleCollection={toggleCollection}
                />
              }
            />
            <Route path='/notifications' element={<NotificationPage />} />
            <Route
              path='/community'
              element={
                <div className='page-with-right-sidebar'>
                  <CommunityPage
                    communityPosts={communityPosts}
                    addCommunityPost={addCommunityPost}
                    toggleCommunityLike={toggleCommunityLike}
                    toggleCommunityRepost={toggleCommunityRepost}
                  />
                  <RightSidebar announcements={announcements} />
                </div>
              }
            />
            <Route
              path='/my-channel'
              element={
                <MyChannelPage
                  posts={posts}
                  deletePost={deletePost}
                  subscriptions={subscriptions}
                />
              }
            />
            <Route path='/write' element={<PostEditorPage posts={posts} addPost={addPost} updatePost={updatePost} />} />
            <Route path='/edit/:id' element={<PostEditorPage posts={posts} addPost={addPost} updatePost={updatePost} />} />
            <Route
              path='/admin'
              element={
                <AdminPage
                  menuConfig={menuConfig}
                  setMenuConfig={setMenuConfig}
                  announcements={announcements}
                  deleteAnnouncement={deleteAnnouncement}
                />
              }
            />
            <Route
              path='/admin/notice/new'
              element={
                <AdminNoticePage
                  announcements={announcements}
                  addAnnouncement={addAnnouncement}
                  updateAnnouncement={updateAnnouncement}
                />
              }
            />
            <Route
              path='/admin/notice/edit/:id'
              element={
                <AdminNoticePage
                  announcements={announcements}
                  addAnnouncement={addAnnouncement}
                  updateAnnouncement={updateAnnouncement}
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
