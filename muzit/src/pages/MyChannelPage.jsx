// pages/MyChannelPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthor } from "../data/authors";
import { formatDate } from "../utils/date";

function formatNum(n) {
  if (!n) return 0;
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "천";
  return n;
}

function MyChannelPage({ posts, deletePost, subscriptions }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("published");
  const me = getAuthor("my_account");

  const myPosts = posts.filter((p) => p.author === "my_account");
  const scheduled = myPosts.filter((p) => p.isScheduled && new Date(p.scheduledAt) > new Date());
  const drafts = myPosts.filter((p) => p.isDraft);
  const published = myPosts.filter((p) => !p.isDraft && !p.isScheduled);

  // 대시보드 집계
  const totalViews = published.reduce((s, p) => s + (p.views ?? 0), 0);
  const totalLikes = published.reduce((s, p) => s + (p.likes ?? 0), 0);
  const totalComments = published.reduce((s, p) => s + (p.comments ?? 0), 0);

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) deletePost(id);
  };

  const PostRow = ({ post }) => (
    <div className='mcp-row'>
      <img
        src={post.coverUrl || "https://via.placeholder.com/60x80.png?text="}
        alt='cover'
        className='mcp-cover'
      />
      <div className='mcp-info'>
        <p className='mcp-title'>{post.title || "제목 없음"}</p>
        <p className='mcp-date'>{formatDate(post.date)}</p>
        {post.isScheduled && (
          <p className='mcp-schedule-label'>
            예약: {new Date(post.scheduledAt).toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
          </p>
        )}
        {!post.isDraft && !post.isScheduled && (
          <div className='mcp-stats'>
            <span>조회 {formatNum(post.views)}</span>
            <span>좋아요 {post.likes}</span>
            <span>댓글 {post.comments}</span>
          </div>
        )}
      </div>
      <div className='mcp-actions'>
        {post.isDraft && (
          <button
            className='mcp-publish-btn'
            onClick={() => navigate(`/edit/${post.id}`)}
          >
            발행하기
          </button>
        )}
        <button
          className='mcp-icon-btn'
          title='수정'
          onClick={() => navigate(`/edit/${post.id}`)}
        >
          <img src='/icon/common/edit.svg' alt='수정' width={16} height={16} />
        </button>
        <button
          className='mcp-icon-btn danger'
          title='삭제'
          onClick={() => handleDelete(post.id)}
        >
          <img src='/icon/common/delete.svg' alt='삭제' width={16} height={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className='mcp-page'>
      {/* 채널 프로필 */}
      <div className='mcp-profile'>
        <img src={me.avatar} alt='내 프로필' className='mcp-avatar' />
        <div>
          <h2 className='mcp-name'>my_account</h2>
          <p className='mcp-bio'>{me.bio}</p>
        </div>
      </div>

      {/* 대시보드 카드 */}
      <div className='mcp-dashboard'>
        <div className='mcp-stat-card'>
          <span className='mcp-stat-value'>{published.length}</span>
          <span className='mcp-stat-label'>발행 작품</span>
        </div>
        <div className='mcp-stat-card'>
          <span className='mcp-stat-value'>{drafts.length}</span>
          <span className='mcp-stat-label'>임시저장</span>
        </div>
        <div className='mcp-stat-card'>
          <span className='mcp-stat-value'>{formatNum(totalViews)}</span>
          <span className='mcp-stat-label'>총 조회수</span>
        </div>
        <div className='mcp-stat-card'>
          <span className='mcp-stat-value'>{formatNum(totalLikes)}</span>
          <span className='mcp-stat-label'>총 좋아요</span>
        </div>
        <div className='mcp-stat-card'>
          <span className='mcp-stat-value'>{formatNum(totalComments)}</span>
          <span className='mcp-stat-label'>총 댓글</span>
        </div>
      </div>

      {/* 탭 */}
      <div className='cg-tab-header'>
        <div className='cg-tabs'>
          <button
            className={`cg-tab ${tab === "published" ? "active" : ""}`}
            onClick={() => setTab("published")}
          >
            발행됨 <span className='cg-tab-count'>{published.length}</span>
          </button>
          <button
            className={`cg-tab ${tab === "drafts" ? "active" : ""}`}
            onClick={() => setTab("drafts")}
          >
            임시저장 <span className='cg-tab-count'>{drafts.length}</span>
          </button>
          <button
            className={`cg-tab ${tab === "scheduled" ? "active" : ""}`}
            onClick={() => setTab("scheduled")}
          >
            예약됨 <span className='cg-tab-count'>{scheduled.length}</span>
          </button>
        </div>
        <button className='btn-black mcp-write-btn' onClick={() => navigate("/write")}>
          + 새 작품
        </button>
      </div>

      {/* 목록 */}
      <div className='mcp-list'>
        {tab === "published" && (
          published.length === 0
            ? <p className='mcp-empty'>발행된 작품이 없습니다.</p>
            : published.map((p) => <PostRow key={p.id} post={p} />)
        )}
        {tab === "drafts" && (
          drafts.length === 0
            ? <p className='mcp-empty'>임시저장된 작품이 없습니다.</p>
            : drafts.map((p) => <PostRow key={p.id} post={p} />)
        )}
        {tab === "scheduled" && (
          scheduled.length === 0
            ? <p className='mcp-empty'>예약된 작품이 없습니다.</p>
            : scheduled.map((p) => <PostRow key={p.id} post={p} />)
        )}
      </div>
    </div>
  );
}

export default MyChannelPage;
