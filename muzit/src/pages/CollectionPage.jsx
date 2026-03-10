// pages/CollectionPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorLink from "../components/AuthorLink";
import PostListItem from "../components/PostListItem";

function CollectionPage({ posts, collections, toggleCollection, subscriptions, toggleSubscription }) {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const collectedPosts = posts.filter((p) => collections.has(p.id));

  return (
    <div>
      <div className='feed-header'>
        <h2>컬렉션</h2>
        <div className='view-toggle'>
          <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title='리스트 보기'>☰</button>
          <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title='격자 보기'>⊞</button>
        </div>
      </div>

      {collectedPosts.length === 0 ? (
        <p>아직 컬렉션에 추가한 작품이 없습니다. 작품 상세 페이지에서 ☆ 버튼을 눌러 추가해보세요.</p>
      ) : view === "grid" ? (
        <div className='post-grid'>
          {collectedPosts.map((post) => (
            <div key={post.id} className='post-card' onClick={() => navigate(`/post/${post.id}`)}>
              <img src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"} alt='cover' className='post-cover' />
              <h3>{post.title}</h3>
              <AuthorLink authorName={post.author} />
              <button className='btn-collection-remove' onClick={(e) => { e.stopPropagation(); toggleCollection(post.id); }}>
                컬렉션 제거
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {collectedPosts.map((post) => (
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

export default CollectionPage;
