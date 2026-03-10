// pages/MainFeed.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainFeed({ posts }) {
  const navigate = useNavigate();
  const [view, setView] = useState("list"); // "list" | "grid"

  return (
    <div>
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
            <div key={post.id} className='post-card' onClick={() => navigate(`/post/${post.id}`)}>
              <img
                src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"}
                alt='cover'
                className='post-cover'
              />
              <h3>{post.title}</h3>
              <p>{post.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className='post-list'>
          {posts.map((post) => (
            <div key={post.id} className='post-list-item' onClick={() => navigate(`/post/${post.id}`)}>
              <img
                src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"}
                alt='cover'
                className='post-list-cover'
              />
              <div className='post-list-info'>
                <h3>{post.title}</h3>
                <p className='post-list-author'>{post.author}</p>
                {post.tags && (
                  <p className='post-list-tags'>
                    {post.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t, i) => (
                      <span key={i} className='list-tag'>#{t}</span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainFeed;
