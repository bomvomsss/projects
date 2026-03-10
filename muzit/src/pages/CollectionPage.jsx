// pages/CollectionPage.jsx
import { useNavigate } from "react-router-dom";

function CollectionPage({ posts, collections, toggleCollection }) {
  const navigate = useNavigate();
  const collectedPosts = posts.filter((p) => collections.has(p.id));

  return (
    <div>
      <h2 style={{ borderBottom: "2px solid #111", paddingBottom: "1rem", marginTop: 0 }}>
        컬렉션
      </h2>
      {collectedPosts.length === 0 ? (
        <p>아직 컬렉션에 추가한 작품이 없습니다. 작품 상세 페이지에서 ☆ 버튼을 눌러 추가해보세요.</p>
      ) : (
        <div className='post-grid'>
          {collectedPosts.map((post) => (
            <div key={post.id} className='post-card' onClick={() => navigate(`/post/${post.id}`)}>
              <img
                src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"}
                alt='cover'
                className='post-cover'
              />
              <h3>{post.title}</h3>
              <p>{post.author}</p>
              <button
                className='btn-collection-remove'
                onClick={(e) => { e.stopPropagation(); toggleCollection(post.id); }}
              >
                컬렉션 제거
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
