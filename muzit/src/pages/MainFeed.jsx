// pages/MainFeed.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorLink from "../components/AuthorLink";
import PostListItem from "../components/PostListItem";

function MainFeed({
  posts,
  subscriptions,
  toggleSubscription,
  collections,
  toggleCollection,
}) {
  const navigate = useNavigate();
  const [view, setView] = useState("list");

  return (
    <div>
      <div className='feed-banner'>
        <img src='/banner/banner.png' alt='배너' className='feed-banner-img' />
      </div>

      <div className='feed-header'>
        <h2>전체 작품</h2>
        <div className='view-toggle'>
          <button
            className={`view-btn ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
            title='리스트 보기'
          >
            ☰
          </button>
          <button
            className={`view-btn ${view === "grid" ? "active" : ""}`}
            onClick={() => setView("grid")}
            title='격자 보기'
          >
            ⊞
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className='post-grid'>
          {posts.map((post) => (
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
          {posts.map((post) => (
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

export default MainFeed;
