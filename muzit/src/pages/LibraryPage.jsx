// pages/LibraryPage.jsx
import { useNavigate } from "react-router-dom";

function LibraryPage({ posts }) {
  const navigate = useNavigate();
  const myPosts = posts.filter((post) => post.author === "my_account");

  return (
    <div>
      <h2 className='page-title'>내 작품 관리</h2>
      {myPosts.length === 0 ? (
        <p>아직 올린 작품이 없습니다. '작품 올리기' 버튼을 눌러 시작해보세요!</p>
      ) : (
        <div className='post-grid'>
          {myPosts.map((post) => (
            <div key={post.id} className='post-card' onClick={() => navigate(`/post/${post.id}`)}>
              <img
                src={post.coverUrl || "https://via.placeholder.com/300x400.png?text=No+Cover"}
                alt='cover'
                className='post-cover'
              />
              <h3>{post.title}</h3>
              <p>{post.author}</p>
              <p>{post.tag}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LibraryPage;
