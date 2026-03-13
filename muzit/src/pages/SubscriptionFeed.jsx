// pages/SubscriptionFeed.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorLink from "../components/AuthorLink";
import PostListItem from "../components/PostListItem";
import { getAuthor } from "../data/authors";

function SubscriptionFeed({
  posts,
  subscriptions,
  toggleSubscription,
  collections,
  toggleCollection,
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("feed"); // "feed" | "channels"
  const [view, setView] = useState("list");
  const feed = posts.filter((p) => subscriptions.has(p.author));
  const subscribedAuthors = [...subscriptions];

  return (
    <div>
      {/* 탭 헤더 */}
      <div className='cg-tab-header'>
        <div className='cg-tabs'>
          <button
            className={`cg-tab ${tab === "feed" ? "active" : ""}`}
            onClick={() => setTab("feed")}
          >
            피드
          </button>
          <button
            className={`cg-tab ${tab === "channels" ? "active" : ""}`}
            onClick={() => setTab("channels")}
          >
            채널 <span className='cg-tab-count'>{subscriptions.size}</span>
          </button>
        </div>
        {/* 
        {tab === "feed" && (
          <div className='view-toggle'>
            <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title='리스트 보기'>☰</button>
            <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title='격자 보기'>⊞</button>
          </div>
        )} */}
      </div>

      {/* ── 피드 탭 ── */}
      {tab === "feed" &&
        (subscriptions.size === 0 ? (
          <p>구독 중인 작가가 없습니다.</p>
        ) : feed.length === 0 ? (
          <p>구독 중인 작가의 새 작품이 없습니다.</p>
        ) : view === "grid" ? (
          <div className='post-grid'>
            {feed.map((post) => (
              <div
                key={post.id}
                className='post-card'
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <img
                  src={
                    post.coverUrl ||
                    "https://via.placeholder.com/300x400.png?text=No+Cover"
                  }
                  alt='cover'
                  className='post-cover'
                />
                <h3>{post.title}</h3>
                <AuthorLink authorName={post.author} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {feed.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                subscriptions={subscriptions}
                toggleSubscription={toggleSubscription}
                collections={collections}
                toggleCollection={toggleCollection}
              />
            ))}
          </div>
        ))}

      {/* ── 채널 탭 ── */}
      {tab === "channels" &&
        (subscriptions.size === 0 ? (
          <p>구독 중인 채널이 없습니다.</p>
        ) : (
          <div className='channel-list'>
            {subscribedAuthors.map((name) => {
              const author = getAuthor(name);
              const postCount = posts.filter((p) => p.author === name).length;
              return (
                <div key={name} className='channel-item'>
                  <button
                    className='channel-info'
                    onClick={() =>
                      navigate(`/author/${encodeURIComponent(name)}`)
                    }
                  >
                    <img
                      src={author.avatar}
                      alt={name}
                      className='channel-avatar'
                    />
                    <div className='channel-text'>
                      <span className='channel-name'>{name}</span>
                      <span className='channel-count'>작품 {postCount}개</span>
                    </div>
                  </button>
                  <button
                    className='btn-subscribe active'
                    onClick={() => toggleSubscription(name)}
                  >
                    구독중
                  </button>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
}

export default SubscriptionFeed;
