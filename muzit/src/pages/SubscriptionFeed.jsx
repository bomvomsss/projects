// pages/SubscriptionFeed.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorLink from "../components/AuthorLink";
import PostListItem from "../components/PostListItem";

function SubscriptionFeed({ posts, subscriptions, toggleSubscription, collections, toggleCollection }) {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const feed = posts.filter((p) => subscriptions.has(p.author));

  return (
    <div>
      <div className='feed-header'>
        <h2>구독 피드</h2>
        <div className='view-toggle'>
          <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title='리스트 보기'>☰</button>
          <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title='격자 보기'>⊞</button>
        </div>
      </div>

      {subscriptions.size === 0 ? (
        <p>구독 중인 작가가 없습니다. 작품 상세 페이지에서 작가를 구독해보세요.</p>
      ) : feed.length === 0 ? (
        <p>구독 중인 작가의 새 작품이 없습니다.</p>
      ) : view === "grid" ? (
        <div className='post-grid'>
          {feed.map((post) => (
            <div key={post.id} className='post-card' onClick={() => navigate(`/post/${post.id}`)}>
              <img src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"} alt='cover' className='post-cover' />
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
      )}
    </div>
  );
}

export default SubscriptionFeed;
