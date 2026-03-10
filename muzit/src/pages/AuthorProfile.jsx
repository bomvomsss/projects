// pages/AuthorProfile.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthor } from "../data/authors";
import PostListItem from "../components/PostListItem";
import AuthorLink from "../components/AuthorLink";

function AuthorProfile({ posts, subscriptions, toggleSubscription, collections, toggleCollection }) {
  const { name } = useParams();
  const authorName = decodeURIComponent(name);
  const navigate = useNavigate();
  const [view, setView] = useState("list");

  const author = getAuthor(authorName);
  const authorPosts = posts.filter((p) => p.author === authorName);
  const isSubscribed = subscriptions.has(authorName);

  return (
    <div className='author-profile'>
      <button className='btn-back' onClick={() => navigate(-1)}>←</button>

      <div className='author-profile-header'>
        <img src={author.avatar} alt={authorName} className='author-profile-avatar' />
        <div className='author-profile-info'>
          <h2 className='author-profile-name'>{authorName}</h2>
          <p className='author-profile-bio'>{author.bio}</p>
          <p className='author-profile-count'>작품 {authorPosts.length}개</p>
        </div>
        {authorName !== "my_account" && (
          <button
            className={`btn-subscribe ${isSubscribed ? "active" : ""}`}
            onClick={() => toggleSubscription(authorName)}
          >
            {isSubscribed ? "구독중" : "구독"}
          </button>
        )}
      </div>

      <div className='author-profile-posts'>
        <div className='feed-header'>
          <h3>작품 목록</h3>
          <div className='view-toggle'>
            <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")} title='리스트 보기'>☰</button>
            <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")} title='격자 보기'>⊞</button>
          </div>
        </div>

        {authorPosts.length === 0 ? (
          <p>아직 작품이 없습니다.</p>
        ) : view === "grid" ? (
          <div className='post-grid'>
            {authorPosts.map((post) => (
              <div key={post.id} className='post-card' onClick={() => navigate(`/post/${post.id}`)}>
                <img
                  src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"}
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
            {authorPosts.map((post) => (
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
    </div>
  );
}

export default AuthorProfile;
