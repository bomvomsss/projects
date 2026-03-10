// pages/SubscriptionFeed.jsx
import { useNavigate } from "react-router-dom";

function SubscriptionFeed({ posts, subscriptions }) {
  const navigate = useNavigate();
  const feed = posts.filter((p) => subscriptions.has(p.author));

  return (
    <div>
      <h2 style={{ borderBottom: "2px solid #111", paddingBottom: "1rem", marginTop: 0 }}>
        구독 피드
      </h2>
      {subscriptions.size === 0 ? (
        <p>구독 중인 작가가 없습니다. 작품 상세 페이지에서 작가를 구독해보세요.</p>
      ) : feed.length === 0 ? (
        <p>구독 중인 작가의 새 작품이 없습니다.</p>
      ) : (
        <div className='post-grid'>
          {feed.map((post) => (
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
      )}
    </div>
  );
}

export default SubscriptionFeed;
