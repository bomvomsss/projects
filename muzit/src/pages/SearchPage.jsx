// pages/SearchPage.jsx
import { useSearchParams } from "react-router-dom";
import PostListItem from "../components/PostListItem";

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "");
}

function SearchPage({ posts, subscriptions, toggleSubscription, collections, toggleCollection }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const results = query
    ? posts.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.author.toLowerCase().includes(q) ||
          (post.tags ?? "").toLowerCase().includes(q) ||
          stripHtml(post.content).toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div>
      <div className='feed-header'>
        <h2>검색 결과</h2>
      </div>

      {!query ? (
        <p>검색어를 입력해주세요.</p>
      ) : results.length === 0 ? (
        <p>
          <strong>"{query}"</strong>에 대한 검색 결과가 없습니다.
        </p>
      ) : (
        <>
          <p className='search-result-count'>
            <strong>"{query}"</strong> 검색 결과 {results.length}건
          </p>
          <div>
            {results.map((post) => (
              <PostListItem
                key={post.id}
                post={post}
                subscriptions={subscriptions}
                toggleSubscription={toggleSubscription}
                collections={collections}
                toggleCollection={toggleCollection}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchPage;
