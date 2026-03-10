// pages/AuthorProfile.jsx
import { useParams, useNavigate } from "react-router-dom";
import { getAuthor } from "../data/authors";

function AuthorProfile({ posts, subscriptions, toggleSubscription }) {
  const { name } = useParams();
  const authorName = decodeURIComponent(name);
  const navigate = useNavigate();
  const author = getAuthor(authorName);
  const authorPosts = posts.filter((p) => p.author === authorName);
  const isSubscribed = subscriptions.has(authorName);

  return (
    <div className='author-profile'>
      <button className='btn-back' onClick={() => navigate(-1)}>
        ←
      </button>

      <div className='author-profile-header'>
        <img
          src={author.avatar}
          alt={authorName}
          className='author-profile-avatar'
        />
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
        <h3 className='page-title'>작품 목록</h3>
        {authorPosts.length === 0 ? (
          <p>아직 작품이 없습니다.</p>
        ) : (
          <div className='post-grid'>
            {authorPosts.map((post) => (
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
                <p>{post.subtitle}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorProfile;
