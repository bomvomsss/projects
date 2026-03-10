// components/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthor } from "../data/authors";

function Header() {
  const me = getAuthor("my_account");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="app-header">
      <Link to="/" className="app-header-logo">MUZIT</Link>

      <form className="app-header-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="작품명, 작가명, 태그, 내용 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="app-header-search-input"
        />
        <button type="submit" className="app-header-search-btn" title="검색">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      <div className="app-header-actions">
        <Link to="/notifications" className="app-header-icon" title="알림">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </Link>
        <Link to="/author/my_account" className="app-header-profile" title="내 프로필">
          <img src={me.avatar} alt="내 프로필" className="app-header-avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
