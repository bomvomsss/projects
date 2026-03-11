// components/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthor } from "../data/authors";

const STORAGE_KEY = "muzit_recent_searches";
const MAX_RECENT = 8;

function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveRecent(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const PROFILE_MENU = [
  { label: "내 프로필", action: "profile" },
  { label: "포인트 충전", action: "charge", divider: false },
  { label: "계정 설정", action: "account" },
  { label: "고객센터", action: "support", divider: true },
  { label: "로그아웃", action: "logout", danger: true },
];

function Header() {
  const me = getAuthor("my_account");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [recent, setRecent] = useState(loadRecent);
  const [profileOpen, setProfileOpen] = useState(false);

  const addRecent = (term) => {
    const next = [term, ...recent.filter((r) => r !== term)].slice(
      0,
      MAX_RECENT,
    );
    setRecent(next);
    saveRecent(next);
  };

  const removeRecent = (term) => {
    const next = recent.filter((r) => r !== term);
    setRecent(next);
    saveRecent(next);
  };

  const clearAll = () => {
    setRecent([]);
    saveRecent([]);
  };

  const doSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    addRecent(trimmed);
    setFocused(false);
    setQuery(trimmed);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(query);
  };

  const handleProfileAction = (action) => {
    setProfileOpen(false);
    if (action === "profile") return navigate("/author/my_account");
    if (action === "logout") {
      if (window.confirm("로그아웃 하시겠습니까?"))
        alert("로그아웃 기능은 추후 구현 예정입니다.");
      return;
    }
    alert("해당 기능은 추후 구현 예정입니다.");
  };

  return (
    <header className='app-header'>
      <div className='app-header-inner'>
        <Link to='/' className='app-header-logo'>
          MUZIT
        </Link>

        <div className='app-header-search-wrap'>
          <form
            className={`app-header-search ${focused ? "dropdown-open" : ""}`}
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              placeholder='작품명, 작가명, 태그, 내용 검색'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='app-header-search-input'
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
            />
            <button
              type='submit'
              className='app-header-search-btn'
              title='검색'
            >
              {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg> */}
              🔍
            </button>
          </form>

          {focused && (
            <div className='search-dropdown'>
              <div className='search-dropdown-header'>
                <span>최근 검색어</span>
                <button
                  className='search-dropdown-clear-all'
                  onClick={clearAll}
                >
                  전체 삭제
                </button>
              </div>
              {recent.length === 0 ? (
                <p className='search-dropdown-empty'>최근 검색어가 없습니다.</p>
              ) : (
                <ul className='search-dropdown-list'>
                  {recent.map((term) => (
                    <li key={term} className='search-dropdown-item'>
                      <button
                        className='search-dropdown-term'
                        onClick={() => doSearch(term)}
                      >
                        <svg
                          width='13'
                          height='13'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <circle cx='11' cy='11' r='8' />
                          <line x1='21' y1='21' x2='16.65' y2='16.65' />
                        </svg>
                        {term}
                      </button>
                      <button
                        className='search-dropdown-remove'
                        onClick={() => removeRecent(term)}
                        title='삭제'
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className='app-header-actions'>
          <Link to='/notifications' className='app-header-icon' title='알림'>
            {/* <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
              <path d='M13.73 21a2 2 0 0 1-3.46 0' />
            </svg> */}
            🔔
          </Link>

          {/* 프로필 드롭다운 */}
          <div className='profile-dropdown-wrap'>
            <button
              className='app-header-profile'
              onClick={() => setProfileOpen((v) => !v)}
              onBlur={() => setTimeout(() => setProfileOpen(false), 150)}
              title='메뉴'
            >
              <img
                src={me.avatar}
                alt='내 프로필'
                className='app-header-avatar'
              />
            </button>

            {profileOpen && (
              <div className='profile-dropdown'>
                {PROFILE_MENU.map((item) => (
                  <button
                    key={item.action}
                    className={`profile-dropdown-item ${item.danger ? "danger" : ""} ${item.divider ? "has-divider" : ""}`}
                    onMouseDown={() => handleProfileAction(item.action)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
