// pages/PostDetail.jsx
import { useParams, useNavigate } from "react-router-dom";

function PostDetail({ posts, subscriptions, toggleSubscription, collections, toggleCollection }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>게시글을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate("/")} className='btn-black'>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className='post-detail'>
      <button
        onClick={() => navigate(-1)}
        style={{ background: "none", border: "none", cursor: "pointer", marginBottom: "2rem", padding: 0, fontWeight: "bold" }}
      >
        ← 목록으로
      </button>

      <div className='post-detail-header'>
        <div className='post-title-row'>
          <h1>{post.title}</h1>
          <button
            className={`btn-collection ${collections.has(post.id) ? "active" : ""}`}
            onClick={() => toggleCollection(post.id)}
            title={collections.has(post.id) ? "컬렉션에서 제거" : "컬렉션에 추가"}
          >
            {collections.has(post.id) ? "★ 컬렉션" : "☆ 컬렉션"}
          </button>
        </div>
        <h3 style={{ color: "#666", marginTop: 0, fontWeight: "normal" }}>
          {post.subtitle}
        </h3>
        <div className='post-info'>
          <span><strong>{post.author}</strong></span>
          <button
            className={`btn-subscribe ${subscriptions.has(post.author) ? "active" : ""}`}
            onClick={() => toggleSubscription(post.author)}
          >
            {subscriptions.has(post.author) ? "구독 중" : "+ 구독"}
          </button>
          <span>{post.date}</span>
        </div>
      </div>

      <div className='post-content-body' dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.tags && (
        <div style={{ marginTop: "4rem", paddingTop: "1.5rem", borderTop: "1px solid #eee" }}>
          {post.tags.split(",").map((tag, idx) => {
            const trimmedTag = tag.trim();
            if (!trimmedTag) return null;
            return (
              <span key={idx} className='tag-badge'># {trimmedTag}</span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
