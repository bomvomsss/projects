// components/RightSidebar.jsx
import { useNavigate } from "react-router-dom";

const trending = [
  "예시작품제목",
  "김하늘",
  "판타지",
  "이준호",
  "로맨스",
  "SF",
  "박지수",
  "에세이",
  "최유리",
  "커뮤니티",
];

function RightSidebar({ announcements = [] }) {
  const navigate = useNavigate();

  return (
    <aside className='right-sidebar'>
      {/* 공지사항 */}
      <section className='rs-section'>
        <h3 className='rs-title'>공지사항</h3>
        <ul className='rs-notice-list'>
          {announcements.map((a) => (
            <li key={a.id} className='rs-notice-item'>
              <button
                className='rs-notice-btn'
                onClick={() => navigate("/notifications")}
              >
                {a.title}
              </button>
              <span className='rs-notice-date'>{a.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 실시간 검색순위 */}
      {/* <section className="rs-section">
        <h3 className="rs-title">실시간 검색순위</h3>
        <ol className="rs-trend-list">
          {trending.map((term, i) => (
            <li key={term} className="rs-trend-item">
              <button
                className="rs-trend-btn"
                onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
              >
                <span className={`rs-trend-rank ${i < 3 ? "top" : ""}`}>{i + 1}</span>
                <span className="rs-trend-term">{term}</span>
              </button>
            </li>
          ))}
        </ol>
      </section> */}
    </aside>
  );
}

export default RightSidebar;
