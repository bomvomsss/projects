// pages/PostDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import AuthorLink from "../components/AuthorLink";

function PostDetail({
  posts,
  subscriptions,
  toggleSubscription,
  collections,
  toggleCollection,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === parseInt(id));

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

  return (
    <div className='post-detail'>
      <button className='btn-back' onClick={() => navigate(-1)}>
        ←
      </button>

      <div className='post-detail-header'>
        <div className='post-title-row'>
          <h1>{post.title}</h1>
          <button
            className={`btn-collection ${collections.has(post.id) ? "active" : ""}`}
            onClick={() => toggleCollection(post.id)}
            title={
              collections.has(post.id) ? "컬렉션에서 제거" : "컬렉션에 추가"
            }
          >
            {collections.has(post.id) ? "★" : "☆"}
          </button>
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
          <span>{post.date}</span>
        </div>
      </div>

      <div
        className='post-content-body'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags && (
        <div className='post-tags'>
          {post.tags.split(",").map((tag, idx) => {
            const trimmedTag = tag.trim();
            if (!trimmedTag) return null;
            return (
              <span key={idx} className='tag-badge'>
                {trimmedTag}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
