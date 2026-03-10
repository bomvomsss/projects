// components/PostListItem.jsx
import { useNavigate, Link } from "react-router-dom";
import { getAuthor } from "../data/authors";
import { formatDate } from "../utils/date";

function formatNum(n) {
  if (!n) return 0;
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "천";
  return n;
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "");
}

function PostListItem({ post, subscriptions, toggleSubscription, collections, toggleCollection }) {
  const navigate = useNavigate();
  const author = getAuthor(post.author);
  const isSubscribed = subscriptions?.has(post.author);
  const isCollected = collections?.has(post.id);
  const preview = stripHtml(post.content).slice(0, 120) + (post.content.length > 120 ? "..." : "");

  return (
    <div className="plc-card" onClick={() => navigate(`/post/${post.id}`)}>

      {/* 왼쪽: 프로필 사진 */}
      <Link
        to={`/author/${encodeURIComponent(post.author)}`}
        className="plc-avatar-col"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={author.avatar} alt={post.author} className="plc-avatar-img" />
      </Link>

      {/* 오른쪽: 전체 내용 */}
      <div className="plc-content-col">

        {/* 작가명 + 날짜·채널 + 구독·더보기 */}
        <div className="plc-header">
          <div className="plc-author-info">
            <Link
              to={`/author/${encodeURIComponent(post.author)}`}
              className="plc-author-name"
              onClick={(e) => e.stopPropagation()}
            >
              {post.author}
            </Link>
            <span className="plc-date">{formatDate(post.date)} · {post.author}</span>
          </div>
          <div className="plc-header-actions">
            {post.author !== "my_account" && (
              <button
                className={`btn-subscribe ${isSubscribed ? "active" : ""}`}
                onClick={(e) => { e.stopPropagation(); toggleSubscription(post.author); }}
              >
                {isSubscribed ? "구독중" : "구독"}
              </button>
            )}
            <button className="btn-more" onClick={(e) => e.stopPropagation()}>···</button>
          </div>
        </div>

        {/* 제목 */}
        <h3 className="plc-title">{post.title}</h3>

        {/* 부제목 */}
        {post.subtitle && <p className="plc-subtitle">{post.subtitle}</p>}

        {/* 내용 미리보기 */}
        <p className="plc-preview">{preview}</p>

        {/* 태그 */}
        {post.tags && (
          <div className="plc-tags">
            {post.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t, i) => (
              <span key={i} className="plc-tag">{t}</span>
            ))}
          </div>
        )}

        {/* 조회수 */}
        <p className="plc-views">조회 {formatNum(post.views)}</p>

        {/* 하단: 좋아요·댓글 / 북마크·공유 */}
        <div className="plc-bottom-row">
          <div className="plc-reactions">
            <span className="plc-reaction-btn">♡ {post.likes ?? 0}</span>
            <span className="plc-reaction-btn">💬 {post.comments ?? 0}</span>
          </div>
          <div className="plc-icons">
            <button
              className={`plc-icon-btn ${isCollected ? "active" : ""}`}
              title={isCollected ? "컬렉션에서 제거" : "컬렉션에 추가"}
              onClick={(e) => { e.stopPropagation(); toggleCollection(post.id); }}
            >
              {isCollected ? "★" : "☆"}
            </button>
            <button className="plc-icon-btn" onClick={(e) => e.stopPropagation()} title="공유">
              ↑
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PostListItem;
