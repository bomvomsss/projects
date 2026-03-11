// pages/CommunityPage.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthor } from "../data/authors";
import { formatDate } from "../utils/date";

const MAX_CHARS = 280;

function CommunityPost({ post, onLike, onRepost }) {
  const navigate = useNavigate();
  const author = getAuthor(post.author);

  return (
    <article className="cp-post">
      <button
        className="cp-avatar-btn"
        onClick={() => navigate(`/author/${encodeURIComponent(post.author)}`)}
      >
        <img src={author.avatar} alt={post.author} className="cp-avatar" />
      </button>

      <div className="cp-body">
        <div className="cp-header">
          <button
            className="cp-author-name"
            onClick={() => navigate(`/author/${encodeURIComponent(post.author)}`)}
          >
            {post.author}
          </button>
          <span className="cp-date">{formatDate(post.date)}</span>
        </div>

        <p className="cp-text">{post.content}</p>

        <div className="cp-actions">
          <button className="cp-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>{post.replies}</span>
          </button>

          <button
            className={`cp-action-btn ${post.reposted ? "active-green" : ""}`}
            onClick={() => onRepost(post.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            <span>{post.reposts}</span>
          </button>

          <button
            className={`cp-action-btn ${post.liked ? "active-red" : ""}`}
            onClick={() => onLike(post.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{post.likes}</span>
          </button>

          <button className="cp-action-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function CommunityPage({ communityPosts, addCommunityPost, toggleCommunityLike, toggleCommunityRepost }) {
  const me = getAuthor("my_account");
  const [text, setText] = useState("");

  const handlePost = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addCommunityPost(trimmed);
    setText("");
  };

  const remaining = MAX_CHARS - text.length;

  return (
    <div className="community-page">
      <h2 className="page-title">커뮤니티</h2>

      {/* 글쓰기 영역 */}
      <div className="cp-write">
        <img src={me.avatar} alt="me" className="cp-avatar" />
        <div className="cp-write-body">
          <textarea
            className="cp-write-input"
            placeholder="무슨 일이 일어나고 있나요?"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
            rows={3}
          />
          <div className="cp-write-footer">
            <span className={`cp-char-count ${remaining < 20 ? "warn" : ""}`}>
              {remaining}
            </span>
            <button
              className="btn-black cp-submit"
              onClick={handlePost}
              disabled={!text.trim()}
            >
              게시하기
            </button>
          </div>
        </div>
      </div>

      {/* 피드 */}
      <div className="cp-feed">
        {communityPosts.map((post) => (
          <CommunityPost
            key={post.id}
            post={post}
            onLike={toggleCommunityLike}
            onRepost={toggleCommunityRepost}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
