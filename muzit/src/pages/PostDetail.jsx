// pages/PostDetail.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthorLink from "../components/AuthorLink";
import { getAuthor } from "../data/authors";
import { formatDate } from "../utils/date";

function PostDetail({
  posts, subscriptions, toggleSubscription,
  collections, toggleCollection,
  commentsMap, addComment, toggleCommentLike,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");

  const post = posts.find((p) => p.id === parseInt(id));
  const comments = commentsMap?.[parseInt(id)] ?? [];
  const me = getAuthor("my_account");

  if (!post) {
    return (
      <div className='not-found'>
        <h2>게시글을 찾을 수 없습니다.</h2>
        <button onClick={() => navigate("/")} className='btn-black'>
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) return;
    addComment(post.id, trimmed);
    setCommentText("");
  };

  return (
    <div className='post-detail'>
      <button className='btn-back' onClick={() => navigate(-1)}>←</button>

      <div className='post-detail-header'>
        <div className='post-title-row'>
          <h1>{post.title}</h1>
          <div className='post-title-actions'>
            {post.author === "my_account" && (
              <button className='btn-edit' onClick={() => navigate(`/edit/${post.id}`)}>수정</button>
            )}
            <button
              className={`btn-collection ${collections.has(post.id) ? "active" : ""}`}
              onClick={() => toggleCollection(post.id)}
              title={collections.has(post.id) ? "북마크 제거" : "북마크 추가"}
            >
              {collections.has(post.id) ? "★" : "☆"}
            </button>
          </div>
        </div>
        <h3 className='post-subtitle'>{post.subtitle}</h3>
        <div className='post-info'>
          <AuthorLink authorName={post.author} />
          <button
            className={`btn-subscribe ${subscriptions.has(post.author) ? "active" : ""}`}
            onClick={() => toggleSubscription(post.author)}
          >
            {subscriptions.has(post.author) ? "구독중" : "구독"}
          </button>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>

      <div className='post-content-body' dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.tags && (
        <div className='post-tags'>
          {post.tags.split(",").map((tag, idx) => {
            const trimmedTag = tag.trim();
            if (!trimmedTag) return null;
            return <span key={idx} className='tag-badge'>{trimmedTag}</span>;
          })}
        </div>
      )}

      {/* 댓글 섹션 */}
      <div className='comment-section'>
        <h3 className='comment-section-title'>댓글 {comments.length}개</h3>

        {/* 댓글 작성 */}
        <form className='comment-write' onSubmit={handleCommentSubmit}>
          <img src={me.avatar} alt='me' className='comment-avatar' />
          <div className='comment-write-body'>
            <textarea
              className='comment-input'
              placeholder='댓글을 입력하세요...'
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={2}
            />
            <div className='comment-write-footer'>
              <button type='submit' className='btn-black comment-submit' disabled={!commentText.trim()}>
                등록
              </button>
            </div>
          </div>
        </form>

        {/* 댓글 목록 */}
        <div className='comment-list'>
          {comments.map((c) => {
            const author = getAuthor(c.author);
            return (
              <div key={c.id} className='comment-item'>
                <img src={author.avatar} alt={c.author} className='comment-avatar' />
                <div className='comment-body'>
                  <div className='comment-meta'>
                    <span className='comment-author'>{c.author}</span>
                    <span className='comment-date'>{formatDate(c.date)}</span>
                  </div>
                  <p className='comment-content'>{c.content}</p>
                  <div className='comment-actions'>
                    <button
                      className={`comment-action-btn ${c.liked ? "liked" : ""}`}
                      onClick={() => toggleCommentLike(post.id, c.id)}
                    >
                      ♡ {c.likes}
                    </button>
                    <button className='comment-action-btn'>답글 {c.replies}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
