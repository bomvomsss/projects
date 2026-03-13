// pages/AdminPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAuthors, saveAuthorOverride } from "../data/authors";

const MENU_LABELS = {
  subscriptions: "구독",
  collection:    "북마크",
  settings:      "설정",
};

function AdminPage({ menuConfig, setMenuConfig, announcements, deleteAnnouncement }) {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState(getAllAuthors);
  const [editTarget, setEditTarget] = useState(null);
  const [saved, setSaved] = useState(false);

  const openEdit = (author) => setEditTarget({ ...author });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTarget((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    saveAuthorOverride(editTarget.name, {
      avatar: editTarget.avatar,
      bio:    editTarget.bio,
    });
    setAuthors(getAllAuthors());
    setEditTarget(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-page">
      <h2 className="page-title">관리자</h2>

      {/* ── 메뉴 관리 ── */}
      <section className="admin-section">
        <h3 className="admin-section-title">메뉴 관리</h3>
        <p className="admin-section-desc">사이드바에 표시할 메뉴 항목을 설정합니다. 홈은 항상 표시됩니다.</p>
        <div className="admin-menu-list">
          {Object.entries(MENU_LABELS).map(([key, label]) => (
            <div key={key} className="admin-menu-item">
              <span className="admin-menu-label">{label}</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={menuConfig[key]}
                  onChange={() => setMenuConfig((prev) => ({ ...prev, [key]: !prev[key] }))}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* ── 공지사항 관리 ── */}
      <section className="admin-section">
        <h3 className="admin-section-title">공지사항 관리</h3>
        <p className="admin-section-desc">우측 사이드바에 표시될 공지사항을 관리합니다.</p>

        <button className="btn-black admin-notice-new-btn" onClick={() => navigate("/admin/notice/new")}>
          + 공지사항 작성
        </button>

        {/* 공지사항 목록 */}
        <ul className="admin-notice-list">
          {announcements.map((a) => (
            <li key={a.id} className="admin-notice-item">
              <div className="admin-notice-info">
                <span className="admin-notice-title">{a.title}</span>
                <span className="admin-notice-date">{a.date}</span>
              </div>
              <div className="admin-notice-btns">
                <button className="cg-icon-btn" onClick={() => navigate(`/admin/notice/edit/${a.id}`)}>
                  <img src="/icon/common/edit.svg" alt="수정" width={15} height={15} />
                </button>
                <button className="cg-icon-btn" onClick={() => deleteAnnouncement(a.id)}>
                  <img src="/icon/common/delete.svg" alt="삭제" width={15} height={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 사용자 관리 ── */}
      <section className="admin-section">
        <h3 className="admin-section-title">사용자 관리</h3>
        <p className="admin-section-desc">사용자 프로필 정보를 수정합니다.</p>
        {saved && <p className="admin-saved-msg">저장됐습니다 ✓</p>}
        <table className="admin-user-table">
          <thead>
            <tr>
              <th>프로필</th>
              <th>이름</th>
              <th>소개</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.name}>
                <td><img src={author.avatar} alt={author.name} className="admin-user-avatar" /></td>
                <td className="admin-user-name">{author.name}</td>
                <td className="admin-user-bio">{author.bio || "—"}</td>
                <td><button className="btn-edit" onClick={() => openEdit(author)}>수정</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── 수정 모달 ── */}
      {editTarget && (
        <div className="preview-overlay" onClick={() => setEditTarget(null)}>
          <div className="admin-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <span>{editTarget.name} 정보 수정</span>
              <button className="preview-close" onClick={() => setEditTarget(null)}>✕</button>
            </div>
            <div className="admin-edit-body">
              <label className="admin-edit-label">
                아바타 URL
                <input
                  type="text"
                  name="avatar"
                  value={editTarget.avatar}
                  onChange={handleEditChange}
                  className="admin-edit-input"
                />
              </label>
              {editTarget.avatar && (
                <img src={editTarget.avatar} alt="미리보기" className="admin-avatar-preview" />
              )}
              <label className="admin-edit-label">
                소개글
                <textarea
                  name="bio"
                  value={editTarget.bio}
                  onChange={handleEditChange}
                  rows={3}
                  className="admin-edit-input admin-edit-textarea"
                />
              </label>
              <div className="admin-edit-actions">
                <button className="btn-secondary" onClick={() => setEditTarget(null)}>취소</button>
                <button className="btn-black" onClick={handleEditSave}>저장</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
